<template>
  <div>Leads</div>
</template>

<script lang="ts" setup>
function getParameterByName(name: string, url: string | undefined): string | null {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const source: string | null = "amoauth";
const code: string | null = getParameterByName("code", window.location.href);
const referer: string | null = getParameterByName("referer", window.location.href);
const state: string | null = getParameterByName("state", window.location.href);
const fromWidget: string | null = getParameterByName("from_widget", window.location.href);
const platform: string | null = getParameterByName("platform", window.location.href);

// Отправка параметров через postMessage
const targetWindow: Window | null = window.opener; // Здесь нужно указать целевое окно, куда вы хотите отправить сообщение
if (targetWindow) {
  const message = {
    source,
    code,
    referer,
    state,
    fromWidget,
    platform,
  };

  if (window.opener)
    targetWindow.postMessage(message, "*");
}
</script>
