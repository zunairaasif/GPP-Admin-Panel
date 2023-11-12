import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const AddService = () => {
  const navigate = useNavigate;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    icon: "",
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAddService = () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${baseUrl}/services/service`, formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Services API:", response.data);
          navigate("/services");
        } else console.error("Error:", response.data.error);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <Layout>
      <Text variant="h3" text="Add a new category" sx={style.heading} />

      <Grid container gap={10} sx={style.flex}>
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
          <Text variant="h6" text="Choose icon:" />
          <input type="file" />
          {/* <TextField
            size="small"
            sx={style.label}
            value={formData.icon}
            onChange={handleInputChange("icon")}
          /> */}
        </Box>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddService}>
        <Text variant="body2" text="Add service" />
      </Button>
    </Layout>
  );
};

export default AddService;
