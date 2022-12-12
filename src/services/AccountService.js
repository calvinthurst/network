import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async editAccount(accountData) {
    try {
      const res = await api.put(`/account`, accountData)
      AppState.account = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error('ARE YOU SIGNED IN OR IS THIS YOUR ACCOUNT', err)
    }
  }
}

export const accountService = new AccountService()
