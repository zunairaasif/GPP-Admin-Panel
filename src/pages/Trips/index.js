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

const Trips = () => {
  const navigate = useNavigate();
  const [trip, setTrips] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tripIdToDelete, setTripIdToDelete] = useState(null);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/trips/trip`)
      .then((response) => {
        const trip = response.data.trips;
        setTrips(trip);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  });

  const handleNewTrip = () => {
    navigate("/new-trip");
  };

  const handleViewDetails = (tripId, tripDetails) => {
    navigate(`/view-details/${tripId}`, { state: { tripDetails } });
  };

  const handleEditTrip = (tripId, tripDetails) => {
    navigate(`/edit-trip/${tripId}`, { state: { tripDetails } });
  };

  const handleOpen = (categoryId) => {
    setTripIdToDelete(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTripIdToDelete(null);
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
      await axios.delete(`${baseUrl}/trips/trip/${tripIdToDelete}`, {
        headers,
      });

      const response = await axios.get(`${baseUrl}/trips/trip`);
      const updatedTrip = response.data.trips;

      console.log("Trips deleted successfully");
      setTrips(updatedTrip);
      setLoading(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting trip:", error);
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
        text="Trip deleted successfully!"
      />

      <AlertMessage
        open={openErrorSnackbar}
        onClose={() => setOpenErrorSnackbar(false)}
        severity="error"
        text="Error deleting trip!"
      />

      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all trips" sx={style.heading} />
        <Button variant="contained" onClick={handleNewTrip} sx={style.button}>
          <Text variant="body2" text="Add new trip" />
        </Button>
      </Grid>

      <Grid container gap={5} sx={style.container}>
        {trip?.map((trip, index) => (
          <Grid item md={5.75} container gap={1} sx={style.block} key={index}>
            <Text variant="h4" text={trip.name} />
            <Text variant="body2" text={trip.description} />

            <Grid container sx={style.wrap}>
              <Box sx={style.wrap} gap={1}>
                <Text variant="h6" text="Price:" />
                <Text variant="body2" text={trip.price} />
              </Box>

              <Box sx={style.wrap} gap={1}>
                <Button
                  sx={style.btn}
                  variant="outlined"
                  onClick={() => handleViewDetails(trip._id, trip)}
                >
                  <Text variant="body2" text="View Details" />
                </Button>

                <EditIcon
                  sx={style.edit}
                  onClick={() => handleEditTrip(trip._id, trip)}
                />
                <DeleteIcon
                  color="error"
                  sx={style.delete}
                  onClick={() => handleOpen(trip._id)}
                />
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Trips;
