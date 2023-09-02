import useSWR from "swr";
import { fetchUser } from "../axios/user";
import { urls } from "@/config/url";

export const useFetchUsers = () => {
  const fetcher = async () => {
    const response = await fetchUser();
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(urls.user, fetcher);
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};
