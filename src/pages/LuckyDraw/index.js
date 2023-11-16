import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

const LuckyDraw = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [luckyDraws, setLuckyDraws] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/lottery/lottery`)
      .then((response) => {
        const luckyDraw = response.data.lotteries;
        setLuckyDraws(luckyDraw);
        console.log(luckyDraw);
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

  return (
    <Layout>
      <Loader open={loading} />

      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all Lucky draws" sx={style.heading} />
        <Button
          variant="contained"
          onClick={handleNewLuckyDraw}
          sx={style.button}
        >
          <Text variant="body2" text="Add new Lucky draw" />
        </Button>
      </Grid>

      <Grid container gap={5}>
        {luckyDraws?.map((value, index) => (
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
              <Text variant="h5" text="Winner selected:" />
              <Text
                variant="body1"
                text={value.winnerSelected ? "true" : "false"}
              />
            </Box>

            <Box sx={style.wrap} gap={1}>
              <Text variant="h5" text="End time:" />
              <Text variant="body1" text={value.endTime} />
            </Box>

            <Button variant="outlined">
              <Text variant="body1" text="View Details" />
            </Button>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default LuckyDraw;
