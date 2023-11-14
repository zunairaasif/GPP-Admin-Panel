import {
  Box,
  Grid,
  Button,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Confirm from "../../components/ConfirmMsg";
import AlertMessage from "../../components/Alert";

const ViewDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const initialTripData = state?.tripDetails;
  const [formData] = useState({
    id: initialTripData._id,
    name: initialTripData.name,
    description: initialTripData.description,
    price: initialTripData.price,
    days: initialTripData.days,
    startDate: initialTripData.startDate,
    endDate: initialTripData.endDate,
    status: initialTripData.status,
    services: initialTripData.services,
    image: initialTripData.image,
    category: initialTripData.category,
    bookingAmount: initialTripData.bookingAmount,
    seatOfChoicePrice: initialTripData.seatOfChoicePrice,
    totalSeats: initialTripData.totalSeats,
    loyaltyPoints: initialTripData.loyaltyPoints,
  });

  const handleEditTrip = (tripId, tripDetails) => {
    navigate(`/edit-trip/${tripId}`, { state: { tripDetails } });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      await axios.delete(`${baseUrl}/trips/trip/${formData.id}`, {
        headers,
      });

      console.log("Trip deleted successfully");
      setLoading(false);
      navigate("/trips");
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

      <Grid container gap={3} sx={style.detailBlock}>
        <Grid container sx={style.wrap}>
          <Text variant="h3" text={formData.name} />
          <Box sx={style.action} gap={2}>
            <Button
              variant="contained"
              onClick={() => handleEditTrip(formData.id, formData)}
            >
              <Text variant="body2" text="Edit" />
            </Button>

            <Button variant="contained" color="error" onClick={handleOpen}>
              <Text variant="body2" text="Delete" />
            </Button>
          </Box>
        </Grid>

        <Divider />

        <Box sx={style.flex} gap={1}>
          <Text variant="h5" text="Description:" />
          <Text variant="body1" sx={style.width} text={formData.description} />
        </Box>

        <Grid container gap={2}>
          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Price" />
            <Text variant="body1" text={formData.price} />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Days" />
            <Text variant="body1" text={formData.days} />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Booking Amount" />
            <Text variant="body1" text={formData.bookingAmount} />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Total Seats" />
            <Text variant="body1" text={formData.totalSeats} />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Seat of choice price" />
            <Text variant="body1" text={formData.seatOfChoicePrice} />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Loyality Points" />
            <Text variant="body1" text={formData.loyaltyPoints} />
          </Box>
        </Grid>

        <Box sx={style.form} gap={1}>
          <Text variant="h5" text="Status:" />
          <Text variant="body1" text={formData.status ? "true" : "false"} />
        </Box>

        <Box sx={style.form} gap={1}>
          <Text variant="h5" text="Category:" />
          <Text variant="body1" text={formData.category.name} />
        </Box>

        <Box sx={style.form} gap={1}>
          <Text variant="h5" text="Services:" />
          <Text
            variant="body1"
            text={formData.services.map((data) => data.name).join(", ")}
          />
        </Box>

        <Box sx={style.form} gap={1}>
          <Text variant="h5" text="Start Date:" />
          <Text variant="body1" text={formData.startDate} />
        </Box>

        <Box sx={style.form} gap={1}>
          <Text variant="h5" text="End Date:" />
          <Text variant="body1" text={formData.endDate} />
        </Box>
      </Grid>

      <ImageList cols={4}>
        <ImageListItem>
          <img src={formData.image} alt="images" loading="lazy" />
        </ImageListItem>
      </ImageList>
    </Layout>
  );
};

export default ViewDetails;
