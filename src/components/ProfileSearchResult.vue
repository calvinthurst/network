<template>
  <div v-if="profile" class="row rounded  justify-content-between align-items-center elevation-5 m-3">
    <RouterLink class=" name-tag rounded text-center py-2 d-flex text-black" @click="setActiveProfile(profile)"
      :to="{ name: 'Profile', params: { profileId: profile.id } }">
      <img :src="profile?.picture" class="col-4 creator-img rounded-circle p-2" alt="">
      <div class="col-4">
        <h3>
          {{ profile?.name }}
        </h3>
      </div>
    </RouterLink>
    <div class="col-3 d-flex justify-content-between">
      <section class="row justify-content-between fs-3">
        <div class="col-3 d-flex justify-content-center">
          <a :href="profile?.github" class=" rounded text-dark"><i class="mdi mdi-github"></i></a>
        </div>
        <div class="col-3 d-flex justify-content-center ">
          <a v-if="profile?.linkedin" :href="profile?.linkedin" class=" rounded"><i
              class="mdi mdi-linkedin text-dark"></i></a>
        </div>
        <div class="col-3 d-flex justify-content-center text-dark">
          <i v-if="profile?.graduated" class=" mdi mdi-school rounded"></i>
          <i v-else="''" class="mdi mdi-school-outline rounded"></i>
        </div>
      </section>
    </div>
    <div>
      <p class=" rounded">{{ profile?.bio }}</p>
      <p class=" rounded">Resume: <a :href="profile?.resume" class="text-dark mdi mdi-file-account"></a></p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Account } from "../models/Account.js";
import { Post } from "../models/Post.js";
import { profileService } from "../services/ProfileService.js";
import { RouterLink } from "vue-router";
export default {
  props: {
    profile: {
      type: Account,
    }
  },
  setup(props) {
    return {
      setActiveProfile() {
        profileService.setActiveProfile(props.profile);
        AppState.searchResults = []
      },

    };
  },
  components: { RouterLink }
};
</script>


<style lang="scss" scoped>
.bg-profile {
  height: 40vh;
  background-image: v-bind(profileImg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-user {
  height: 70vh;
  background-image: v-bind(userImg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}


.creator-img {
  height: 15vh;
  width: 15vh;
  object-fit: cover;
  object-position: center;
}
</style>