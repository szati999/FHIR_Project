const MongoClient = require("mongodb").MongoClient;
const Boom = require("boom");

exports.allRoutes = [
	{
		method: "GET",
		path: "/patientsList",
		handler: async (request, h) => {
			let client;
			try {
				client = await MongoClient.connect("mongodb://localhost:27017");
				let patients = client.db("local").collection("patients");

				// fetch all books
				return await patients.find({}).toArray();
			} catch (e) {
				console.error(e.message);
				return Boom.internal(e);
			} finally {
				if (client && client.close) {
					client.close();
				}
			}
		},
	},
];
