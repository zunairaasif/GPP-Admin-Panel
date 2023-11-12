import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Confirm from "../../components/ConfirmMsg";

const Services = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [serviceIdToDelete, setServiceIdToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/services/service`)
      .then((response) => {
        const service = response.data.services;
        setServices(service);
        console.log(service);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleNewService = () => {
    navigate("/new-service");
  };

  const handleOpen = (categoryId) => {
    setServiceIdToDelete(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setServiceIdToDelete(null);
    setOpen(false);
  };

  const handleDelete = async () => {
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
    } catch (error) {
      console.error("Error deleting services:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <Layout>
      <Confirm
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all services" sx={style.heading} />
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
              <EditIcon sx={style.edit} />
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
