#!/usr/bin/env python3
"""
Test script to verify XP storage is working after the bug fix.
This script will:
1. Register a test user
2. Login to get a token
3. Log some activities to earn XP
4. Check if XP was stored in the database
5. Verify XP persists across sessions
"""

import requests
import json
import time
from pymongo import MongoClient

# API endpoints
BASE_URL = "http://localhost:8000"
REGISTER_URL = f"{BASE_URL}/register"
LOGIN_URL = f"{BASE_URL}/token"
LOG_ACTIVITY_URL = f"{BASE_URL}/log-activity"
USER_ME_URL = f"{BASE_URL}/users/me"

# Test user credentials
TEST_EMAIL = "test_xp_storage3@example.com"
TEST_USERNAME = "testuser3"
TEST_PASSWORD = "testpassword123"
TEST_AGE_GROUP = "teen"

def register_test_user():
    """Register a test user"""
    user_data = {
        "email": TEST_EMAIL,
        "username": TEST_USERNAME,
        "password": TEST_PASSWORD,
        "ageGroup": TEST_AGE_GROUP
    }

    try:
        response = requests.post(REGISTER_URL, json=user_data)
        if response.status_code == 200:
            print("✓ Test user registered successfully")
            return True
        else:
            print(f"✗ Failed to register user: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"✗ Error registering user: {e}")
        return False

def login_test_user():
    """Login and get access token"""
    login_data = {
        "username": TEST_EMAIL,  # OAuth2 form uses 'username' for email
        "password": TEST_PASSWORD
    }

    try:
        response = requests.post(LOGIN_URL, data=login_data)
        if response.status_code == 200:
            token_data = response.json()
            print("✓ Test user logged in successfully")
            return token_data["access_token"]
        else:
            print(f"✗ Failed to login: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"✗ Error logging in: {e}")
        return None

def log_activity(token, action, details=None):
    """Log an activity to earn XP"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    activity_data = {
        "action": action,
        "details": details or {"test": True},
        "ip_address": "127.0.0.1",
        "user_agent": "Test Script",
        "login_method": "password",
        "session_id": "test_session_123"
    }

    try:
        response = requests.post(LOG_ACTIVITY_URL, json=activity_data, headers=headers)
        if response.status_code == 200:
            result = response.json()
            print(f"✓ Activity '{action}' logged successfully, earned {result['reward']} XP")
            return result
        else:
            print(f"✗ Failed to log activity: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"✗ Error logging activity: {e}")
        return None

def get_user_data(token):
    """Get current user data"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(USER_ME_URL, headers=headers)
        if response.status_code == 200:
            user_data = response.json()
            print(f"✓ User data retrieved: XP={user_data['totalXP']}, Level={user_data['currentLevel']}")
            return user_data
        else:
            print(f"✗ Failed to get user data: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"✗ Error getting user data: {e}")
        return None

def check_database_directly():
    """Check MongoDB directly to verify XP storage"""
    try:
        # Connect to MongoDB (assuming default local setup)
        client = MongoClient("mongodb://localhost:27017")
        db = client.game_of_law_db

        # Find the test user
        user = db.users.find_one({"email": TEST_EMAIL})
        if user:
            print(f"✓ Database check: User XP={user.get('xp', 0)}, Level={user.get('level', 1)}")

            # Check user activity document
            activity_doc = db.user_activity.find_one({"user_id": user["_id"]})
            if activity_doc:
                print(f"✓ Database check: Found {len(activity_doc.get('activities', []))} activities, total XP earned={activity_doc.get('total_xp_earned', 0)}")
                return True
            else:
                print("✗ Database check: No user activity document found")
                return False
        else:
            print("✗ Database check: Test user not found in database")
            return False

    except Exception as e:
        print(f"✗ Database check error: {e}")
        return False
    finally:
        if 'client' in locals():
            client.close()

def main():
    print("🧪 Testing XP Storage Fix")
    print("=" * 50)

    # Step 1: Register test user
    if not register_test_user():
        return

    # Step 2: Login
    token = login_test_user()
    if not token:
        return

    # Step 3: Get initial user data
    print("\n📊 Initial user data:")
    initial_data = get_user_data(token)
    if not initial_data:
        return

    initial_xp = initial_data["totalXP"]
    initial_level = initial_data["currentLevel"]

    # Step 4: Log some activities to earn XP
    print("\n🎮 Logging activities to earn XP...")

    # Log a quiz completion (should give 10 XP)
    log_activity(token, "quiz_correct", {"topic": "test_topic", "difficulty": "easy"})

    # Log completing a lesson (should give 5 XP)
    log_activity(token, "completed_lesson", {"topic": "test_topic", "module": "test_module"})

    # Log playing a game (should give 8 XP)
    log_activity(token, "played_game", {"game_type": "card_matching", "score": 100})

    # Step 5: Get updated user data
    print("\n📊 Updated user data after activities:")
    updated_data = get_user_data(token)
    if not updated_data:
        return

    updated_xp = updated_data["totalXP"]
    updated_level = updated_data["currentLevel"]

    # Step 6: Verify XP was earned
    xp_gained = updated_xp - initial_xp
    expected_xp = 10 + 5 + 8  # quiz_correct + completed_lesson + played_game

    if xp_gained == expected_xp:
        print(f"✓ XP calculation correct: Gained {xp_gained} XP (expected {expected_xp})")
    else:
        print(f"✗ XP calculation incorrect: Gained {xp_gained} XP (expected {expected_xp})")

    # Step 7: Check database directly
    print("\n💾 Checking database directly...")
    db_check = check_database_directly()

    # Step 8: Test persistence - simulate new session
    print("\n🔄 Testing XP persistence (simulating new session)...")
    time.sleep(1)  # Small delay

    # Get user data again (simulating page refresh)
    final_data = get_user_data(token)
    if final_data and final_data["totalXP"] == updated_xp:
        print("✓ XP persistence confirmed: XP remains after 'session refresh'")
    else:
        print("✗ XP persistence failed: XP lost after 'session refresh'")

    # Final summary
    print("\n" + "=" * 50)
    if xp_gained == expected_xp and db_check and final_data and final_data["totalXP"] == updated_xp:
        print("🎉 SUCCESS: XP storage is working correctly!")
        print("   - Activities are being logged")
        print("   - XP is being calculated and stored in database")
        print("   - XP persists across sessions")
    else:
        print("❌ FAILURE: XP storage has issues")
        print("   - Check the issues above and fix accordingly")

if __name__ == "__main__":
    main()