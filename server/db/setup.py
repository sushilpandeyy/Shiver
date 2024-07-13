from pymongo import MongoClient, ASCENDING

def create_mongodb_structure(client: MongoClient):
    db = client['your_database_name']

    # Define collections and their structures
    collections = {
        "users": [
            {"name": "index_on_username", "key": [("username", ASCENDING)], "unique": True}
        ],
        "items": [
            {"name": "index_on_item_name", "key": [("name", ASCENDING)], "unique": False}
        ],
    }

    for collection_name, indexes in collections.items():
        collection = db[collection_name]
        for index in indexes:
            collection.create_index(index["key"], name=index["name"], unique=index["unique"])

    # Optionally populate initial data
    # db['users'].insert_one({"username": "admin", "password": "admin"})
    # db['items'].insert_one({"name": "item1", "price": 100.0})

    return db
