<template>
  <section class="row elevation-5 rounded m-3 d-flex justify-content-between">
    <router-link class="col-8 d-flex text-black" @click="setActiveProfile()"
      :to="{ name: 'Profile', params: { profileId: post?.creator.id } }">
      <div class="col-3">
        <img :src="post.creator.picture" class="creator-img rounded-circle m-1 p-0"
          :alt="`${post.creator.name}'s Profile'`">
      </div>
      <div class="col-9">
        <h4>{{ post.creator.name }}</h4>
      </div>
    </router-link>
    <div v-if="isMe" class="col-3 justify-content-end d-flex">
      <i class="mdi mdi-trash-can p-1" @click="removePost()"></i>
    </div>
    <div class="col-12">
      <h3>{{ post.body }}</h3>
      <img v-if="post.imgUrl" class="post-img" :src="post.imgUrl" alt="">
    </div>
    <div v-if="user" class="col-6">
      <button class=" btn text-danger fs-4 " v-on:click="likePost()"><i class='mdi mdi-heart'></i>{{
          post.likes.length
      }}</button>
    </div>
    <div v-else class="col-6 text-danger">
      <button class=" btn text-danger fs-4 " disabled><i class='mdi mdi-heart'></i>{{
          post.likes.length
      }}</button>
    </div>
    <div class="col-6 d-flex justify-content-end align-items-center">
      <small class="text-end">Posted {{ post.createdAt }}</small>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";
import { profileService } from "../services/ProfileService.js";
import { postService } from "../services/PostService.js";
import Pop from "../utils/Pop.js";
import Login from "./Login.vue";
import { logger } from "../utils/Logger.js";
export default {
  props: {
    post: {
      type: Post, required: true,
    },
  },
  setup(props) {
    return {
      setActiveProfile() {
        profileService.setActiveProfile(props.post.creator)
      },
      async removePost() {
        try {
          if (await Pop.confirm('Are you sure you want to delete this post')) {
            await postService.removePost(props.post.id)
            Pop.toast('you have deleted the post', "success")
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      },
      async likePost() {
        try {
          await postService.likePost(props.post.id)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
      account: computed(() => AppState.activeProfile),
      user: computed(() => AppState.account),
      isMe: computed(() => props.post.creatorId.includes(AppState.account.id))
    }
  }
};
</script>


<style lang="scss" scoped>
.text-black {
  color: black;
}

.post-img {
  height: 20vh;
  width: 100%;
  object-fit: contain;
}

.creator-img {
  height: 7vh;
  width: 7vh;
  object-fit: cover;
  object-position: center;
}
</style>