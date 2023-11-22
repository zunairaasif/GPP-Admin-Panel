import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Box, Button, Switch } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
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
  const [openToggleSnackbar, setOpenToggleSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

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
  }, [baseUrl]);

  const handleSwitchChange = async (tripId, newStatus) => {
    try {
      setLoading(true);

      // Optimistically update the UI
      const updatedTrips = trip.map((t) =>
        t._id === tripId ? { ...t, status: newStatus } : t
      );
      setTrips(updatedTrips);

      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const updatedData = {
        tripId,
        status: newStatus,
      };

      await axios.put(`${baseUrl}/trips/trip`, updatedData, { headers });

      setLoading(false);
      setOpenSuccessSnackbar(true);
    } catch (error) {
      console.error("Error updating trip status:", error);
      setOpenToggleSnackbar(true);
      setLoading(false);
    }
  };

  const handleNewTrip = () => {
    navigate("/new-trip");
  };

  const handleViewDetails = (tripId, tripDetails) => {
    navigate(`/view-trip-details/${tripId}`, { state: { tripDetails } });
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
        open={openSnackbar || openSuccessSnackbar}
        onClose={() => {
          setOpenSnackbar(false);
          setOpenSuccessSnackbar(false);
        }}
        severity="success"
        text={
          openSnackbar
            ? "Trip deleted successfully!"
            : openSuccessSnackbar && "Status updated successfully!"
        }
      />

      <AlertMessage
        open={openErrorSnackbar || openToggleSnackbar}
        onClose={() => {
          setOpenErrorSnackbar(false);
          setOpenToggleSnackbar(false);
        }}
        severity="error"
        text={
          openErrorSnackbar
            ? "Error deleting trip!"
            : openToggleSnackbar && "Error updating the status!"
        }
      />

      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all trips" />
        <Button variant="contained" onClick={handleNewTrip} sx={style.button}>
          <Text variant="body2" text="Add new trip" />
        </Button>
      </Grid>

      <Grid container gap={5} sx={style.container}>
        {trip ? (
          trip.map((trip, index) => (
            <Grid item md={5.75} container gap={1} sx={style.block} key={index}>
              <Box sx={style.title}>
                <Text variant="h4" text={trip.name} />

                <Box sx={style.title}>
                  <Text
                    variant="body1"
                    text={trip.status ? "Active" : "Inactive"}
                  />
                  <Switch
                    checked={trip.status}
                    onChange={(event) =>
                      handleSwitchChange(trip._id, event.target.checked)
                    }
                  />
                </Box>
              </Box>

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
          ))
        ) : (
          <NoData text="trips" />
        )}
      </Grid>
    </Layout>
  );
};

export default Trips;
