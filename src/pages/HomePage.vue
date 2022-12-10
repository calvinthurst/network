<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-2"></div>
      <div class="col-8 card ">
        <PostForm />
        <PostCard v-for="p in posts" :post="p" />
      </div>
      <!-- <section class="row justify-content-around sticky-bottom">
        <button class="col-4 btn btn-outline-primary" v-if="(currentPage > 1)" @click="changePage(currentPage - 1)">
          previous</button>
        <button class="col-4 btn btn-outline-danger" v-else disabled>
          previous</button>
        <div class=" col-2 text-center">{{ currentPage }} of {{ maxPage }}
        </div>
        <button class="col-4 btn btn-outline-primary" :disabled="(currentPage == maxPage)"
          @click="changePage(currentPage + 1)">next</button>
      </section> -->
      <div class="col-2"></div>
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
    onMounted(() => getPosts());
    return {
      posts: computed(() => AppState.posts),
    };
  },
  components: { PostCard, PostForm }
}
</script>

<style scoped lang="scss">

</style>
