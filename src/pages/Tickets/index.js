import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";

import style from "./style";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";

const Tickets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${baseUrl}/tickets/ticket`, { headers })
      .then((response) => {
        const ticket = response.data.tickets;
        setTickets(ticket);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [baseUrl]);

  const handleNewticket = () => {
    navigate("/new-ticket");
  };

  return (
    <Layout>
      <Loader open={loading} />

      <Grid container sx={style.container}>
        <Typography variant="h3">List of all tickets</Typography>
        <Button variant="contained" onClick={handleNewticket} sx={style.button}>
          <Typography variant="body2">Add new ticket</Typography>
        </Button>
      </Grid>

      <Grid container gap={2}>
        {tickets ? (
          tickets.map((ticket, index) => (
            <Grid item container md={5.75} key={index} sx={style.block}>
              <Grid container item gap={1} md={5} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">User:</Typography>
                  <Typography variant="body1">{ticket.user.name}</Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Price:</Typography>
                  <Typography variant="body1">{ticket.price}</Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Amount Paid:</Typography>
                  <Typography variant="body1">{ticket.amountPaid}</Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Number of seats:</Typography>
                  <Typography variant="body1">{ticket.noOfSeats}</Typography>
                </Box>
              </Grid>

              <Grid container item gap={1} md={6} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Paid:</Typography>
                  <Typography variant="body1">
                    {ticket.paid ? "true" : "false"}
                  </Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Booking:</Typography>
                  <Typography variant="body1">
                    {ticket.booking ? ticket.booking.name : "null"}
                  </Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Booking Confirmed:</Typography>
                  <Typography variant="body1">
                    {ticket.bookingConfirm ? "true" : "false"}
                  </Typography>
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Typography variant="h5">Seat of Choice Price:</Typography>
                  <Typography variant="body1">
                    {ticket.seatOfChoicePrice}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <NoData text="tickets" />
        )}
      </Grid>
    </Layout>
  );
};

export default Tickets;
