<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="row m-0">
    <PageButtons />
    <div class="col-12 d-flex justify-content-center bg-dark text-light ">
      <h5>Welcome to the network</h5>
    </div>
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
