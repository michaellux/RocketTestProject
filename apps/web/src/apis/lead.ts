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
};
