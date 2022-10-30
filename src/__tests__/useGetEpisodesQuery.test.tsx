import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryCache } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { episodes } from "../fixtures";
import { useGetEpisodesQuery } from "../hooks/useGetEpisodesQuery";

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const server = setupServer(
  rest.get(
    "https://rickandmortyapi.com/api/episode/1,2,3,4,5",
    (req, res, ctx) => {
      let response = episodes.data;
      return res(ctx.json(response));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());

describe("useGetEpisodesQuery", () => {
  it("fetches the episodes list", async () => {
    // Fetches Page 0
    const { result, waitFor } = renderHook(() => useGetEpisodesQuery(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    // console.log(JSON.stringify(result.current));
    expect(result.current.data).toStrictEqual({
      results: episodes.data,
    });
  });
});
