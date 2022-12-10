import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
  async getProfileById(profileId) {
    const res = await api.get(`/api/profiles/${profileId}`)
    AppState.activeProfile = res.data
  }
  setActiveProfile(profile) {
    AppState.activeProfile = profile
    // logger.log(AppState.activeProfile)
  }
  async getPostByCreator(profileId) {
    const res = await api.get(`/api/profiles/${profileId}/posts`,)
    AppState.posts = res.data.posts.map(p => new Post(p))
    let page = res.data.page.slice(0, 1)
    AppState.page = Number(page)
    AppState.maxPage = res.data.totalPages
    // logger.log('appstate post by profile', AppState.posts)
  }
  async pagePostByCreator(pageNum, profileId) {
    const res = await api.get(`/api/profiles/${profileId}/posts?page=` + pageNum)
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(res.data)
    AppState.page = pageNum
    AppState.maxPage = res.data.totalPages
  }
}
export const profileService = new ProfileService()