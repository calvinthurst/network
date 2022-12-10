<template>
  <section class="row justify-content-center m-0 p-3">
    <div class="col-12">
      <ProfileDetails />
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
import ProfileDetails from "../components/ProfileDetails.vue";
import PostForm from "../components/PostForm.vue";
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
        await profileService.getPostByCreator(route.params.profileId)
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
      profile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.account),
    }
  },
  components: { PostCard, ProfileDetails, PostForm }
};
</script>


<style lang="scss" scoped>
.bg-profile {
  height: 20vh;
  object-fit: cover;
  object-position: center;
}
</style>