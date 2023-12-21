import httpClient from "@/utils/http-client";

export const ContactsApi = {
  async getContactById(accessToken: string, contactId: string) {
    const response = await httpClient({
      url: `/api/contacts/${contactId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response);
    return response.data;
  },
};