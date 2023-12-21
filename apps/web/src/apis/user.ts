import httpClient from "@/utils/http-client";

export const UsersApi = {
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
