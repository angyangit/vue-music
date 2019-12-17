var express = require('express')
var axios = require('axios')
var history = require('connect-history-api-fallback')
var port = 8088

var app = express()
app.use(history())
var apiRoutes = express.Router()

apiRoutes.get('/getRecommmend', function (req, res) {
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
apiRoutes.get('/getRankingDetail', function (req, res) {
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
apiRoutes.get('/getSingerList', function (req, res) {
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
apiRoutes.get('/getSongList', function (req, res) {
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
apiRoutes.get('/getSongPlayUrl', function (req, res) {
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

apiRoutes.get('/getSearchLoveTip', function (req, res) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
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

apiRoutes.get('/getSearchClient', function (req, res) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
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
apiRoutes.get('/getLyric', function (req, res) {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
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
