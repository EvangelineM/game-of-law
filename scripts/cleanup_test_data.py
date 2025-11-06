#!/usr/bin/env python3
"""
Cleanup script to remove test users and their activity documents.
Deletes users with emails starting with 'test_xp_storage' and removes matching user_activity docs.
"""
import asyncio
from app.db import get_database, connect_to_mongo, close_mongo_connection
from bson import ObjectId

async def cleanup():
    await connect_to_mongo()
    db = await get_database()

    # Find test users by email pattern
    test_users = await db.users.find({"email": {"$regex": "^test_xp_storage"}}).to_list(length=100)
    if not test_users:
        print("No test users found matching 'test_xp_storage' prefix.")
    else:
        for u in test_users:
            uid = str(u.get('_id'))
            print(f"Deleting user: {u.get('email')} (id={uid})")
            # Delete user_activity documents where user_id equals string id or ObjectId
            await db.user_activity.delete_many({"user_id": {"$in": [uid, ObjectId(uid)]}})
            # Delete the user
            await db.users.delete_one({"_id": u.get('_id')})
        print(f"Deleted {len(test_users)} test user(s) and their activity docs.")

    await close_mongo_connection()

if __name__ == '__main__':
    asyncio.run(cleanup())
