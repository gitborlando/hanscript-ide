import { makeAutoObservable } from 'mobx'
import { apiPath } from '..'

class CommentService {
  constructor() {
    this.id = ''
    this.time = ''
    this.name = ''
    this.content = ''
    this.follow = ''
    this.to = ''
    this.comments = []
    this.follows = []
    this.init = false
    this.cancelReply = null
    makeAutoObservable(this)
  }
  generateId() {
    return String(new Date().getTime())
  }
  generateTime() {
    const arr = new Date().toLocaleDateString().split('/')
    arr[1] = arr[1] < 10 ? `0${arr[1]}` : arr[1]
    arr[2] = arr[2] < 10 ? `0${arr[2]}` : arr[2]
    return arr.join('.')
  }
  setName(name) {
    this.name = name
  }
  setContent(content) {
    this.content = content
  }
  setFollow(follow) {
    this.follow = follow
  }
  setTo(to) {
    this.to = to
  }
  setCancelReply(fn) {
    this.cancelReply = fn
  }
  comment() {
    if (!this.content) {
      alert('没写评论！')
      return
    }
    const comment = new Comment(
      this.generateId(),
      this.generateTime(),
      this.name,
      this.content,
      0,
      this.follow,
      this.to,
      false,
      [],
      0
    )
    if (this.follow) {
      const commentInstance = this.comments.find(
        (comment) => comment.id === this.follow
      )
      commentInstance.addComments(comment)
    } else {
      this.comments.push(comment)
      const { id, time, name, content, follow, to } = comment
      ;(async () => {
        fetch(
          apiPath +
            `makeComment?follow=${encodeURIComponent(
              follow
            )}&id=${encodeURIComponent(id)}&to=${encodeURIComponent(
              to
            )}&content=${encodeURIComponent(content)}&time=${encodeURIComponent(
              time
            )}&name=${encodeURIComponent(name)}`
        )
      })()
    }
    this.cancelReply && this.cancelReply()
    this.clear()
  }
  json2Comment(comment) {
    this.init = true
    const {
      id,
      time,
      name,
      content,
      star,
      follow,
      to,
      loaded,
      comments,
      length,
    } = comment
    return new Comment(
      id,
      time,
      name,
      content,
      star,
      follow,
      to,
      loaded,
      comments,
      length
    )
  }
  clear() {
    this.follow = ''
    this.to = ''
  }
}

export const commentService = new CommentService()

class Comment {
  constructor(
    id,
    time,
    name,
    content,
    star,
    follow,
    to,
    loaded,
    comments,
    length
  ) {
    this.id = id
    this.time = time
    this.name = name
    this.content = content
    this.star = star
    this.follow = follow
    this.to = to
    this.loaded = loaded
    this.comments = comments
    this.length = length
    makeAutoObservable(this)
  }
  makeStar() {
    this.star++
    ;(async () => {
      fetch(
        apiPath +
          `makeStar?follow=${encodeURIComponent(
            this.follow
          )}&id=${encodeURIComponent(this.id)}&action=plus`
      )
    })()
  }
  cancelStar() {
    this.star--
    ;(async () => {
      fetch(
        apiPath +
          `makeStar?follow=${encodeURIComponent(
            this.follow
          )}&id=${encodeURIComponent(this.id)}&action=''`
      )
    })()
  }
  addComments(comment) {
    this.comments.push(comment)
    this.length = this.comments.length
    const { id, time, name, content, follow, to } = comment
    ;(async () => {
      fetch(
        apiPath +
          `makeComment?follow=${encodeURIComponent(
            follow
          )}&id=${encodeURIComponent(id)}&to=${encodeURIComponent(
            to
          )}&content=${encodeURIComponent(content)}&time=${encodeURIComponent(
            time
          )}&name=${encodeURIComponent(name)}`
      )
    })()
  }
}
