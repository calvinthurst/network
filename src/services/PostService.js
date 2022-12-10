import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    let page = res.data.page.slice(0, 1)
    AppState.page = Number(page)
    AppState.maxPage = res.data.totalPages

    // logger.log('the Posts sir', AppState.posts)
  }


  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(new Post(res.data))
    // logger.log(res.data)
  }

  async removePost(postId) {
    const res = await api.delete('api/posts/' + postId)
    let postIndex = AppState.posts.findIndex(p => p.id == postId)
    if (postIndex >= 0) {
      AppState.posts.splice(postIndex, 1)
    }
    // logger.log(res.data)
  }
  async changePage(page) {
    const res = await api.get('/api/posts?page=' + page)
    AppState.posts = res.data.posts.map(p => new Post(p))
    let pageNum = res.data.page.slice(0, 1)
    AppState.page = Number(pageNum)
    AppState.maxPage = res.data.totalPages
  }
}
export const postService = new PostService()