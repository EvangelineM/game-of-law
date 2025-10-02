from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client: AsyncIOMotorClient = None

async def connect_to_mongo():
    global client
    client = AsyncIOMotorClient(settings.mongodb_url)
    # Create email index on users collection
    db = client[settings.mongodb_db]
    try:
        await db.users.create_index("email", unique=True)
    except Exception:
        # Silently handle index creation failures
        pass

async def close_mongo_connection():
    global client
    if client:
        client.close()

async def get_database():
    if client is None:
        await connect_to_mongo()
    return client[settings.mongodb_db]