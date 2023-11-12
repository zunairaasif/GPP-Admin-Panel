import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const EditCategory = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const initialCategoryData = state?.categoryDetails;

  const [formData, setFormData] = useState({
    id: initialCategoryData._id,
    name: initialCategoryData.name,
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleEditCategory = () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .put(`${baseUrl}/categories/category`, formData, {
        headers: headers,
      })
      .then((response) => {
        const data = response.data;

        if (data.success) {
          console.log("Category API:", data.message);
          navigate("/categories");
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error editing category:", error);
      });
  };

  return (
    <Layout>
      <Text variant="h3" text="Edit category" sx={style.heading} />

      <Grid container gap={6} sx={style.flex}>
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

        <Button
          variant="contained"
          sx={style.addBtn}
          onClick={handleEditCategory}
        >
          <Text variant="body2" text="Edit category" />
        </Button>
      </Grid>
    </Layout>
  );
};

export default EditCategory;
