import Grid from "@mui/material/Grid2";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";

import PersonHeader from "./HeaderPerson";

const TemplatePersonDetailsPage = ({ personDetails, children }) => {
  return (
    <>
      <PersonHeader person={personDetails} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{ xs: 3 }}>
          <div>
            <ImageListItem key={personDetails.profile_path} cols={1}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`}
                alt={personDetails.name}
              />
            </ImageListItem>
          </div>
        </Grid>

        <Grid size={{ xs: 9 }}>
          <Stack spacing={3}>{children}</Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplatePersonDetailsPage;
