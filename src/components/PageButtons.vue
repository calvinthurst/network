<template>
  <div v-if="maxPage > 1"
    class="bg-dark text-light sticky-bottom row align-items-center justify-content-between m-0 py-3 col-12">
    <button class="col-4 rounded-pill page-button border-light" v-if="(currentPage > 1)"
      @click="changePage(currentPage - 1)">
      previous</button>
    <div class="col-4 rounded-pill page-button text-center" v-else>
      previous</div>
    <div class=" col-2 text-center">{{ currentPage }} of {{ maxPage }}
    </div>
    <button class="col-4 rounded-pill page-button border-light" v-if="(currentPage !== maxPage)"
      @click="changePage(currentPage + 1)">next</button>
    <div class="col-4 rounded-pill page-button text-center" v-else>
      next</div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from "@vue/reactivity";
import { postService } from "../services/PostService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import HomePage from "../pages/HomePage.vue";
import { profileService } from "../services/ProfileService.js";
import ProfilePage from "../pages/ProfilePage.vue";
import { router } from "../router.js";
import { useRoute } from "vue-router";

export default {

  setup() {
    const route = useRoute()
    return {
      // route: computed(() => router.routes),
      appState: computed(() => AppState),
      active: computed(() => AppState.activeProfile),
      currentPage: computed(() => AppState.page),
      maxPage: computed(() => AppState.maxPage),
      async changePage(pageNum) {
        try {
          if (route.name == 'Profile') {
            await profileService.pagePostByCreator(pageNum, route.params.profileId)
          } else {
            await postService.changePage(pageNum)
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      },
    }
  },
}
</script>


<style lang="scss" scoped>
.page-button {
  background: #575444;
  color: #fffae3;
  border: 1px, solid, #57544400;
}
</style>