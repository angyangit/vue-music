import helper from './src/api/helpers'
import express from 'express'

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

app.use('/api', apiRoutes)

app.use(express.static('./dist'))
var ap = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
export default {ap}
