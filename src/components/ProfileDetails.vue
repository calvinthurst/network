<template>
  <div v-if="profile" class="row bg-profile rounded text-light justify-content-between"
    :style="`background-image: url(${profile.coverImg})`">
    <img :src="profile.picture" class="col-4 creator-img rounded-circle p-2" alt="">
    <h3 class="col-3">{{ profile.name }}</h3>
    <div class="col-3 d-flex justify-content-around">
      <i class="mdi mdi-github"></i>
      <i class="mdi mdi-linkedin"></i>
      <i v-if="profile.graduated" class="mdi mdi-school"></i>
      <i v-else="profile.graduated" class="mdi mdi-school-outline"></i>
    </div>
    <div v-if="user.id == profile.id">
      <ProfileForm />
    </div>
    <p>{{ profile.bio }}</p>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Account } from "../models/Account.js";
import ProfileForm from "./ProfileForm.vue";
export default {
  setup() {

    return {
      profile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.account),
    };
  },
  components: { ProfileForm }
};
</script>


<style lang="scss" scoped>
.creator-img {
  height: 10vh;
  width: 10vh;
  object-fit: cover;
  object-position: center;
}
</style>