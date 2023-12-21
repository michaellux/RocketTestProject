import httpClient from "@/utils/http-client";

export const LeadsApi = {
  async getRawLeadsData(accessToken: string) {
    const response = await httpClient({
      url: "/api/leads",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response);
    return response.data;
  },
  async getRawStatusData(accessToken: string, pipeLineId: string, statusId: string) {
    const response = await httpClient({
      url: `/api/leads/pipelines/${pipeLineId}/statuses/${statusId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response);
    return response.data;
  },
  async getRawResponsibleUser(accessToken: string, responsibleUserId: string) {
    const response = await httpClient({
      url: `/api/users/${responsibleUserId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response);
    return response.data;
  },
};
