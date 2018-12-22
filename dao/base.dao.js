const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const dbUser = encodeURIComponent(config.dbUser);
const dbPassword = encodeURIComponent(config.dbPassword);

const mongoUri = `mongodb://${dbUser}:${dbPassword}@${config.dbHost}:${config.dbPort}/?authSource=${config.dbName}`; // prettier-ignore

class BaseDao {
  constructor() {
    this.client = new MongoClient(mongoUri, { useNewUrlParser: true });
    this.dbName = config.dbName;
  }

  connect() {
    return new Promise(async (resolve, reject) => {
      await this.client.connect(error => {
        if (error) {
          reject(error);
        }

        console.log('Connected successfully to MongoDB');
        resolve(this.client.db(config.dbName));
      });
    });
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return db
      .collection(collection)
      .find(query)
      .toArray();
  }

  async get(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return result.updatedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = BaseDao;
