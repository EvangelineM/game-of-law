#!/usr/bin/env python3
"""
Script to clean up test data from the database.
This script will delete test users and their associated activity data.
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os

# Database configuration
MONGODB_URL = "mongodb+srv://evangelinemariadurai_db_user:evangeline123@cluster0.emwcxuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DATABASE_NAME = "game_of_law"

async def cleanup_test_data():
    """Delete test users and their activity data"""
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]

    try:
        # Test user emails to delete
        test_emails = [
            "test_xp_storage@example.com",
            "test_xp_storage2@example.com",
            "test_xp_storage3@example.com"
        ]

        print("🧹 Cleaning up test data...")
        print("=" * 50)

        for email in test_emails:
            # Find the user
            user = await db.users.find_one({"email": email})
            if user:
                user_id = user["_id"]
                print(f"✓ Found test user: {email} (ID: {user_id})")

                # Delete user activity document
                activity_result = await db.user_activity.delete_one({"user_id": str(user_id)})
                if activity_result.deleted_count > 0:
                    print(f"  ✓ Deleted user activity document")

                # Delete user document
                user_result = await db.users.delete_one({"_id": user_id})
                if user_result.deleted_count > 0:
                    print(f"  ✓ Deleted user document")
                else:
                    print(f"  ✗ Failed to delete user document")

                print(f"✓ Successfully cleaned up test user: {email}")
            else:
                print(f"✗ Test user not found: {email}")

        print("\n" + "=" * 50)
        print("✅ Test data cleanup completed!")

    except Exception as e:
        print(f"❌ Error during cleanup: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(cleanup_test_data())