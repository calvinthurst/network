<template>
  <div class="col-12 d-flex justify-content-end">
    <button type="button" class="col-2 btn btn-outline  fw-bold text-light fs-2" data-bs-toggle="modal"
      data-bs-target="#Modal" tag="Edit your profile">
      <i class="col-1 mdi mdi-pencil"></i>
    </button>
    <div class="modal modal-xl profile-form fade text-dark " id="Modal" tabindex="-1" aria-labelledby="ModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editAccount()" action="">
              <div class="mb-3 ">
                <label for="InputName" class="form-label">Name</label>
                <input type="text" class="form-control" v-model="state.name" id="InputName" aria-describedby="nameHelp">
                <div id="nameHelp" class="form-text">Your Name: {{ state.name }}</div>
              </div>
              <div class="mb-3 ">
                <label for="InputClass" class="form-label">What Class Are You Apart Of</label>
                <input type="text" class="form-control" v-model="state.class" id="InputClass"
                  aria-describedby="classHelp">
                <div id="classHelp" class="form-text">Your Class: {{ state.class }}</div>
              </div>
              <div class="mb-3 ">
                <label for="Input" class="form-label">Email</label>
                <input type="text" class="form-control" v-model="state.email" id="InputEmail"
                  aria-describedby="emailHelp">
                <div id="emailHelp" email="form-text">Your Email: {{ state.email }}</div>
              </div>
              <div class="mb-3  col-12">
                <label for="body" class="form-label">Your Bio</label>
                <textarea name="" id="" class="form-control" v-model="state.bio" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label for="Input" class="form-label">Picture</label>
                <input type="url" class="form-control" v-model="state.picture" id="InputPicture"
                  aria-describedby="pictureHelp">
                <img :src="state.picture" class="form-profile-img" alt="">
              </div>
              <div class="mb-3">
                <label for="InputCoverImg" class=" form-label">Your CoverImg</label>
                <input type="url" class="form-control" v-model="state.coverImg" id="InputCoverImg"
                  aria-describedby="pictureHelp">
                <img :src="state.coverImg" class="form-profile-img" alt="">
              </div>
              <div class="mb-3 ">
                <label for="Input" class="form-label">Github</label>
                <input type="url" class="form-control" v-model="state.github" id="InputGithub"
                  aria-describedby="githubHelp">
                <div id="githubHelp" class="form-text">Your Github {{ state.github }}</div>
              </div>
              <div class="mb-3 ">
                <label for="Input" class="form-label">Linkedin</label>
                <input type="url" class="form-control" v-model="state.linkedin" id="InputLinkedin"
                  aria-describedby="linkedinHelp">
                <div id="linkedinHelp" class="form-text">Your Linkedin {{ state.linkedin }}</div>
              </div>
              <div class="mb-3 ">
                <label for="Input" class="form-label">Resume</label>
                <input type="url" class="form-control" v-model="state.resume" id="InputResume"
                  aria-describedby="resumeHelp">
                <div id="resumeHelp" class="form-text">Your Resume {{ state.resume }}</div>
              </div>
              <div class="mb-2  form-check d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" class="form-check-input" v-model="state.graduated" id="Graduated">
                  <label class="form-check-label" for="Graduated">Are you Graduated</label>
                </div>
                <button type="submit" class="btn outline-btn-success fw-bold text-end">Save Profile <i
                    class="mdi mdi-pencil-outline"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";
export default {
  setup() {
    const state = ref({})
    onMounted(() => {
      state.value = AppState.account
    })
    async function editAccount() {
      try {
        await accountService.editAccount(state.value)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    return {
      state,
      editAccount,
      account: computed(() => AppState.account)
    }
  }
};
</script>


<style lang="scss" scoped>
.form-profile-img {
  height: 15vh;
}

.profile-form {
  height: 60vh;
}
</style>