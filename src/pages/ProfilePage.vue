<template>
  <section class="row justify-content-center m-0 p-3">
    <div v-if="profile" class="col-12 d-flex bg-profile rounded " :style="`background-image: url(${profile.coverImg})`">
      <img :src="profile.picture" class="creator-img rounded-circle p-2" alt="">
      <h3 class="text-light">{{ profile.name }}</h3>
    </div>
    <div class="col-10 card mt-2 ">
      <div v-for="p in posts">
        <PostCard :post="p" />
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { profileService } from "../services/ProfileService.js";
import { postService } from "../services/PostService.js";
import PostCard from "../components/PostCard.vue";
export default {
  setup() {
    const route = useRoute();
    async function getProfileById() {
      try {
        await profileService.getProfileById(route.params.profileId)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    async function getPostByCreator() {
      try {
        await postService.getPostByCreator(route.params.profileId)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getProfileById();
      getPostByCreator();
    })
    return {
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.activeProfile)
    }
  },
  components: { PostCard }
};
</script>


<style lang="scss" scoped>
.creator-img {
  height: 10vh;
  width: 10vh;
  object-fit: cover;
  object-position: center;
}

.bg-profile {
  height: 20vh;
  object-fit: cover;
  object-position: center;
}
</style>