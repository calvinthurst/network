<template>
  <section class="row justify-content-around m-0 ">
    <div class="col-12">
      <ProfileDetails :active="profile" />
    </div>
    <div class="col-md-9 card m-2 ">
      <div v-for="p in posts">
        <PostCard :post="p" />
      </div>
    </div>
    <div class="col-md-2 mt-2">
      <AdCard v-for="a in adverts" :advert="a" />
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
import AdCard from "../components/AdCard.vue";
import { adsService } from "../services/AdsService.js";
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
    async function getAds() {
      try {
        await adsService.getAds();
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getProfileById();
      getPostByCreator();
      getAds();
    })
    return {
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState?.activeProfile),
      adverts: computed(() => AppState.ads)
    }
  },
  components: { PostCard, ProfileDetails, PostForm, AdCard }
};
</script>


<style lang="scss" scoped>
.bg-profile {
  height: 20vh;
  object-fit: cover;
  object-position: center;
}
</style>