import { useInfiniteQuery } from "react-query";
import { UsersPage } from "./types";

async function getData({ pageParam = 0 }) {
  const response = await fetch(
    `https://dummyapi.io/data/v1/user?page=${pageParam}&limit=50`,
    {
      headers: {
        "app-id": `635e20c5ff41f7624510a6e8`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const dataFromServer = await response.json();
  console.log(dataFromServer);
  // Please note that this data will definitely vary so modify accordingly to the API results.
  const data: UsersPage = {
    results: dataFromServer.data,
    next:
      dataFromServer.total > dataFromServer.page * dataFromServer.limit
        ? pageParam + 1
        : undefined,
  };
  //console.log(JSON.stringify(data, null, 4));
  return data;
}

export const useUsersQuery = () => {
  const query = useInfiniteQuery<UsersPage, Error>("users", getData, {
    getNextPageParam: (lastPage) => lastPage.next,
  });

  return query;
};
