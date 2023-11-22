import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import style from "./style";
import Text from "../../components/Text";
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
        <Text variant="h3" text="List of all Lucky draws" />
        <Button
          variant="contained"
          onClick={handleNewLuckyDraw}
          sx={style.button}
        >
          <Text variant="body2" text="Add new Lucky draw" />
        </Button>
      </Grid>

      <Grid container gap={5}>
        {luckyDraws ? (
          luckyDraws.map((value, index) => (
            <Grid item md={4.5} container gap={2} sx={style.block} key={index}>
              <Text variant="h4" text={value.name} />

              <Box sx={style.wrapper} gap={1}>
                <Box sx={style.wrap} gap={1}>
                  <Text variant="h5" text="Join price:" />
                  <Text variant="body1" text={value.joinPrice} />
                </Box>

                <Box sx={style.wrap} gap={1}>
                  <Text variant="h5" text="Win price:" />
                  <Text variant="body1" text={value.winPrice} />
                </Box>
              </Box>

              <Box sx={style.wrap} gap={1}>
                <Text variant="h5" text="End time:" />
                <Text variant="body1" text={value.endTime} />
              </Box>

              <Grid container sx={style.wrapper}>
                <Button
                  sx={style.buttons}
                  variant="outlined"
                  onClick={() => handleViewDetails(value._id, value)}
                >
                  <Text variant="body1" text="View Details" />
                </Button>

                <Button
                  sx={style.buttons}
                  variant="outlined"
                  onClick={() => handleAnnounceWinner(value._id)}
                >
                  <Text variant="body1" text="Announce Winner" />
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
