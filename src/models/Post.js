import { format } from "timeago.js"


export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.creator = data.creator
    this.createdAt = format(Date(data.createdAt), 'short-locale')
    this.likes = data.likes
  }


}