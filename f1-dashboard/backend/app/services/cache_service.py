import os
import json
import redis.asyncio as redis

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
_client = None

async def get_client():
    global _client
    if _client is None:
        _client = redis.from_url(REDIS_URL, decode_responses=True)
    return _client

async def get_cached(key: str):
    try:
        client = await get_client()
        val = await client.get(key)
        return json.loads(val) if val else None
    except Exception:
        return None

async def set_cached(key: str, value, ttl_seconds: int = 604800):
    try:
        client = await get_client()
        await client.setex(key, ttl_seconds, json.dumps(value))
    except Exception:
        pass
