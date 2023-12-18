import httpClient from "@/utils/http-client";

export const LeadsApi = {
  async getAllLeads() {
    const response = await httpClient({
      url: "/api/leads",
      method: "GET",
      headers: {

      },
    });

    return response.data;
  },
};
