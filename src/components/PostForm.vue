<template>
  <section v-if="isLogged" class="row justify-content-end">
    <button type="button" class="col-2 btn bg-dark text-success m-2 elevation-5" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      Create post
    </button>
    <div class="modal modal-xl fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
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
            </form>
          </div>
        </div>
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

</style>