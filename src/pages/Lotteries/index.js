import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Confirm from "../../components/ConfirmMsg";
import { SettingsBluetoothTwoTone } from "@mui/icons-material";

const Lotteries = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [lotteries, setLotteries] = useState([]);
  const [lotteryIdToDelete, setLotteryIdToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/lottery/lottery`)
      .then((response) => {
        const lottery = response.data.lotteries;
        setLotteries(lottery);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleNewLottery = () => {
    navigate("/new-lottery");
  };

  const handleEditLottery = (lotteryId) => {
    navigate(`/edit-lottery/${lotteryId}`);
  };

  const handleOpen = (lotteryId) => {
    setLotteryIdToDelete(lotteryId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLotteryIdToDelete(null);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(`${baseUrl}/lottery/lottery/${lotteryIdToDelete}`, {
        headers,
      });

      const response = await axios.get(`${baseUrl}/lottery/lottery`);
      const updatedLottery = response.data.lottery;

      console.log("Lottery deleted successfully");
      setLotteries(updatedLottery);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <Layout>
      <Confirm
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all Lotteries" sx={style.heading} />
        <Button
          variant="contained"
          onClick={handleNewLottery}
          sx={style.button}
        >
          <Text variant="body2" text="Add new lottery" />
        </Button>
      </Grid>

      <Grid container gap={5}>
        {lotteries?.map((value, index) => (
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

            <Box sx={style.wrap} gap={2}>
              <Button
                variant="contained"
                sx={style.btn}
                onClick={() => handleEditLottery(value._id)}
              >
                <Text variant="h6" text="Edit" />
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={style.btn}
                onClick={() => handleOpen(value._id)}
              >
                <Text variant="h6" text="Delete" />
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Lotteries;
