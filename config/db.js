const { mongoClient, MongoClient } = require("mongodb");
const DB = process.env.MONGO_CONN_URL;

const client = new MongoClient(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db_connect;

module.exports = {
  connect: (cb) => {
    client.connect((err, res) => {
      if (err || !res) return cb(err);
      db_connect = res.db("fortune-soft");
      console.log("db connected");
      return cb();
    });
  },
  getDB: () => db_connect,
};
