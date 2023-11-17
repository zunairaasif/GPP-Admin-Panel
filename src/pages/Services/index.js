import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Confirm from "../../components/ConfirmMsg";
import AlertMessage from "../../components/Alert";

const Services = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState(null);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/services/service`)
      .then((response) => {
        const service = response.data.services;
        setServices(service);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [baseUrl]);

  const handleNewService = () => {
    navigate("/new-service");
  };

  const handleEditService = (serviceId, serviceDetails) => {
    navigate(`/edit-service/${serviceId}`, { state: { serviceDetails } });
  };

  const handleOpen = (serviceId) => {
    setServiceIdToDelete(serviceId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setServiceIdToDelete(null);
  };

  const handleDelete = async () => {
    setOpen(false);
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(`${baseUrl}/services/service/${serviceIdToDelete}`, {
        headers,
      });

      const response = await axios.get(`${baseUrl}/services/service`);
      const updatedServices = response.data.services;

      console.log("Services deleted successfully");
      setServices(updatedServices);
      setLoading(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting services:", error);
      setLoading(false);
      setOpenErrorSnackbar(true);
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Loader open={loading} />

      <Confirm
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="success"
        text="Service deleted successfully!"
      />

      <AlertMessage
        open={openErrorSnackbar}
        onClose={() => setOpenErrorSnackbar(false)}
        severity="error"
        text="Error deleting service!"
      />

      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all services" />
        <Button
          variant="contained"
          onClick={handleNewService}
          sx={style.button}
        >
          <Text variant="body2" text="Add new service" />
        </Button>
      </Grid>

      <Grid container gap={5}>
        {services?.map((value, index) => (
          <Grid item md={5.75} container gap={1} sx={style.block} key={index}>
            <Box sx={style.wrap} gap={2}>
              <img src={value.icon} alt={value.name} width={20} />
              <Text variant="body1" text={value.name} />
            </Box>

            <Box sx={style.wrap} gap={2}>
              <EditIcon
                sx={style.edit}
                onClick={() => handleEditService(value._id, value)}
              />
              <DeleteIcon
                sx={style.delete}
                color="error"
                onClick={() => handleOpen(value._id)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Services;
