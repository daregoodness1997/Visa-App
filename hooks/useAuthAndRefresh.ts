import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { urls } from "@/config/url";

const useAxiosWithAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = window.sessionStorage.getItem("access-token");
      if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }
    }

    axios.defaults.withCredentials = true;

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        if (
          error?.response?.status === 401 &&
          error?.response?.data?.message === "Token expired"
        ) {
          const refreshToken = window.sessionStorage.getItem("refresh-token");
          if (refreshToken) {
            try {
              const response = await axios.post(urls.refreshToken, {
                refreshToken: refreshToken,
              });

              const newAccessToken = response.data.access.token;
              axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

              // Retry the failed request
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios.request(error.config);
            } catch (refreshError) {
              toast.error(
                "Sorry, You are not authorized to access this page, kindly login"
              );
              router.replace(`/login?redirectTo=${router.pathname}`);
              return Promise.reject(error);
            }
          } else {
            toast.error(
              "Sorry, You are not authorized to access this page, kindly login"
            );
            router.replace(`/login?redirectTo=${router.pathname}`);
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [router]);

  return axios;
};

export default useAxiosWithAuth;
