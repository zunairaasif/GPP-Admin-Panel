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

const Trips = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [tripIdToDelete, setTripIdToDelete] = useState(null);

  const [trip, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/trips/trip`)
      .then((response) => {
        const trip = response.data.trips;
        setTrips(trip);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const handleNewTrip = () => {
    navigate("/new-trip");
  };

  const handleViewDetails = () => {
    navigate("/view-details");
  };

  const handleOpen = (categoryId) => {
    setTripIdToDelete(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setTripIdToDelete(null);
    setOpen(false);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(`${baseUrl}/trips/trip/${tripIdToDelete}`, {
        headers,
      });

      const response = await axios.get(`${baseUrl}/trips/trip`);
      const updatedTrip = response.data.trips;

      console.log("Trips deleted successfully");
      setTrips(updatedTrip);
    } catch (error) {
      console.error("Error deleting trip:", error);
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
        <Text variant="h3" text="List of all trips" sx={style.heading} />
        <Button variant="contained" onClick={handleNewTrip} sx={style.button}>
          <Text variant="body2" text="Add new trip" />
        </Button>
      </Grid>

      <Grid container gap={5} sx={style.container}>
        <Grid item md={5.75} container gap={1} sx={style.block}>
          <Text variant="h4" text="7 Days Qatar Trip" />
          <Text
            variant="body2"
            text="Qui id aute qui proident et id non aliquip minim. Irure sit minim excepteur adipisicing sint consectetur Lorem est aliquip. Culpa sunt aliqua est ut reprehenderit consectetur excepteur amet quis laborum nostrud adipisicing Lorem qui. Dolor eiusmod veniam et duis Lorem."
          />

          <Grid container sx={style.wrap}>
            <Box sx={style.wrap} gap={1}>
              <Text variant="h6" text="Price:" />
              <Text variant="body2" text="7000" />
            </Box>

            <Box sx={style.wrap} gap={1}>
              <Button
                sx={style.btn}
                variant="outlined"
                onClick={handleViewDetails}
              >
                <Text variant="body2" text="View Details" />
              </Button>

              <EditIcon sx={style.edit} />
              <DeleteIcon
                sx={style.delete}
                color="error"
                onClick={handleOpen}
                // onClick={() => handleOpen(value._id)}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Trips;
