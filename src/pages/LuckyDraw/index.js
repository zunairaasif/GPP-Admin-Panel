import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";

import style from "./style";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import AlertMessage from "../../components/Alert";

const LuckyDraw = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [luckyDraws, setLuckyDraws] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/lottery/lottery`)
      .then((response) => {
        const luckyDraw = response.data.lotteries;
        setLuckyDraws(luckyDraw);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [baseUrl]);

  const handleNewLuckyDraw = () => {
    navigate("/new-lucky-draw");
  };

  const handleViewDetails = (luckyDrawId, luckyDrawDetails) => {
    navigate(`/view-lucky-draw/${luckyDrawId}`, {
      state: { luckyDrawDetails },
    });
  };

  const handleAnnounceWinner = (luckyDrawId) => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const postData = {
      lotteryId: luckyDrawId,
    };

    axios
      .post(`${baseUrl}/lottery/announceWinner`, postData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Announce winner API:", response.data.message);
          setLoading(false);
          setOpenSnackbar(true);
        } else {
          console.error("Error:", response.data.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
      });
  };

  return (
    <Layout>
      <Loader open={loading} />

      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="success"
        text="Winner has been announced!"
      />

      <Grid container sx={style.container}>
        <Typography variant="h3">List of all Lucky draws</Typography>
        <Button
          variant="contained"
          onClick={handleNewLuckyDraw}
          sx={style.button}
        >
          <Typography variant="body2">Add new Lucky draw</Typography>
        </Button>
      </Grid>

      <Grid container gap={5}>
        {luckyDraws ? (
          luckyDraws.map((value, index) => (
            <Grid item md={4.5} container gap={2} sx={style.block} key={index}>
              <Typography variant="h4">{value.name}</Typography>

              <Box sx={style.wrapper} gap={1}>
                <Box sx={style.wrap} gap={1}>
                  <Typography variant="h5">Join price:</Typography>
                  <Typography variant="body1">{value.joinPrice}</Typography>
                </Box>

                <Box sx={style.wrap} gap={1}>
                  <Typography variant="h5">Win price:</Typography>
                  <Typography variant="body1">{value.winPrice}</Typography>
                </Box>
              </Box>

              <Box sx={style.wrap} gap={1}>
                <Typography variant="h5">End time:</Typography>
                <Typography variant="body1">{value.endTime}</Typography>
              </Box>

              <Grid container sx={style.wrapper}>
                <Button
                  sx={style.buttons}
                  variant="outlined"
                  onClick={() => handleViewDetails(value._id, value)}
                >
                  <Typography variant="body1">View Details</Typography>
                </Button>

                <Button
                  sx={style.buttons}
                  variant="outlined"
                  onClick={() => handleAnnounceWinner(value._id)}
                >
                  <Typography variant="body1">Announce Winner</Typography>
                </Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <NoData text="lucky draws" />
        )}
      </Grid>
    </Layout>
  );
};

export default LuckyDraw;
