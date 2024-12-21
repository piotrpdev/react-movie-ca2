import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getPersonMovies } from "../api/tmdb-api";
import Spinner from "./Spinner";

export default function PersonMovies({ personDetails }) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["personMovies", { id: personDetails.id }],
    queryFn: getPersonMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;

  return (
    <>
      <Typography variant="h5" component="h3">
        Movies
      </Typography>

      <Stack direction="row" spacing={1}>
        {cast.slice(0, 6).map((c) => (
          <Card
            key={c.id}
            sx={{ display: "flex", flexDirection: "column", width: 345 }}
          >
            <CardMedia
              sx={{ height: 235 }}
              image={`https://image.tmdb.org/t/p/w235_and_h235_face/${c.poster_path}.jpg`}
              title={c.name}
            />
            <CardContent sx={{ marginBottom: "auto", paddingBottom: 4 }}>
              <Typography gutterBottom variant="h5" component="div">
                {c.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {c.character}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Link to={`/movies/${c.id}`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
}
