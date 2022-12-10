<template>
  <section class="row elevation-5 m-3 d-flex justify-content-between">
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
    <div class="col-3 text-end">
      <i v-if="isMe" class="mdi mdi-dots-horizontal"></i>
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