const {MongoClient, ObjectId} = require("mongodb")

const client = new MongoClient(process.env.MONGO_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

const collections = {
	temp: "temp"
}

const connection = client.connect()
const dbName = process.env.MONGO_DATABASE

module.exports = {
	ObjectId,
	client,
	collections,
	connection,
	dbName,
	get: (coll) => {
		return client.db(dbName).collection(collections[coll])
	},
}
