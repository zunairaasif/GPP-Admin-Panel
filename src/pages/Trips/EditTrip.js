import {
  Box,
  Grid,
  Radio,
  Button,
  Checkbox,
  TextField,
  FormGroup,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const EditTrip = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const initialTripData = state?.tripDetails;
  const [formData, setFormData] = useState({
    id: initialTripData._id,
    name: initialTripData.name,
    description: initialTripData.description,
    price: initialTripData.price,
    days: initialTripData.days,
    startDate: null,
    endDate: null,
    status: initialTripData.status,
    services: initialTripData.services,
    image: initialTripData.image,
    category: initialTripData.category,
    bookingAmount: initialTripData.bookingAmount,
    seatOfChoicePrice: initialTripData.seatOfChoicePrice,
    totalSeats: initialTripData.totalSeats,
    loyaltyPoints: initialTripData.loyaltyPoints,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/services/service`)
      .then((response) => {
        const service = response.data.services;
        setServices(service);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });

    axios
      .get(`${baseUrl}/categories/category`)
      .then((response) => {
        const category = response.data.categories;
        setCategories(category);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [baseUrl]);

  const handleDateChange = (field) => (date) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, icon: file });
  };

  const handleEditTrip = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    axios
      .put(`${baseUrl}/trips/trip`, formData, {
        headers: headers,
      })
      .then((response) => {
        const data = response.data;

        if (data.success) {
          console.log("Trip api:", data.message);
          setLoading(false);
          navigate("/trips");
          setOpenSnackbar(true);
        } else console.error("Error:", data.error);
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
        text="Error updating this trip!"
      />

      <Text variant="h3" text="Edit trip" sx={style.heading} />

      <Grid container gap={8} sx={style.flex}>
        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter Name" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter description" />
            <TextField
              rows={3}
              multiline
              variant="outlined"
              sx={{ width: "60%" }}
              value={formData.description}
              onChange={handleInputChange("description")}
            />
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select start date"
                value={formData.startDate}
                onChange={handleDateChange("startDate")}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select end date"
                value={formData.endDate}
                onChange={handleDateChange("endDate")}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Box gap={2}>
            <Text variant="h6" text="Choose services:" />
            {services?.map((value, index) => (
              <FormGroup key={index}>
                <FormControlLabel control={<Checkbox />} label={value.name} />
              </FormGroup>
            ))}
          </Box>
          {/* <Box gap={2}>
            <Text variant="h6" text="Choose services:" />
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="service 1" />
              <FormControlLabel control={<Checkbox />} label="service 2" />
              <FormControlLabel control={<Checkbox />} label="service 3" />
            </FormGroup>
          </Box> */}

          <Box gap={2}>
            <Text variant="h6" text="Select category:" />
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={formData.category._id}
                name="radio-buttons-group"
              >
                {categories?.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    value={value._id}
                    control={<Radio />}
                    label={value.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter price" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.price}
              style={{ width: "30%" }}
              onChange={handleInputChange("price")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter days" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.days}
              style={{ width: "20%" }}
              onChange={handleInputChange("days")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter total seats" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.totalSeats}
              style={{ width: "20%" }}
              onChange={handleInputChange("totalSeats")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter seat of choice price" />
            <TextField
              size="small"
              sx={style.label}
              style={{ width: "30%" }}
              value={formData.seatOfChoicePrice}
              onChange={handleInputChange("seatOfChoicePrice")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter loyalty points" />
            <TextField
              size="small"
              sx={style.label}
              style={{ width: "20%" }}
              value={formData.loyaltyPoints}
              onChange={handleInputChange("loyaltyPoints")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter status" />
            <TextField
              size="small"
              sx={style.label}
              style={{ width: "20%" }}
              value={formData.status}
              onChange={handleInputChange("status")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter booking amount" />
            <TextField
              size="small"
              sx={style.label}
              style={{ width: "30%" }}
              value={formData.bookingAmount}
              onChange={handleInputChange("bookingAmount")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Image:" />
            {formData.image && <Text variant="body2" text={formData.image} />}
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Upload images:" />
            <input
              multiple
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Box>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleEditTrip}>
        <Text variant="body2" text="Edit Trip" />
      </Button>
    </Layout>
  );
};

export default EditTrip;
