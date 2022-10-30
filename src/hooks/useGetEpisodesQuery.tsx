import { useQuery } from "react-query";
import { rickAndMortyAxiosClient } from "../api/axiosInstance";

async function getData() {
  // 2- Update the http client to use rickAndMortyAxiosClient instead of fetch api
  const response = await rickAndMortyAxiosClient({
    url: `episode/1,2,3,4,5`,
    method: "GET",
  });

  // 3- Destruct the following properties from response.data
  const { data } = response;

  // 4- Update the variables usage
  const episodesResponse: any = {
    results: data,
  };
  return episodesResponse;
}

export const useGetEpisodesQuery = () => {
  return useQuery<any, Error>("getRickAndMortyEpisodes", getData);
};
