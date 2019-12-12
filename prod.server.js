var express = require('express')
var axios = require('axios')
var helper = require('./src/api/helpers')
var port = 3000

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getRecommmend', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?'
  helper.get({url, params: req.query}).then((response) => {
    res.json(response.data)
    console.log('getRecommmend', response)
  }).catch((e) => {
    console.log('getRecommmend', e)
  })
})

apiRoutes.get('/getRanking', function (req, res) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?'
    helper.get({url, params: req.query}).then((response) => {
      res.json(response.data)
      console.log('getRanking', response)
    }).catch((e) => {
      console.log('getRanking', e)
    })
  }
)
apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^\(\)]+})\)$/
      var matches = response.data.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
