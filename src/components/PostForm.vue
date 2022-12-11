<template>
  <section v-if="isLogged" class="row justify-content-md-end my-2 px-1 justify-content-center">
    <button class="col-md-2 btn bg-dark text-success m-2 elevation-5" type="button" data-bs-toggle="collapse"
      data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Create post
    </button>
    <div class="collapse" id="collapseExample">
      <div class="card card-body m-1">
        <form @submit.prevent="createPost()" action="">
          <div class="mb-3 col-12">
            <label for="body" class="form-label">Tell us what you want to say</label>
            <textarea name="" id="" class="form-control" v-model="state.body" rows="3"></textarea>
            <small id="helpId" class="form-text text-muted"></small>
          </div>
          <div class="col-12 d-flex justify-content-between">
            <input type="text" v-model="state.imgUrl" class="col-9 rounded"
              placeholder="Put an image url here if you want">
            <button type="submit" class="btn outline-btn-success col-3 fw-bold">Create Post <i
                class="mdi mdi-pencil-outline"></i></button>
          </div>
          <img :src="state.imgUrl" alt="" class="check-img ">
        </form>
      </div>
    </div>
  </section>
  <section v-else>
    <h1 class="p-5 elevation-5 rounded">Go ahead and login to make a post <span> <i
          class="mdi mdi-arrow-top-right-thick"></i> </span> </h1>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { Post } from "../models/Post.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postService } from "../services/PostService.js";
export default {
  setup() {
    const state = ref({})
    async function createPost() {
      try {
        await postService.createPost(state.value)
        state.value = {}
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    return {
      state,
      createPost,
      isLogged: computed(() => AppState.activeUser)
    }
  }
};
</script>


<style lang="scss" scoped>
.check-img {
  max-height: 35vh;
}
</style>