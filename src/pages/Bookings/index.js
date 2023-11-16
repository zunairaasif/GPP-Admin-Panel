import React from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const Bookings = () => {
  const navigate = useNavigate();

  const handleNewBooking = () => {
    navigate("/new-booking");
  };

  return (
    <Layout>
      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all bookings" sx={style.heading} />
        <Button
          variant="contained"
          onClick={handleNewBooking}
          sx={style.button}
        >
          <Text variant="body2" text="Add new booking" />
        </Button>
      </Grid>
    </Layout>
  );
};

export default Bookings;
