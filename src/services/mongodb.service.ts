/// <reference path="../../typings/main.d.ts" />
/*
	Service used to connect to MongoDB
	Will need to specify database connection property on src/config/config.json file
	"database" :
	{
		"username" 	: "username used to connect to database",
		"password" 	: "password used to connect to database",
		"dbname" 	: "name o the database to connect"
	}
*/

var MongoDB = require('mongodb');

export class MongoDBService {
	private v_uri: string;
	private v_db: any;
	construtor() {
		
	}

	initialize() {
		// build connection URI
		let v_username: string;
		let v_password: string;
		let v_host: string;
		let v_db_name: string;
		let v_env = process.env.NODE_ENV || "development";
		let Path = require('path');
		let Config = require(Path.join(__dirname, '..', 'config', 'config.json'))[v_env];
		v_username = Config.database.username;
		v_password = Config.database.password;
		v_host = Config.database.host;
		v_db_name = Config.database.db_name;
		this.v_uri = 'mongodb://' + v_username + ':' + v_password + '@' + v_host + '/' + v_db_name;
	}

	// establised database connection
	connect() {
		let v_current = this;
		return new Promise<any>(function(p_resolve, p_reject) {
			v_current.v_db = MongoDB.MongoClient.connect(v_current.v_uri, function(p_error, p_db) {
				if(!p_error) {
					v_current.v_db = p_db;
					p_resolve(p_db);
				}
				p_resolve(p_error);
			});
		});
	}

	getCollection(p_collection_name: string) {
		return this.v_db.collection(p_collection_name);
	}

	// close database connection
	close() {
		let v_current = this;
		return new Promise<any>(function(p_resolve, p_reject) {
			v_current.v_db.close(function(p_error) {
				if(!p_error) p_resolve();
				else p_reject(p_error);
			});
		});
	}
}