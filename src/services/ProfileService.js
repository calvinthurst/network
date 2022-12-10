import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
  async getProfileById(profileId) {
    const res = await api.get(`/api/profiles/${profileId}`)
    logger.log(res.data)
  }
  setActiveProfile(profile) {
    AppState.activeProfile = profile
    logger.log(AppState.activeProfile)
  }
}
export const profileService = new ProfileService()