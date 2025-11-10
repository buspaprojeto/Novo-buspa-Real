const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DBConn = async () => {
  return new Promise((resolve, reject) => {
    const dbPath = process.env.DB_PATH || path.join(__dirname, "../../database.db");
    
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error opening database:", err);
        reject(err);
        return;
      }
      console.log(`Connected to SQLite database at ${dbPath}`);

      db.serialize(() => {
        db.run(
          `CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLENAME || "users"} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          (err) => {
            if (err) {
              console.error("Error creating table:", err);
              reject(err);
            } else {
              console.log(`${process.env.DB_TABLENAME || "users"} table ready`);
              resolve(db);
            }
          }
        );
      });
    });
  });
};

module.exports = DBConn;
