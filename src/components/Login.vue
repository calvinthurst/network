<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropstart my-2 my-lg-0">
        <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <router-link v-if="account.id" :to="{ name: 'Profile', params: { profileId: account.id } }">
              <div @click="setActiveProfile()" class="list-group-item dropdown-item list-group-item-action">
                <i class="mdi mdi-account"></i>
                My Profile
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { postService } from "../services/PostService.js"
import { profileService } from "../services/ProfileService.js"
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),

      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      setActiveProfile() {
        profileService.setActiveProfile(this.account)
        postService.getPostByCreator(this.account.id)
      },
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
