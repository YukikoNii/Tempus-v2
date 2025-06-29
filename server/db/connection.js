import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    tls: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 }); // ping to confirm successful connection
  console.log("Successfully connected");
} catch (e) {
  console.error(e);
}

let db = client.db("users");
export default db;
