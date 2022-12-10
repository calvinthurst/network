<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="row m-0 sticky-bottom">
    <PageButtons />
    <!-- class="bg-dark text-light sticky-bottom row align-items-center justify-content-between m-0 p-2">
    <button class="col-4 btn btn-primary " v-if="(currentPage > 1)" @click="changePage(currentPage - 1)">
      previous</button>
    <button class="col-4 btn btn-danger" v-else disabled>
      previous</button>
    <div class=" col-2 text-center">{{ currentPage }} of {{ maxPage }}
    </div>
    <button class="col-4 btn btn-primary" :disabled="(currentPage == maxPage)"
      @click="changePage(currentPage + 1)">next</button> -->
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import PageButtons from "./components/PageButtons.vue"
import { postService } from "./services/PostService.js"
import { logger } from "./utils/Logger.js"
import Pop from "./utils/Pop.js"

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      currentPage: computed(() => AppState.page),
      maxPage: computed(() => AppState.maxPage),
      async changePage(num) {
        try {
          await postService.changePage(num)
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      }
    }
  },
  components: { Navbar, PageButtons }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 50px;
}
</style>
