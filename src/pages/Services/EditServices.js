import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
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
    id: initialServiceData._id,
    name: initialServiceData.name,
    icon: initialServiceData.icon,
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, icon: file });
  };

  const handleEditService = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const formDataForApi = new FormData();
    formDataForApi.append("id", formData.id);
    formDataForApi.append("name", formData.name);

    if (formData.icon instanceof File) {
      formDataForApi.append("icon", formData.icon);
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

      <Text variant="h3" text="Edit service" sx={style.heading} />

      <Grid container gap={10} sx={style.flex}>
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
          <Text variant="h6" text="Change icon:" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Box>
      </Grid>

      <Box sx={style.form} gap={2}>
        <Text variant="h6" text="Uploaded icon:" />
        {formData.icon && <Text variant="body2" text={formData.icon} />}
      </Box>

      <Button variant="contained" sx={style.addBtn} onClick={handleEditService}>
        <Text variant="body2" text="Edit service" />
      </Button>
    </Layout>
  );
};

export default EditService;
