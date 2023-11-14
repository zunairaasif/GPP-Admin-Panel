// import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, Box, TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

const EditLottery = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  // const baseUrl = process.env.REACT_APP_BASE_URL;

  const initialLotteryData = state?.lotteryDetails;
  const [formData, setFormData] = useState({
    id: initialLotteryData._id,
    name: initialLotteryData.name,
    joinPrice: initialLotteryData.joinPrice,
    winPrice: initialLotteryData.winPrice,
    endTime: null,
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateChange = (field) => (date) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleEditLottery = () => {
    setLoading(true);
    console.log("Edit");
    setLoading(true);
  };

  return (
    <Layout>
      <Loader open={loading} />
      <Text variant="h3" text="Edit lottery" sx={style.heading} />

      <Grid container gap={8} sx={style.flex}>
        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Name:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="End time:" />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Select end time"
                  value={formData.endTime}
                  onChange={handleDateChange("endTime")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>

        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Join price:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.joinPrice}
              onChange={handleInputChange("joinPrice")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Win price:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.winPrice}
              onChange={handleInputChange("winPrice")}
            />
          </Box>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleEditLottery}>
        <Text variant="body2" text="Edit lottery" />
      </Button>
    </Layout>
  );
};

export default EditLottery;
