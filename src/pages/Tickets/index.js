import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

import style from "./style";
import Text from "../../components/Text";
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
        <Text variant="h3" text="List of all tickets" />
        <Button variant="contained" onClick={handleNewticket} sx={style.button}>
          <Text variant="body2" text="Add new ticket" />
        </Button>
      </Grid>

      <Grid container gap={2}>
        {tickets ? (
          tickets.map((ticket, index) => (
            <Grid item container md={5.75} key={index} sx={style.block}>
              <Grid container item gap={1} md={5} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="User:" />
                  <Text variant="body1" text={ticket.user.name} />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Price:" />
                  <Text variant="body1" text={ticket.price} />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Amount Paid:" />
                  <Text variant="body1" text={ticket.amountPaid} />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Number of seats:" />
                  <Text variant="body1" text={ticket.noOfSeats} />
                </Box>
              </Grid>

              <Grid container item gap={1} md={6} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Paid:" />
                  <Text variant="body1" text={ticket.paid ? "true" : "false"} />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Booking:" />
                  <Text
                    variant="body1"
                    text={ticket.booking ? ticket.booking.name : "null"}
                  />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Booking Confirmed:" />
                  <Text
                    variant="body1"
                    text={ticket.bookingConfirm ? "true" : "false"}
                  />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Seat of Choice Price:" />
                  <Text variant="body1" text={ticket.seatOfChoicePrice} />
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
