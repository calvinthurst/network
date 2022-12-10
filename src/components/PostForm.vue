<template>
  <section>
    <form @submit.prevent="createPost()" action="">
      <div class="mb-3 col-12">
        <label for="" class="form-label">Tell us what you want to say</label>
        <textarea name="" id="" class="form-control" v-model="editable.body" rows="3"></textarea>
        <small id="helpId" class="form-text text-muted"></small>
      </div>
      <div class="col-12 d-flex justify-content-between">
        <input type="text" v-model="editable.imgUrl" class="col-9">
        <button type="submit" class="btn outline-btn-success col-3"><i class="mdi mdi-pencil-outline"></i></button>
      </div>

    </form>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postService } from "../services/PostService.js";
export default {
  setup() {
    const editable = reactive({})
    async function createPost() {
      try {
        await postService.createPost(editable)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    return {
      editable,
      createPost,
    }
  }
};
</script>


<style lang="scss" scoped>

</style>