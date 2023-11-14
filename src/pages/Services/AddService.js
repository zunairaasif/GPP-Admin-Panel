import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const AddService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleAddService = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    // Use FormData to handle file uploads
    const formDataForApi = new FormData();
    formDataForApi.append("name", formData.name);
    formDataForApi.append("image", formData.image);

    axios
      .post(`${baseUrl}/services/service`, formDataForApi, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Services API:", response.data);
          setLoading(false);
          navigate("/services");
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
        text="Error adding a new service!"
      />

      <Text variant="h3" text="Add a new service" sx={style.heading} />

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
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Box>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddService}>
        <Text variant="body2" text="Add service" />
      </Button>
    </Layout>
  );
};

export default AddService;
