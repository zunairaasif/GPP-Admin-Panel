import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Box, TextField, Button, Typography } from "@mui/material";

import style from "./style";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const EditService = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const initialServiceData = state?.serviceDetails;
  const [formData, setFormData] = useState({
    name: initialServiceData.name,
    image: initialServiceData.icon,
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleEditService = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const formDataForApi = new FormData();
    formDataForApi.append("name", formData.name);

    if (formData.image instanceof File) {
      formDataForApi.append("image", formData.image);
    }

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    axios
      .put(`${baseUrl}/services/service`, formDataForApi, {
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
        text="Error updating this service!"
      />

      <Typography variant="h3" sx={style.heading}>
        Edit service
      </Typography>

      <Grid container gap={5} sx={style.flex}>
        <Box sx={style.form} gap={2}>
          <Typography variant="h6">Name:</Typography>
          <TextField
            size="small"
            sx={style.label}
            variant="standard"
            value={formData.name}
            onChange={handleInputChange("name")}
          />
        </Box>

        <Box sx={style.form} gap={2}>
          <Typography variant="h6">Change image:</Typography>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Box>
      </Grid>

      {/* <Box sx={style.form} gap={2}>
          <Typography variant="h6">Uploaded image:</Typography>
        {formData.image &&  <Typography variant="body2">{formData.image}</Typography>}
      </Box> */}

      <Button variant="contained" sx={style.addBtn} onClick={handleEditService}>
        <Typography variant="body2">Edit service</Typography>
      </Button>
    </Layout>
  );
};

export default EditService;
