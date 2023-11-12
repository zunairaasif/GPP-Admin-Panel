import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const AddLottery = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    joinPrice: "",
    winPrice: "",
    endTime: "",
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAddLottery = () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${baseUrl}/lottery/lottery`, formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Lottery API:", response.data);
          navigate("/lotteries");
        } else console.error("Error:", response.data.error);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <Layout>
      <Text variant="h3" text="Add a new lottery" sx={style.heading} />

      <Grid container gap={8} sx={style.flex}>
        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter Name" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter end time" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.endTime}
              onChange={handleInputChange("endTime")}
            />
          </Box>
        </Grid>

        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter join price" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.joinPrice}
              onChange={handleInputChange("joinPrice")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter win price" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.winPrice}
              onChange={handleInputChange("winPrice")}
            />
          </Box>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddLottery}>
        <Text variant="body2" text="Add lottery" />
      </Button>
    </Layout>
  );
};

export default AddLottery;
