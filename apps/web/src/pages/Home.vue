<template>
  <div class="container mx-auto my-5 place-content-center grid">
    <Card v-if="!isWaiting">
      <template #title>
        <h1 class="p-4">
          Сделки {{ isLoadingData ? 'загружаются' : '' }}
        </h1>
      </template>
      <template #content>
        <div class="wrapper p-4">
          <DataTable
            v-model:expandedRows="expandedRows" :value="leads"
            data-key="id" table-style="min-width: 60rem"
          >
            <div v-if="!isLoadingData">
              <Column expander style="width: 5rem" />
              <Column field="name" header="Название" />
              <Column field="price" header="Бюджет" />
              <Column header="Статус">
                <template #body="slotProps">
                  <Tag :value="slotProps.data.status.name" />
                </template>
              </Column>
              <Column field="responsibleUser.name" header="Ответственный">
                <template #body="slotProps">
                  <Avatar icon="pi pi-user" style="background-color: #9c27b0; color: #ffffff" shape="circle" />
                  {{ slotProps.data.responsibleUser.name }}
                </template>
              </Column>
              <Column field="createdDate" header="Дата создания" />
            </div>
            <div class="grid place-content-center">
              <ProgressSpinner
                v-if="isLoadingData"
                style="width: 50px; height: 50px" stroke-width="8" fill="var(--surface-ground)"
                animation-duration=".5s" aria-label="Custom ProgressSpinner"
              />
            </div>
          </DataTable>
        </div>
      </template>
    </Card>
    <ProgressSpinner
      v-if="isWaiting"
      style="width: 50px; height: 50px" stroke-width="8" fill="var(--surface-ground)"
      animation-duration=".5s" aria-label="Custom ProgressSpinner"
    />
  </div>
</template>

<script lang="ts" setup>
import ProgressSpinner from "primevue/progressspinner";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Avatar from "primevue/avatar";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";
import { onMounted, ref } from "vue";
import { useLeadsStore } from "../stores/lead";
import { useAuthStore } from "../stores/auth";
import type { Lead } from "../@types/lead";
const authStore = useAuthStore();
const leadsStore = useLeadsStore();
const isWaiting = ref<boolean>(true);
const isLoadingData = ref<boolean>(true);
const leads = ref<Array<Lead>>();
const expandedRows = ref<Array<any>>([]);
const clientId: string = authStore.auth.clientId;
let popup;

auth();
function auth() {
  const url = `https://www.amocrm.ru/oauth?client_id=${clientId}`;
  popup = window.open(url, "Предоставить доступ", "scrollbars, status, resizable, width=750, height=580");
}

window.addEventListener("message", updateAuthInfo);
async function updateAuthInfo(e) {
  if (e.data.source === "amoauth") {
    if (e.data.error !== undefined) { console.log(`Ошибка - ${e.data.error}`); }

    else {
      console.log("Авторизация прошла");
      authStore.saveCode(e.data.code);
      await authStore.getAccessToken();
      if (authStore.auth.accessToken) {
        isWaiting.value = false;
        isLoadingData.value = true;
        await leadsStore.getRawLeadsData();
        await leadsStore.getAllLeads();

        if (leadsStore.leads) {
          leads.value = leadsStore.leads;
          isLoadingData.value = false;
        }
      }
    }
    // 4. Закрываем модальное окно
    popup.close();
  }
}
</script>
