import { defineStore } from "pinia";
import { AuthApi } from "@/apis/auth";

interface Auth {
  clientId: string | null
  secretKey: string | null
  code: string | null
  accessToken: string | null
}

interface AuthStore {
  auth: Auth | null
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => {
    return {
      auth: {
        clientId: "bea3b8d5-f25b-44df-a1ae-c0249f02e6ff",
        secretKey: "fMfdpVGdI60TwQOsK5V3SgZ2QhzXQdPPp8IMJfAkYgrv9aXa7BcQkQ4AY6RU1fFH",
        code: null,
        accessToken: null,
      },
    };
  },
  getters: {},
  actions: {
    async saveCode(code: string) {
      this.auth.code = code;
    },
    async getAccessToken() {
      const accessToken = await AuthApi.getAccessToken(
        this.auth.clientId, this.auth.secretKey, this.auth.code);
      this.auth.accessToken = accessToken;
    },
  },
});
