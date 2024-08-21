from pymongo import MongoClient
from bson.objectid import ObjectId

MONGO_URI = "mongodb+srv://sushilpandey:yXtZBBc2ZCDqbBT@shiver1.sar29rn.mongodb.net/?retryWrites=true&w=majority&appName=Shiver1"

client = MongoClient(MONGO_URI)
db = client.get_database()

users_collection = db.users