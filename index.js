const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  fetch('https://www.aphorismen.de/suche?spezial=zufall')
    .then(response => response.text())
    .then(result => {
      const $ = cheerio.load(result)
      const text = $('.aphorism-container h2 a').text()
      res.json({ text: text })
    })
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})