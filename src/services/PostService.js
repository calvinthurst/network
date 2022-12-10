import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log('the Posts sir', AppState.posts)
  }
  async getPostByCreator(profileId) {
    const res = await api.get(`/api/posts/`, { params: { creatorId: profileId } })
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log('appstate post by profile', AppState.posts)
  }

  async createPost(postData) {
    const res = await api.post('api/posts')
    AppState.posts.unshift(new Post(res.data))
    logger.log(res.data)
  }
}
export const postService = new PostService()