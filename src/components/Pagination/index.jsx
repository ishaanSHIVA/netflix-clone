import { Button, Typography } from "@mui/material";
import React from "react";

import useStyles from "./styles";

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const classes = useStyles();

  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        variant="contained"
        style={{ backgroundColor: "red" }}
        type="button"
        onClick={() =>
          currentPage !== 1 && setPage((prevState) => prevState - 1)
        }
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        style={{ backgroundColor: "red" }}
        type="button"
        onClick={() =>
          currentPage !== totalPages && setPage((prevState) => prevState + 1)
        }
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
