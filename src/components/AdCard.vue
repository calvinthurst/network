<template>
  <div class="d-none d-md-block">
    <a :href="adLink">
      <section class="row elevation-5 bg-banner rounded">
      </section>
      <h4 class="text-darker text-center fw-bold card  rounded row"> Check Out {{ ad.title }} Today</h4>
    </a>
  </div>
  <div class="d-md-none d-flex row">
    <a :href="ad.linkURL">
      <section class="col-12 elevation-5 bg-short">
        <h3 class="text-light text-center">{{ ad.title }}</h3>
      </section>
    </a>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ad } from "../models/Ad.js";
export default {
  props: {
    ad: {
      type: Ad,
    },
  },
  setup(props) {
    const adLink = 'https://www.' + props.ad.linkURL
    return {
      adLink,
      banner: computed(() => `url(${props.ad.tall})`),
      short: computed(() => `url(${props.ad.banner})`)
    }
  }
};
</script>


<style lang="scss" scoped>
.text-darker {
  color: rgb(59, 55, 55);
}

.bg-short {
  height: 15vh;
  background-image: v-bind(short);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-banner {
  height: 38vh;
  background-image: v-bind(banner);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>