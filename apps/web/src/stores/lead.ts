import { defineStore } from "pinia";
import { LeadsApi } from "@/apis/lead";

interface LeadsStore {

}

export const useLeadsStore = defineStore("lead", {
  state: (): LeadStore => {
    return {
      
    };
  },
  getters: {},
  actions: {
    async getAllLeads() {
      const lead = await LeadsApi.getAllLeads();
    },
  },
});