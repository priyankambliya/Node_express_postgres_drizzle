import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

let connection_string = process.env['DATABASE_URL'] ?? 'postgres://postgres:1234@localhost:5432/postgres-drizzle-express'

const pool = new Pool({
    connectionString: connection_string,
})
const db = drizzle({ client: pool })
pool.connect()
    .then(() => console.log("Database connection established"))
    .catch((err) => console.error("Failed to connect to database", err))

export default db