import axios from "axios";
import React, { useState } from "react";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const EditLottery = () => {
  const [formData, setFormData] = useState({
    name: "",
    joinPrice: "",
    winPrice: "",
    endTime: "",
  });
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAddLottery = () => {
    console.log("Edit");
  };

  return (
    <Layout>
      <Text variant="h3" text="Edit lottery" sx={style.heading} />

      <Grid container gap={8} sx={style.flex}>
        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Name:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="End time:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.endTime}
              onChange={handleInputChange("endTime")}
            />
          </Box>
        </Grid>

        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Join price:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.joinPrice}
              onChange={handleInputChange("joinPrice")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Win price:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.winPrice}
              onChange={handleInputChange("winPrice")}
            />
          </Box>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddLottery}>
        <Text variant="body2" text="Edit lottery" />
      </Button>
    </Layout>
  );
};

export default EditLottery;
