<template>
  <div class="col-8 me-5 d-flex justify-content-between">
    <form action="" class="input-group" @submit.prevent="getSearchResults">
      <input type="text" class="form-control" v-model="search.query">
      <button class="btn text-light width border-light"><i class="mdi mdi-magnify"></i></button>
    </form>
  </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { Account } from "../models/Account.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js";
export default {
  props: {
    profile: {
      type: Account
    }
  },
  setup() {
    const route = useRoute();
    const search = reactive({
      query: ''
    })
    async function getSearchResults() {
      try {
        await profileService.getSearchResults(search.query)
        search.query = ''
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    return {
      route,
      search,
      getSearchResults,
    }
  }
};
</script>


<style lang="scss" scoped>
.width {
  width: 15%;
}
</style>