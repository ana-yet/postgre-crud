import express from "express"
import { Pool } from "pg";
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = 5000;

// body parsers
app.use(express.json())

const pool = new Pool({
  connectionString: `${process.env.DB_URL}`
})

// initialize database
const initDb = async ()=> {
 await pool.query(` 
   CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    `)

}

initDb()

app.get('/', (req : Request, res: Response) => {
  res.send('Hello Anayet')
})

app.post('/api/users',async (req : Request, res: Response) => {
  const {name, email} = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO users (name, email) VALUES($1, $2) RETURNING *`, [name, email]);

      res.status(201).json({
        success : true,
        message : "Data inserted successfully",
        data : result.rows[0]
      })
  } catch (err: any) {
    res.status(500).json({
      success : false,
      message : err.message,
    })
    
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
