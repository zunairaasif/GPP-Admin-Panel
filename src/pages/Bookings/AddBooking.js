import React from "react";
import { Grid } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const AddBooking = () => {
  return (
    <Layout>
      <Grid container sx={style.container}>
        <Text variant="h3" text="Add a new booking" sx={style.heading} />
      </Grid>
    </Layout>
  );
};

export default AddBooking;
