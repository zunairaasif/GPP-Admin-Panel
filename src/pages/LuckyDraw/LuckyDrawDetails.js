import {
  Box,
  Grid,
  Radio,
  Button,
  Divider,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const LuckyDrawDetails = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState("");

  const initialLuckyDrawData = state?.luckyDrawDetails;
  const [formData] = useState({
    _id: initialLuckyDrawData._id,
    name: initialLuckyDrawData.name,
    winnerSelected: initialLuckyDrawData.winnerSelected,
    joinPrice: initialLuckyDrawData.joinPrice,
    winPrice: initialLuckyDrawData.winPrice,
    endTime: initialLuckyDrawData.endTime,
    participants: initialLuckyDrawData.participants,
  });

  const handleParticipantChange = (participantID) => {
    setSelectedParticipant(participantID);
  };

  const handleWinner = async () => {
    if (selectedParticipant) {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const requestBody = {
          lotteryId: formData._id,
          userId: selectedParticipant,
        };

        const response = await axios.post(
          `${baseUrl}/lottery/setWinner`,
          requestBody,
          {
            headers,
          }
        );

        console.log("Set winner API:", response.data.message);
        setOpenSuccessSnackbar(true);
      } catch (error) {
        console.error("Error setting winner:", error);
        setOpenSuccessSnackbar(true);
      } finally {
        setLoading(false);
      }
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <Layout>
      <Loader open={loading} />

      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
        text="No participant is selected!"
      />

      <AlertMessage
        open={openSuccessSnackbar}
        onClose={() => setOpenSuccessSnackbar(false)}
        severity="success"
        text="The winner has been declared!"
      />

      <Grid container gap={3} sx={style.detailBlock}>
        <Grid container sx={style.wrapper}>
          <Text variant="h3" text={formData.name} />

          <Box sx={style.action} gap={2}>
            <Button
              variant="contained"
              onClick={handleWinner}
              sx={style.button}
            >
              <Text variant="body2" text="Set Winner" />
            </Button>
          </Box>
        </Grid>

        <Divider />

        <Grid container gap={2}>
          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Join Price" />
            <Text variant="body1" text={formData.joinPrice} />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Win Price" />
            <Text variant="body1" text={formData.winPrice} />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Winner Selected" />
            <Text
              variant="body1"
              text={formData.winnerSelected === true ? "true" : "false"}
            />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="End Time" />
            <Text variant="body1" text={formData.endTime} />
          </Box>
        </Grid>

        <Box>
          <Text variant="h5" text="Participants:" />
          <FormControl component="fieldset">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {formData.participants?.map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={value._id}
                  control={
                    <Radio
                      onChange={() => handleParticipantChange(value._id)}
                    />
                  }
                  label={value.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
    </Layout>
  );
};

export default LuckyDrawDetails;
