import "dotenv/config";

export default {
  client: "mysql2",
  connection: {
    host: 'localhost',
    database: 'reassure_database',
    user: 'root',
    password: 'rootroot',
    charset: "utf8",
  },
};

