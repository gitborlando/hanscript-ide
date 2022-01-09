const http = require('http')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static(path.resolve(__dirname, '../build')))

http.createServer(app).listen(8080, console.log('汉简编译器'))

app.all('*', function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/commentMap', (_, res) => {
  res.end(
    JSON.stringify(
      fs.readFileSync(
        path.resolve(__dirname, 'comment/commentMap.json'),
        'utf8'
      )
    )
  )
})

app.get('/followMap', (req, res) => {
  const followMap = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'comment/followMap.json'), 'utf8')
  )
  const follow = followMap[req.query.commentId] || {}
  res.json(follow)
})

app.get('/makeStar', (req, res) => {
  const { follow, id, action } = req.query
  if (follow) {
    const followMap = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'comment/followMap.json'), 'utf8')
    )
    const one = followMap[follow].find((star) => star.id === id)
    one.star = action === 'plus' ? one.star + 1 : one.star - 1
    fs.writeFileSync(
      path.resolve(__dirname, 'comment/followMap.json'),
      JSON.stringify(followMap, null, 2)
    )
    res.json({})
    return
  }
  const commentMap = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'comment/commentMap.json'), 'utf8')
  )
  const star = commentMap[id].star
  commentMap[id].star = action === 'plus' ? star + 1 : star - 1
  fs.writeFileSync(
    path.resolve(__dirname, 'comment/commentMap.json'),
    JSON.stringify(commentMap, null, 2)
  )
  res.json({})
})

app.get('/makeComment', (req, res) => {
  const { id, time, name, content, follow, to } = req.query
  const newComment = {
    id,
    time,
    name,
    content,
    follow,
    to,
    star: 0,
    loaded: false,
    comments: [],
    length: 0,
  }
  const commentMap = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'comment/commentMap.json'), 'utf8')
  )
  if (follow) {
    const followMap = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'comment/followMap.json'), 'utf8')
    )
    delete newComment.length
    ;(followMap[follow] || (followMap[follow] = [])).push(newComment)
    commentMap[follow].length += 1
    fs.writeFileSync(
      path.resolve(__dirname, 'comment/followMap.json'),
      JSON.stringify(followMap, null, 2)
    )
    res.json({})
    return
  }
  commentMap[id] = newComment
  fs.writeFileSync(
    path.resolve(__dirname, 'comment/commentMap.json'),
    JSON.stringify(commentMap, null, 2)
  )
  res.json({})
})

app.get('/example', (req, res) => {
  const result = fs
    .readFileSync(path.resolve(__dirname, 'comment/example.txt'), 'utf-8')
    .split('//')
    .filter((i) => /[^\n\s]/.test(i))
    .map((i) => {
      const [key, value] = i.split(';')
      return { name: key, code: value }
    })
  res.json(result)
})

app.get('/tutorial', (req, res) => {
  const result = fs.readFileSync(
    path.resolve(__dirname, 'comment/tutorial.txt'),
    'utf-8'
  )
  res.end(result)
})
