import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const AddCategory = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAddCategory = () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${baseUrl}/categories/category`, formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Category API:", response.data.message);
          navigate("/categories");
        } else console.error("Error:", response.data.error);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <Layout>
      <Text variant="h3" text="Add a new category" sx={style.heading} />

      <Grid container gap={6} sx={style.flex}>
        <Box sx={style.form} gap={2}>
          <Text variant="h6" text="Enter Name" />
          <TextField
            size="small"
            sx={style.label}
            value={formData.name}
            onChange={handleInputChange("name")}
          />
        </Box>

        <Button
          variant="contained"
          sx={style.addBtn}
          onClick={handleAddCategory}
        >
          <Text variant="body2" text="Add category" />
        </Button>
      </Grid>
    </Layout>
  );
};

export default AddCategory;
