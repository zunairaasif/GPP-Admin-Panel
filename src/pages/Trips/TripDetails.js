import {
  Box,
  Grid,
  Button,
  Divider,
  ImageList,
  Typography,
  ImageListItem,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import style from "./style";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Confirm from "../../components/ConfirmMsg";
import AlertMessage from "../../components/Alert";

const TripDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const initialTripData = state?.tripDetails;
  const [formData] = useState({
    _id: initialTripData._id,
    name: initialTripData.name,
    description: initialTripData.description,
    price: initialTripData.price,
    days: initialTripData.days,
    startDate: initialTripData.startDate,
    endDate: initialTripData.endDate,
    status: initialTripData.status,
    services: initialTripData.services,
    images: initialTripData.images,
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
      await axios.delete(`${baseUrl}/trips/trip/${formData._id}`, {
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
          <Typography variant="h3">{formData.name}</Typography>
          <Box sx={style.action} gap={2}>
            <Button
              variant="contained"
              onClick={() => handleEditTrip(formData.id, formData)}
            >
              <Typography variant="body2">Edit</Typography>
            </Button>

            <Button variant="contained" color="error" onClick={handleOpen}>
              <Typography variant="body2">Delete</Typography>
            </Button>
          </Box>
        </Grid>

        <Divider />

        <Box sx={style.flex} gap={1}>
          <Typography variant="h5">Description:</Typography>
          <div dangerouslySetInnerHTML={{ __html: formData.description }} />
        </Box>

        <Grid container gap={2}>
          <Box sx={style.categories} gap={1}>
            <Typography variant="h5">Price</Typography>
            <Typography variant="body1">{formData.price}</Typography>
          </Box>

          <Box sx={style.categories} gap={1}>
            <Typography variant="h5">Days</Typography>
            <Typography variant="body1">{formData.days}</Typography>
          </Box>

          <Box sx={style.categories} gap={1}>
            <Typography variant="h5">Booking Amount</Typography>
            <Typography variant="body1">{formData.bookingAmount}</Typography>
          </Box>

          <Box sx={style.categories} gap={1}>
            <Typography variant="h5">Total Seats</Typography>
            <Typography variant="body1">{formData.totalSeats}</Typography>
          </Box>

          <Box sx={style.categories} gap={1}>
            <Typography variant="h5">Seat of choice price</Typography>
            <Typography variant="body1">
              {formData.seatOfChoicePrice}
            </Typography>
          </Box>

          <Box sx={style.categories} gap={1}>
            <Typography variant="h5">Loyality Points</Typography>
            <Typography variant="body1">{formData.loyaltyPoints}</Typography>
          </Box>
        </Grid>

        <Box sx={style.form} gap={1}>
          <Typography variant="h5">Status:</Typography>
          <Typography variant="body1">
            {formData.status ? "Active" : "Inactive"}
          </Typography>
        </Box>

        <Box sx={style.form} gap={1}>
          <Typography variant="h5">Category:</Typography>
          <Typography variant="body1">{formData.category.name}</Typography>
        </Box>

        <Box sx={style.form} gap={1}>
          <Typography variant="h5">Services:</Typography>
          <Typography variant="body1">
            {formData.services.map((data) => data.name).join(", ")}
          </Typography>
        </Box>

        <Box sx={style.form} gap={1}>
          <Typography variant="h5">Start Date:</Typography>
          <Typography variant="body1">{formData.startDate}</Typography>
        </Box>

        <Box sx={style.form} gap={1}>
          <Typography variant="h5">End Date:</Typography>
          <Typography variant="body1">{formData.endDate}</Typography>
        </Box>

        <Typography variant="h5">Images:</Typography>
      </Grid>

      <ImageList cols={4}>
        {formData.images.map((image, index) => (
          <ImageListItem key={index}>
            <img src={image} alt="images" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Layout>
  );
};

export default TripDetails;
