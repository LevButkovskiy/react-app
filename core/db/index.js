const {MongoClient, ObjectId} = require("mongodb")

const dotenv = require("dotenv")
dotenv.config({path: __dirname + "/../../.env.local"})

const client = new MongoClient(process.env.MONGO_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

const connection = client.connect()
const dbName = process.env.MONGO_DATABASE

module.exports = {
	ObjectId,
	client,
	connection,
	dbName,
	getColl: (coll) => {
		return client.db(dbName).collection(coll)
	},
}
