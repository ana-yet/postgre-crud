import express from "express"
const app = express()
const port = 5000;

// body parsers
app.use(express.json())

app.get('/', (req : Request, res: Response) => {
  res.send('Hello Anayet')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
