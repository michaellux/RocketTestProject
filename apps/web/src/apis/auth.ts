import httpClient from "@/utils/http-client";

export const AuthApi = {
  async getAccessToken(
    clientId: string,
    secretKey: string,
    code: string) {
    const data = {
      client_id: clientId,
      client_secret: secretKey,
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000/postback",
    };
    console.log(data);
    const response = await httpClient.post("/api/auth", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
};
