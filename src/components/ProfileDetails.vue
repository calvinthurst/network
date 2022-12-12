<template>
  <div v-if="ProfPage">
    <div v-if="active" class="row bg-profile rounded text-light justify-content-between align-items-center">
      <img :src="active?.picture" class="col-4 creator-img rounded-circle p-2" alt="">
      <div class="col-4">
        <h3 class=" name-tag rounded text-center py-2">{{ active?.name }}</h3>
      </div>
      <div class="col-3 d-flex justify-content-between">
        <section class="row justify-content-between fs-3">
          <div class="col-3 d-flex justify-content-center">
            <a v-if="githubLink" :href="active?.github" class="text-light name-tag rounded"><i
                class="mdi mdi-github"></i></a>
          </div>
          <div class="col-3 d-flex justify-content-center">
            <a v-if="active?.linkedin" :href="active?.linkedin" class="text-light name-tag rounded"><i
                class="mdi mdi-linkedin"></i></a>
          </div>
          <div class="col-3 d-flex justify-content-center">
            <i v-if="active?.graduated" class="mdi mdi-school name-tag rounded"></i>
            <i v-else="''" class="mdi mdi-school-outline name-tag rounded"></i>
          </div>
        </section>
      </div>
      <div v-if="user.id == active?.id" class="col-1 ">
        <ProfileForm />
      </div>
      <div>
        <p class=" name-tag rounded">{{ profile?.bio }}</p>
        <p class=" name-tag rounded">Resume: {{ profile?.resume }}</p>
      </div>
    </div>
  </div>

  <div v-if="HomePage" class="d-none d-md-block row bg-user rounded text-light justify-content-center cant-highlight">
    <img :src="user?.picture" class="col-12 rounded p-2" alt="">
    <div class="col-12 d-flex justify-content-center">
      <h3 class="text-center name-tag rounded my-2">{{ user?.name }}</h3>
    </div>
    <div class="col-12 fs-1 d-flex justify-content-center">
      <a v-if="user?.github" :href="user?.github" class="text-light text-center name-tag rounded"><i
          class="mdi mdi-github"></i></a>
    </div>
    <div class="col-12 fs-1 d-flex justify-content-center">
      <a v-if="user?.linkedin" :href="user?.linkedin" class="text-light  text-center name-tag rounded"><i
          class="mdi mdi-linkedin text-center "></i></a>
    </div>
    <div class="col-12 fs-1 d-flex justify-content-center">
      <i v-if="user?.graduated == true" class="mdi mdi-school  text-center name-tag rounded"></i>
      <i v-else-if="user?.graduated == false" class="mdi mdi-school-outline  text-center name-tag rounded"></i>
      <i v-else></i>
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
  props: {
    active: {
      type: Account
    }
  },
  setup() {

    const route = useRoute()
    return {
      ProfPage: computed(() => route.name == 'Profile'),
      HomePage: computed(() => route.name == 'Home'),
      profile: computed(() => AppState?.activeProfile),
      user: computed(() => AppState.account),
      profileImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
      userImg: computed(() => `url(${AppState.account?.coverImg})`),
      githubLink: computed(() => AppState.activeProfile.github.includes('github.com'))
    };
  },
  components: { ProfileForm }
};
</script>


<style lang="scss" scoped>
.cant-highlight {
  user-select: none;
}

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