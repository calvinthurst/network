<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div @click="" class="d-flex flex-column align-items-center">
        <i class="fs-1 mdi mdi-lan"></i>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>
      <ProfileSearchForm />
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { profileService } from "../services/ProfileService.js";
import Login from './Login.vue'
import ProfileSearchForm from "./ProfileSearchForm.vue";
export default {
  setup() {
    return {
      setActiveProfile() {
        profileService.setActiveProfile('home')
      },
    }
  },
  components: { Login, ProfileSearchForm }
}
</script>

<style scoped>
.logo {
  height: 14vh;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
