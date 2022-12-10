<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-9 card ">
        <PostForm />
        <div v-for="p in posts">
          <PostCard :post="p" />
        </div>
      </div>
      <div class="col-3"></div>
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
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard, PostForm }
}
</script>

<style scoped lang="scss">

</style>
