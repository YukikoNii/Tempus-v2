import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, // enforce strict adherence to the specified serverApi version
    deprecationErrors: true,
    tls: true, // tls = transport layer security. This means connection to MongoDB uses encryption
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
