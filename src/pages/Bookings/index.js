import axios from "axios";
import { Grid, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import style from "./style";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";

const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${baseUrl}/bookings/booking`, { headers })
      .then((response) => {
        const booking = response.data.bookings;
        setBookings(booking);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [baseUrl]);

  return (
    <Layout>
      <Loader open={loading} />

      <Typography variant="h3" sx={style.heading}>
        List of all bookings
      </Typography>

      <Grid container gap={2}>
        {bookings ? (
          bookings.map((booking, index) => (
            <Grid item container md={5.75} key={index} sx={style.block}>
              <Grid container item gap={1} md={5} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">User:</Typography>
                  <Typography variant="body1">
                    {booking.user ? booking.user.name : "null"}
                  </Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Booking:</Typography>
                  <Typography variant="body1">
                    {booking.booking ? booking.booking.name : "null"}
                  </Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Price:</Typography>
                  <Typography variant="body1">{booking.price}</Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Number of seats:</Typography>
                  <Typography variant="body1">{booking.noOfSeats}</Typography>
                </Box>
              </Grid>

              <Grid container item gap={1} md={6} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Paid:</Typography>
                  <Typography variant="body1">
                    {booking.paid ? "true" : "false"}
                  </Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Amount Paid:</Typography>
                  <Typography variant="body1">{booking.amountPaid}</Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Booking Confirmed:</Typography>
                  <Typography variant="body1">
                    {booking.bookingConfirm ? "true" : "false"}
                  </Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Seat of Choice Price:</Typography>
                  <Typography variant="body1">
                    {booking.seatOfChoicePrice}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <NoData text="bookings" />
        )}
      </Grid>
    </Layout>
  );
};

export default Bookings;
