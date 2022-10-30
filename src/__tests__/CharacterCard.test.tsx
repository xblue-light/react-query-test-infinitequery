import { render, screen } from "@testing-library/react";
import { useGetEpisodesQuery } from "../hooks/useGetEpisodesQuery";
import CharacterCard from "../components/CharacterCard";
import { episodes } from "../fixtures";

// Make TypeScript Happy, by resolving TS errors
const mockedUseGetEpisodesQuery = useGetEpisodesQuery as jest.Mock<any>;

// Mock the hook module
jest.mock("../hooks/useGetEpisodesQuery");

describe("<CharacterCard />", () => {
  const data = {
    results: episodes.data,
  };

  beforeEach(() => {
    mockedUseGetEpisodesQuery.mockImplementation(() => ({
      episodes,
      isLoading: true,
      isError: false,
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders without crashing", () => {
    let props = { data, isLoading: true, isError: false };
    render(<CharacterCard {...props} />);
  });

  it("Displays loading message", () => {
    let props = { data, isLoading: true, isError: false };
    mockedUseGetEpisodesQuery.mockImplementation(() => ({
      status: "loading",
    }));
    render(<CharacterCard {...props} />);
    expect(screen.getByText(/Loading chars.../i)).toBeInTheDocument();
  });

  it("Displays error message", () => {
    const props = { data, isLoading: false, isError: true };
    mockedUseGetEpisodesQuery.mockImplementation(() => ({
      status: "error",
      error: {
        message: "An error occured!",
      },
    }));
    render(<CharacterCard {...props} />);
    expect(screen.getByText(/An error occured!/i)).toBeInTheDocument();
  });

  it("Displays no data found message", () => {
    const props = { data: undefined, isLoading: false, isError: false };
    mockedUseGetEpisodesQuery.mockImplementation(() => ({
      status: "loaded",
      data: undefined,
    }));
    render(<CharacterCard {...props} />);
    expect(screen.getByText(/No data found!/i)).toBeInTheDocument();
  });

  it("Display the episode list and check for text", () => {
    let props = { data, isLoading: false, isError: false };
    mockedUseGetEpisodesQuery.mockImplementation(() => ({
      status: "success",
      data: {
        results: data,
      },
    }));
    render(<CharacterCard {...props} />);

    const firstEpisode = `${data.results[0].episode}`;

    expect(screen.getByText(firstEpisode)).toBeInTheDocument();
  });
});
