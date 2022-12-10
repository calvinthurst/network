<template>
  <section class="row elevation-5 m-3 d-flex justify-content-between rounded">
    <router-link class="col-8 d-flex" @click="setActiveProfile()"
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
      <i class="mdi mdi-dots-horizontal p-1"></i>
      <i class="mdi mdi-trash-can p-1" @click="removePost()"></i>
    </div>
    <div class="col-12">
      <h3>{{ post.body }}</h3>
      <img v-if="post.imgUrl" class="post-img" :src="post.imgUrl" alt="">
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

        if (await Pop.confirm('Are you sure you want to delete this post')) {
          await postService.removePost(props.post.id)
          Pop.toast('you have deleted the post', "success")
        }
      },
      isMe: computed(() => props.post.creatorId.includes(AppState.account.id))
    }
  }
};
</script>


<style lang="scss" scoped>
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