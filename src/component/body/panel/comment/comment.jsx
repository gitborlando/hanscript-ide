import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import { apiPath } from '../../../..'
import { commentService } from '../../../../service/commentService'
import { PS } from '../../../../service/panelService'
import s from './comment.module.css'

export const Comment = observer(({ order }) => {
  return (
    <>
      {PS.order === order && (
        <div className={s.comment}>
          <CommentList />
          <CommentInput />
        </div>
      )}
    </>
  )
})

const CommentList = observer(() => {
  useEffect(() => {
    const fetchData = async () => {
      if (commentService.init) return
      const commentMapResult = await fetch(apiPath + 'commentMap')
      const commentMap = await commentMapResult.json()
      Object.values(JSON.parse(commentMap)).forEach((comment) =>
        commentService.comments.push(commentService.json2Comment(comment))
      )
    }
    fetchData()
  })
  return (
    <div className={s.commentList}>
      {commentService.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
})

const useSetTo = () => {
  const [isSettingTo, setSettingTo] = useState(false)
  const setTo = (id, name) => {
    if (!isSettingTo) {
      commentService.setFollow(id)
      commentService.setTo(name)
      setSettingTo(true)
      commentService.setCancelReply(setSettingTo)
    } else {
      commentService.clear()
      setSettingTo(false)
    }
  }
  return [setTo, isSettingTo]
}

const useStar = (comment) => {
  const [stared, setStared] = useState(false)
  const star = () => {
    if (!stared) {
      comment.makeStar()
      setStared(true)
    } else {
      comment.cancelStar()
      setStared(false)
    }
  }
  return [star, stared]
}

const CommentCard = observer(({ comment }) => {
  const [setTo, isSettingTo] = useSetTo()
  const [star, isStared] = useStar(comment)
  const [zhankai, setZhankai] = useState(false)
  return (
    <div className={s.commentCard}>
      <div className={s.title}>
        <div className={s.name}>{comment.name}</div>
        <div className={s.time}>{comment.time}</div>
      </div>
      <div className={s.content}>{comment.content}</div>
      <div className={s.operator}>
        <div
          className={[s.star, isStared ? s.stared : ''].join(' ')}
          onClick={star}
        >
          <span style={{ fontSize: 15, marginRight: 1 }}>&#xec7f;</span>
          {comment.star}
        </div>
        <div
          className={[s.star, isSettingTo ? s.stared : ''].join(' ')}
          onClick={() => setTo(comment.id, comment.name)}
        >
          <span style={{ fontSize: 15, marginRight: 3 }}>&#xe60e;</span>
          <span style={{ fontSize: 12 }}>回复</span>
        </div>
      </div>
      {comment.length !== 0 && !zhankai && (
        <div className={s.zhankai} onClick={() => setZhankai(true)}>
          展开 {comment.length} 条评论
        </div>
      )}
      {zhankai && <FollowCardList comment={comment} close={setZhankai} />}
    </div>
  )
})

const FollowCardList = observer(({ comment, close }) => {
  useEffect(() => {
    const fetchData = async () => {
      if (comment.loaded) return
      const commentsResult = await fetch(
        `${apiPath}followMap?commentId=${encodeURIComponent(comment.id)}`
      )
      const comments = await commentsResult.json()
      comment.comments = comments.map((comment) =>
        commentService.json2Comment(comment)
      )
      comment.loaded = true
    }
    fetchData()
  })
  return (
    <>
      {comment.comments.length !== 0 ? (
        <>
          <div className={s.comments}>
            {comment.comments.map((i) => (
              <FollowCard
                key={i.id}
                comment={i}
                fromId={comment.id}
                from={comment.name}
              />
            ))}
            <div className={s.shouqi} onClick={() => close(false)}>
              收起评论
            </div>
          </div>
        </>
      ) : (
        'loading'
      )}
    </>
  )
})

const FollowCard = observer(({ comment, fromId, from }) => {
  const [setTo, isSettingTo] = useSetTo()
  const [star, isStared] = useStar(comment)
  return (
    <div className={s.followCard}>
      <div className={s.title} style={{ marginTop: 10 }}>
        <div className={s.name}>{comment.name}</div>
        {from && from !== comment.to && (
          <>
            <div className={s.to}>&#xe627;</div>
            <div className={s.name}>{comment.to}</div>
          </>
        )}
        <div className={s.time}>{comment.time}</div>
      </div>
      <div className={s.content}>{comment.content}</div>
      <div className={s.operator}>
        <div
          className={[s.star, isStared ? s.stared : ''].join(' ')}
          onClick={star}
        >
          <span style={{ fontSize: 15, marginRight: 1 }}>&#xec7f;</span>
          {comment.star}
        </div>
        <div
          className={[s.star, isSettingTo ? s.stared : ''].join(' ')}
          onClick={() => setTo(fromId, comment.name)}
        >
          <span style={{ fontSize: 15, marginRight: 3 }}>&#xe60e;</span>
          <span style={{ fontSize: 12 }}>回复</span>
        </div>
      </div>
    </div>
  )
})

const CommentInput = observer(() => {
  const ref = useRef()
  const handelSendComment = () => {
    if (!commentService.name) {
      let name = prompt('请输入一个名字')
      if (!name) name = `无名氏·${new Date().getTime().toString().slice(7)}`
      commentService.setName(name)
    }
    commentService.setContent(ref.current.innerText)
    commentService.comment()
    ref.current.innerText = ''
  }
  return (
    <div className={s.commentInput}>
      <div className={s.inputArea}>
        <div
          ref={ref}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={s.input}
          placeholder={
            commentService.to ? `@${commentService.to}:` : '指点一波江山'
          }
        ></div>
        <div className={s.send} onClick={handelSendComment}>
          &#xe62d;
        </div>
      </div>
    </div>
  )
})
