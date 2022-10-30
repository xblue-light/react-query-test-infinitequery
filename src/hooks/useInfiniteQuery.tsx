import { useInfiniteQuery } from "react-query";
import axiosClient from "../api/axiosInstance";
import { UsersPage } from "../types";

async function getData({ pageParam = 0 }) {
  // 2- Update the http client to use axiosClient instead of fetch api
  const response = await axiosClient({
    url: `/data/v1/user?page=${pageParam}&limit=50`,
    method: "GET",
    headers: {
      "app-id": "",
    },
  });

  // 3- Destruct the following properties from response.data
  const { data, limit, page, total } = response.data;

  // 4- Update the variables usage
  const pageResponse: UsersPage = {
    results: data,
    next: total > page * limit ? pageParam + 1 : undefined,
  };
  return pageResponse;
}

export const useUsersQuery = () => {
  const query = useInfiniteQuery<UsersPage, Error>("users", getData, {
    getNextPageParam: (lastPage) => lastPage.next,
  });

  return query;
};
