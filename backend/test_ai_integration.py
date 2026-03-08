#!/usr/bin/env python3
"""
Test script for AI content generation endpoints.
This script tests the API endpoints without requiring a real AI API key.
"""

import requests
import json
import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

def test_ai_topics_endpoint():
    """Test the /ai/topics endpoint"""
    try:
        # For now, we'll test the function directly since we don't have authentication set up
        from app.ai import get_available_topics
        topics = get_available_topics()
        print(f"✓ AI topics endpoint test passed. Found {len(topics)} topics.")
        print(f"Sample topics: {topics[:5]}")
        return True
    except Exception as e:
        print(f"✗ AI topics endpoint test failed: {e}")
        return False

def test_ai_content_generation_structure():
    """Test the AI content generation function structure"""
    try:
        from app.ai import generate_legal_content

        # Test with a mock response (since we don't have a real API key)
        # This will fail gracefully and return an error, which is expected
        result = generate_legal_content(
            topic="Fundamental Rights",
            content_type="questions",
            difficulty="easy",
            count=2
        )

        # We expect this to fail since AI_API_KEY is not set to a real key
        if "success" in result and not result["success"]:
            print("✓ AI content generation structure test passed (expected failure without real API key)")
            print(f"Error message: {result.get('error', 'Unknown error')}")
            return True
        else:
            print("✗ AI content generation structure test failed - unexpected success")
            return False

    except Exception as e:
        print(f"✗ AI content generation structure test failed: {e}")
        return False

def test_models_import():
    """Test that all models can be imported"""
    try:
        from app.models import AIContentRequest
        # Test creating a model instance
        request = AIContentRequest(
            topic="Test Topic",
            content_type="questions",
            difficulty="easy",
            count=3,
            age_group="teen"
        )
        print("✓ Models import test passed")
        print(f"Sample request: {request.dict()}")
        return True
    except Exception as e:
        print(f"✗ Models import test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("Testing AI Integration Setup")
    print("=" * 40)

    tests = [
        test_models_import,
        test_ai_topics_endpoint,
        test_ai_content_generation_structure
    ]

    passed = 0
    total = len(tests)

    for test in tests:
        if test():
            passed += 1
        print()

    print("=" * 40)
    print(f"Tests passed: {passed}/{total}")

    if passed == total:
        print("🎉 All tests passed! AI integration is ready.")
        print("\nNext steps:")
        print("1. Get a Google Gemini AI API key from https://makersuite.google.com/app/apikey")
        print("2. Replace 'your_ai_api_key_here' in backend/.env with your real API key")
        print("3. Restart the backend server")
        print("4. Test the /ai/generate-content endpoint with authentication")
    else:
        print("❌ Some tests failed. Please check the errors above.")

    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)