import { defineStore } from "pinia";
import type { Lead, LeadResponse } from "../@types/lead";
import { LeadsApi } from "@/apis/lead";

interface LeadsStore {
  leadResponse: LeadResponse
}

export const useLeadsStore = defineStore("lead", {
  state: (): LeadsStore => {
    return {
      leadResponse: null,
    };
  },
  getters: {
    getAllLeads(): Array<Lead> {
      return this.leadResponse._embedded.leads;
    },
  },
  actions: {
    async getRawLeadsData(accessToken: string) {
      this.leadResponse = await LeadsApi.getRawLeadsData(accessToken);
      console.log("this.leads", this.leadResponse);
    },
  },
});
