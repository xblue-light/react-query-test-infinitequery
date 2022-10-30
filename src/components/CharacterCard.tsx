function CharacterCard({ data, isLoading, isError }: any) {
  if (isLoading) {
    return <div>Loading chars...</div>;
  }
  if (isError) {
    return <div>An error occured!</div>;
  }

  if (data === undefined) {
    return <div>No data found!</div>;
  }
  return (
    <>
      {data &&
        data?.results?.map((val: any) => <li key={val?.id}>{val?.episode}</li>)}
    </>
  );
}

export default CharacterCard;
