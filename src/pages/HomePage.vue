<template>
  <div class="container-fluid">
    <section class="row p-2 justify-content-around">
      <div class="col-2 m-3">
        <ProfileDetails />
      </div>
      <div class="col-12 d-md-none">
        <AdCard v-for="a in adverts" :advert="a" />
      </div>
      <div class="col-md-7 card my-3">
        <ProfileSearchResult v-for="pro in profiles" :profile="pro" />
        <PostForm />
        <PostCard v-for="p in posts" :post="p" />
      </div>
      <div class="col-md-2 d-none d-md-block m-3">
        <AdCard v-for="a in adverts" :advert="a" />
      </div>
    </section>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { postService } from "../services/PostService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";
import ProfileDetails from "../components/ProfileDetails.vue";
import AdCard from "../components/AdCard.vue";
import { adsService } from "../services/AdsService.js";
import ProfileSearchResult from "../components/ProfileSearchResult.vue";
import { profileService } from "../services/ProfileService.js";

export default {
  setup() {
    async function getPosts() {
      try {
        await postService.getPosts();
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
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
    async function getSearchResults() {
      try {
        await profileService.getSearchResults(search.query)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getPosts();
      getAds();
    });
    return {
      posts: computed(() => AppState.posts),
      adverts: computed(() => AppState.ads),
      profiles: computed(() => AppState.searchResults)
    };
  },
  components: { PostCard, PostForm, ProfileDetails, AdCard, ProfileSearchResult }
}
</script>

<style scoped lang="scss">

</style>
