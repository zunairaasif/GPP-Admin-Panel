import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const AddCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAddCategory = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${baseUrl}/categories/category`, formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Category API:", response.data.message);
          setLoading(false);
          navigate("/categories");
        } else {
          console.error("Error:", response.data.error);
          setLoading(false);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
        setOpenSnackbar(true);
      });
  };

  return (
    <Layout>
      <Loader open={loading} />

      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
        text="Error adding a new category!"
      />

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

        <Box sx={style.form} gap={2}>
          <Text variant="h6" text="Choose icon:" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Box>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddCategory}>
        <Text variant="body2" text="Add category" />
      </Button>
    </Layout>
  );
};

export default AddCategory;
