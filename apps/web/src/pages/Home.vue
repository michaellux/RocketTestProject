<template>
  <div class="container mx-auto my-5 place-content-center grid">
    <Card v-if="!isWaiting">
      <template #title>
        <h1 class="p-4">
          Сделки
        </h1>
      </template>
      <template #content>
        <div class="wrapper p-4">
          <DataTable
            v-model:expandedRows="expandedRows" :value="leads"
            data-key="id" table-style="min-width: 60rem"
            :loading="isLoadingData"
          >
            <template #header>
              <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="query" placeholder="Найти..." @update:model-value="fetchLeads" />
                </span>
              </div>
            </template>
            <template #empty>
              <p class="empty-text">
                Сделок нет
              </p>
            </template>

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
            <template #expansion="slotProps">
              <Card>
                <template #title>
                  <h3 class="p-3 contacts-title">
                    Контакты
                  </h3>
                </template>
                <template #content>
                  <DataTable :value="slotProps.data.contacts">
                    <Column field="name" header="Имя" />
                    <Column field="phone" header="Телефон" />
                    <Column field="email" header="Email" />
                  </DataTable>
                </template>
              </Card>
            </template>

            <template #loading>
              <div class="loadingdata">
                <ProgressSpinner
                  style="width: 50px; height: 50px" stroke-width="8" fill="var(--surface-ground)"
                  animation-duration=".5s" aria-label="Custom ProgressSpinner"
                />
                <p class="text">
                  Сделки загружаются
                </p>
              </div>
            </template>
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
import InputText from "primevue/inputtext";
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
const query = ref<string>("");
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
      fetchLeads();
    }
    // 4. Закрываем модальное окно
    popup.close();
  }
}

async function fetchLeads(query?: string) {
  if (authStore.auth.accessToken) {
    isWaiting.value = false;
    isLoadingData.value = true;
    await leadsStore.getRawLeadsData(query);
    await leadsStore.getAllLeads();

    if (leadsStore.leads) {
      leads.value = leadsStore.leads;
      isLoadingData.value = false;
    }
  }
}
</script>

<style>
.p-datatable .p-datatable-header {
    background: #f9fafb;
    color: #374151;
    border: 1px solid #e5e7eb;
    border-width: 1px 0 1px 0;
    padding: 1rem 1rem;
    font-weight: 700;
}
.p-input-icon-left > .p-inputtext {
    padding-left: 2.5rem;
}
.p-component, .p-component * {
    box-sizing: border-box;
}
.p-inputtext {
    font-family: var(--font-family);
    font-feature-settings: var(--font-feature-settings, normal);
    font-size: 1rem;
    color: #4b5563;
    background: #ffffff;
    padding: 0.75rem 0.75rem;
    border: 1px solid #d1d5db;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    border-radius: 6px;
}
.p-input-icon-left > .p-inputtext {
    padding-left: 2.5rem;
}
.p-datatable .p-datatable-thead tr th {
    text-align: left;
    padding: 1rem 1rem;
    border: 1px solid #e5e7eb;
    border-width: 0 0 1px 0;
    font-weight: 700;
    color: #374151;
    background: #f9fafb;
    transition: box-shadow 0.2s;
}
.p-datatable .p-datatable-tbody tr td {
    text-align: left;
    border: 1px solid #e5e7eb;
    border-width: 0 0 1px 0;
    padding: 1rem 1rem;
}
.p-tag-value {
  padding: 0.4rem;
}
.contacts-title {
  font-size: 1rem;
}
.loadingdata {
  display: grid;
  place-items: center;
  gap: 1rem;
}
.loadingdata .text {
  color: white;
  font-weight: bold;
  font-size: larger;
}
.pi-search {
  position: absolute;
  top: 1rem;
}
.empty-text {
  text-align: center;
}
</style>
