<script lang="ts" setup>
import router from "@/router";
import ganyu from "@/assets/images/Ganyu.webp";

const handleRedirect = async() => {
  router.push("/");
};
</script>
<template>
  <div class="h-screen grid place-items-center">
    <div class="max-w-3xl w-full p-6">
      <div class="aspect-[16/8] flex justify-center">
        <img class="h-full" :src="ganyu">
      </div>

      <div>
        <div class="text-6xl font-bold text-white text-center my-10">
          404 Not Found
        </div>
        <div class="text-center">
          <button class="daisy-btn daisy-btn-primary" @click="handleRedirect">
            Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
