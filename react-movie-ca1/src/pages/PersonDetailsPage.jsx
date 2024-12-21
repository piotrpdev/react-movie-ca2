import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getPersonDetails } from "../api/tmdb-api";
import PersonDetails from "../components/PersonDetails";
import PersonMovies from "../components/PersonMovies";
import Spinner from "../components/Spinner";
import PageTemplate from "../components/TemplatePersonDetailsPage";
// import useMovie from "../hooks/useMovie";   Redundant

const PersonDetailsPage = () => {
  const { id } = useParams();
  const {
    data: personDetails,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["person", { id: id }],
    queryFn: getPersonDetails,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {personDetails ? (
        <>
          <PageTemplate personDetails={personDetails}>
            <PersonDetails personDetails={personDetails} />
            <PersonMovies personDetails={personDetails} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for person details</p>
      )}
    </>
  );
};

export default PersonDetailsPage;
