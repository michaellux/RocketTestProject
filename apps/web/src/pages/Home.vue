<template>
  <div>Test</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const clientId = authStore.auth.clientId;
let popup;
auth();
function auth() {
  const url = `https://www.amocrm.ru/oauth?client_id=${clientId}`;
  popup = window.open(url, "Предоставить доступ", "scrollbars, status, resizable, width=750, height=580");
}

window.addEventListener("message", updateAuthInfo);
function updateAuthInfo(e) {
  if (e.data.source === "amoauth") {
    if (e.data.error !== undefined)
      console.log(`Ошибка - ${e.data.error}`);

    else {
      console.log("Авторизация прошла");
      authStore.saveCode(e.data.code);
      authStore.getAccessToken();
    }
    // 4. Закрываем модальное окно
    popup.close();
  }
}
</script>
