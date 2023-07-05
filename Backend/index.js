const express = require('express')
const app = express()
const port = 5000
app.use(express.json())
const mongoDB = require("./db");

var cors = require('cors')
app.use(cors())

mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
