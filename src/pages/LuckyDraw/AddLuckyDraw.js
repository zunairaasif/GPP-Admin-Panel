import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, Box, TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const AddLuckyDrawy = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    joinPrice: "",
    winPrice: "",
    endTime: null,
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateChange = (field) => (date) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleAddLuckyDraw = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${baseUrl}/lottery/lottery`, formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Lucky draw API:", response.data);
          setLoading(false);
          navigate("/lucky-draws");
        } else {
          console.error("Error:", response.data.error);
          setLoading(false);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
        setOpenSnackbar(true);
      });
  };

  return (
    <Layout>
      <Loader open={loading} />

      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
        text="Error adding a new lucky draw!"
      />

      <Text variant="h3" text="Add a new lucky draw" sx={style.heading} />

      <Grid container gap={8} sx={style.flex}>
        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.wrap} gap={2}>
            <Text variant="h6" text="Enter Name" />
            <TextField
              size="small"
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box sx={style.wrap} gap={2}>
            <Text variant="h6" text="End time" />

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
          <Box sx={style.wrap} gap={2}>
            <Text variant="h6" text="Enter join price" />
            <TextField
              size="small"
              value={formData.joinPrice}
              onChange={handleInputChange("joinPrice")}
            />
          </Box>

          <Box sx={style.wrap} gap={2}>
            <Text variant="h6" text="Enter win price" />
            <TextField
              size="small"
              value={formData.winPrice}
              onChange={handleInputChange("winPrice")}
            />
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        sx={style.addBtn}
        onClick={handleAddLuckyDraw}
      >
        <Text variant="body2" text="Add lucky draw" />
      </Button>
    </Layout>
  );
};

export default AddLuckyDrawy;
