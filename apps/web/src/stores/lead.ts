import { defineStore } from "pinia";
import type { Lead, LeadResponse } from "../@types/lead";
import { useAuthStore } from "./auth";
import { LeadsApi } from "@/apis/lead";
interface LeadsStore {
  leadResponse: LeadResponse
  leads: Array<Lead>
}

export const useLeadsStore = defineStore("lead", {
  state: (): LeadsStore => {
    return {
      leadResponse: null,
      leads: [],
    };
  },
  getters: {
  },
  actions: {
    async getRawLeadsData() {
      const authStore = useAuthStore();
      const accessToken = authStore.auth.accessToken.access_token;
      this.leadResponse = await LeadsApi.getRawLeadsData(accessToken);
      console.log("this.leads", this.leadResponse);
    },
    async getAllLeads(): Promise<Lead[]> {
      const authStore = useAuthStore();
      const accessToken = authStore.auth.accessToken.access_token;

      const leadPromises = this.leadResponse._embedded.leads.map(async(rawLeadItem) => {
        const status = await LeadsApi.getRawStatusData(accessToken, `${rawLeadItem.pipeline_id}`, `${rawLeadItem.status_id}`);
        const responsibleUser = await LeadsApi.getRawResponsibleUser(accessToken, `${rawLeadItem.responsible_user_id}`);
        const createdDate = new Date(rawLeadItem.created_at * 1000);
        const formattedDate = `${createdDate.toLocaleDateString("ru-RU")} ${createdDate.toLocaleTimeString("ru-RU")}`
        const lead: Lead = {
          id: rawLeadItem.id,
          name: rawLeadItem.name,
          price: rawLeadItem.price,
          status: {
            id: status.id,
            name: status.name,
            pipeline_id: status.pipeline_id,
            color: status.color,
          },
          responsibleUser: {
            id: responsibleUser.id,
            name: responsibleUser.name,
            email: responsibleUser.email,
            lang: responsibleUser.lang,
            rights: responsibleUser.rights,
          },
          createdDate: formattedDate,
        };
        return lead;
      });

      this.leads = await Promise.all(leadPromises);
      return this.leads;
    },
  },
});
