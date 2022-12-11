<template>
  <div v-if="ProfPage" class="row bg-profile rounded text-light justify-content-between align-items-center">
    <img :src="profile?.picture" class="col-4 creator-img rounded-circle p-2" alt="">
    <div class="col-4">
      <h3 class=" name-tag rounded text-center py-2">{{ profile?.name }}</h3>
    </div>
    <div class="col-3 d-flex justify-content-between">
      <section class="row justify-content-between fs-3">
        <div class="col-3 d-flex justify-content-center">
          <a v-if="profile?.github" :href="profile?.github" class="text-light"><i class="mdi mdi-github"></i></a>
          <i v-else="''" class="mdi mdi-github"></i>
        </div>
        <div class="col-3 d-flex justify-content-center">
          <a v-if="profile?.linkedin" :href="profile?.linkedin" class="text-light"><i class="mdi mdi-linkedin"></i></a>
          <i v-else="''" class="mdi mdi-linkedin"></i>
        </div>
        <div class="col-3 d-flex justify-content-center">
          <i v-if="profile?.graduated" class="mdi mdi-school"></i>
          <i v-else="''" class="mdi mdi-school-outline"></i>
        </div>
      </section>
    </div>
    <div v-if="user.id == profile?.id" class="col-1 ">
      <ProfileForm />
    </div>
    <p>{{ profile?.bio }}</p>
  </div>
  <div v-if="HomePage" class="d-none d-md-block row bg-user rounded text-light justify-content-center">
    <img :src="user?.picture" class="col-12 rounded p-2" alt="">
    <div class="col-12 d-flex justify-content-center">
      <h3 class="text-center name-tag rounded my-2">{{ user?.name }}</h3>
    </div>
    <div class="col-12 fs-1 d-flex justify-content-center">
      <a v-if="user?.github" :href="user?.github" class="text-light text-center name-tag rounded"><i
          class="mdi mdi-github name-tag rounded"></i></a>
      <i v-else class="mdi mdi-github text-center name-tag rounded"></i>
    </div>
    <div class="col-12 fs-1 d-flex justify-content-center">
      <a v-if="user?.linkedin" :href="user?.linkedin" class="text-light  text-center name-tag rounded"><i
          class="mdi mdi-linkedin text-center name-tag rounded"></i></a>
      <i v-else class="mdi mdi-linkedin  text-center name-tag rounded"></i>
    </div>
    <div class="col-12 fs-1 d-flex justify-content-center">
      <i v-if="user?.graduated" class="mdi mdi-school  text-center name-tag rounded"></i>
      <i v-else class="mdi mdi-school-outline  text-center name-tag rounded"></i>
    </div>
    <p>{{ user?.bio }}</p>

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
.name-tag {
  background-color: rgba(0, 0, 0, 0.158);
}

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