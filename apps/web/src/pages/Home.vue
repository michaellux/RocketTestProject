<template>
  <div class="container mx-auto my-5">
    <div class="card">
      <DataTable
        v-model:expandedRows="expandedRows" :value="leads" data-key="id"
        table-style="min-width: 60rem"
      >
        <Column expander style="width: 5rem" />
        <Column field="name" header="Название" />
        <Column field="price" header="Бюджет" />
        <Column header="Статус">
          <template #body="slotProps">
            <Tag :value="slotProps.data.status.name" />
          </template>
        </Column>
        <Column field="responsibleUser.name" header="Ответственный" />
        <Column field="createdDate" header="Дата создания" />
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import "primevue/resources/themes/lara-light-green/theme.css";

import { ref } from "vue";
import { useLeadsStore } from "../stores/lead";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const leadsStore = useLeadsStore();
const leads = ref();
const expandedRows = ref([]);
const clientId = authStore.auth.clientId;
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
        await leadsStore.getRawLeadsData();
        await leadsStore.getAllLeads();
        if (leadsStore.leads)
          leads.value = leadsStore.leads;
      }
    }
    // 4. Закрываем модальное окно
    popup.close();
  }
}
</script>
