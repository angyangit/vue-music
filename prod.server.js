var express = require('express')
var axios = require('axios')

var port = 8088

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getRecommmend', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  console.log('req', req)
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
    console.log(response)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/getRanking', function (req, res) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    console.log('req', req)
    axios.get(url, {
      params: req.query
    }).then((response) => {
      res.json(response.data)
      console.log(response)
    }).catch((e) => {
      console.log(e)
    })
  }
)

app.use('/api', apiRoutes)

app.use(express.static('./dist'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
