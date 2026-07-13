"use client"

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken: string | null = null;

if (typeof window !== "undefined") {
  authToken = localStorage.getItem("token");
}

apiClient.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export functions
export const api = {
  get: <T>(url: string, auth?: boolean) => {
    const headers: HeadersInit = {};
    if (auth || authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return apiClient.get<T>(url).then((response) => response.data);
  },
  post: <T>(url: string, data: any, auth?: boolean) => {
    const headers: HeadersInit = {};
    if (auth || authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return apiClient.post<T>(url, data).then((response) => response.data);
  },
  put: <T>(url: string, data: any, auth?: boolean) => {
    const headers: HeadersInit = {};
    if (auth || authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return apiClient.put<T>(url, data).then((response) => response.data);
  },
  delete: <T>(url: string, auth?: boolean) => {
    const headers: HeadersInit = {};
    if (auth || authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return apiClient.delete<T>(url).then((response) => response.data);
  },
  getToken: () => authToken,
  setToken: (token: string | null) => {
    authToken = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  },
};

export async function fetchProducts(status?: string, connector?: string) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (connector) params.set("connector", connector);
  const qs = params.toString();
  return api.get<any>(`/products${qs ? `?${qs}` : ""}`);
}

export async function fetchProduct(slug: string) {
  return api.get<any>(`/products/${slug}`);
}

export async function loginAdmin(email: string, password: string) {
  const result: any = await api.post<any>("/auth/login", { email, password });
  api.setToken(result.token);
  return result;
}