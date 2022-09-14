import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetActorsDetailsQuery } from "../../services/TMDB";

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const history = useHistory();

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress size="8rem"></CircularProgress>
      </Box>
    );
  }
  if (error) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
        ></Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            className={classes.image}
            alt={data.name}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Actors;
