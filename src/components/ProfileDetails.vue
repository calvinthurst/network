<template>
  <div v-if="ProfPage" class="row bg-profile rounded text-light justify-content-between">
    <img :src="profile?.picture" class="col-4 creator-img rounded-circle p-2" alt="">
    <h3 class="col-3">{{ profile?.name }}</h3>
    <div class="col-3 d-flex justify-content-around">
      <a v-if="profile?.github" :href="profile?.github" class="text-light"><i class="mdi mdi-github"></i></a>
      <i v-else class="mdi mdi-github"></i>
      <a v-if="profile?.linkedin" :href="profile?.linkedin" class="text-light"><i class="mdi mdi-linkedin"></i></a>
      <i v-else class="mdi mdi-linkedin"></i>
      <i v-if="profile?.graduated" class="mdi mdi-school"></i>
      <i v-else class="mdi mdi-school-outline"></i>
    </div>
    <div v-if="user.id == profile?.id">
      <ProfileForm />
    </div>
    <p>{{ profile?.bio }}</p>
  </div>
  <div v-if="HomePage" class="d-none d-md-block row bg-user rounded text-light justify-content-center">
    <img :src="user?.picture" class="col-12 rounded p-2" alt="">
    <h3 class="col-12 text-center">{{ user?.name }}</h3>
    <div class="row fs-1 justify text-center-content-center">
      <a v-if="user?.github" :href="user?.github" class="text-light col-12 text-center"><i
          class="mdi mdi-github"></i></a>
      <i v-else class="mdi mdi-github col-12 text-center"></i>
      <a v-if="user?.linkedin" :href="user?.linkedin" class="text-light col-12 text-center"><i
          class="mdi mdi-linkedin text-center"></i></a>
      <i v-else class="mdi mdi-linkedin col-12 text-center"></i>
      <i v-if="user?.graduated" class="mdi mdi-school col-12 text-center"></i>
      <i v-else class="mdi mdi-school-outline col-12 text-center"></i>
      <p>{{ user?.bio }}</p>

    </div>
  </div>
  <div v-else>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Account } from "../models/Account.js";
import ProfileForm from "./ProfileForm.vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute()
    return {
      ProfPage: computed(() => route.name == 'Profile'),
      HomePage: computed(() => route.name == 'Home'),
      profile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.account),
      profileImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
      userImg: computed(() => `url(${AppState.account?.coverImg})`)
    };
  },
  components: { ProfileForm }
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
  height: 10vh;
  width: 10vh;
  object-fit: cover;
  object-position: center;
}
</style>