import { urls } from "@/config/url";
import axiosInterceptorInstance from "@/interceptors";
import axios from "axios";

export const fetchUser = (url?: string) =>
  axios({
    method: "get",
    url: urls.user,
  });
