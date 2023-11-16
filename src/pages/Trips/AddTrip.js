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
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const AddTrip = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    days: "",
    startDate: null,
    endDate: null,
    status: "",
    services: "",
    image: "",
    category: [],
    bookingAmount: "",
    seatOfChoicePrice: "",
    totalSeats: "",
    loyaltyPoints: "",
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

  const handleServiceChange = (serviceId) => {
    // Toggle the selected state of the service
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddTrip = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const postData = {
      ...formData,
      services: selectedServices,
      category: selectedCategory,
    };

    axios
      .post(`${baseUrl}/trips/trip`, postData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Trip added successfully:", response.data);
          setLoading(false);
          navigate("/trips");
          setOpenSnackbar(true);
        } else {
          console.error("Error:", response.data);
          setLoading(false);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error posting:", error);
        setLoading(false);
      });
  };

  return (
    <Layout>
      <Loader open={loading} />

      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
        text="Error adding a new trip!"
      />

      <Text variant="h3" text="Add a new trip" sx={style.heading} />

      <Grid container gap={8} sx={style.flex}>
        <Grid container item md={4} sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter Name" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box sx={style.desc} gap={1}>
            <Text variant="h6" text="Enter description:" />
            <TextField
              rows={3}
              multiline
              variant="outlined"
              sx={{ width: "100%" }}
              value={formData.description}
              onChange={handleInputChange("description")}
            />
          </Box>

          <Box sx={style.desc}>
            <Text variant="h6" text="Select start date:" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start date"
                  value={formData.startDate}
                  onChange={handleDateChange("startDate")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={style.desc}>
            <Text variant="h6" text="Select end date:" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="End date"
                  value={formData.endDate}
                  onChange={handleDateChange("endDate")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box gap={2}>
            <Text variant="h6" text="Choose services:" />
            {services?.map((value, index) => (
              <FormGroup key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedServices.includes(value._id)}
                      onChange={() => handleServiceChange(value._id)}
                    />
                  }
                  label={value.name}
                />
              </FormGroup>
            ))}
          </Box>

          <Box gap={2}>
            <Text variant="h6" text="Select category:" />
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {categories?.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    value={value._id}
                    control={
                      <Radio
                        checked={selectedCategory === value._id}
                        onChange={() => handleCategoryChange(value._id)}
                      />
                    }
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
              onChange={handleInputChange("price")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter days" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.days}
              onChange={handleInputChange("days")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter total seats" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.totalSeats}
              onChange={handleInputChange("totalSeats")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter seat of choice price" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.seatOfChoicePrice}
              onChange={handleInputChange("seatOfChoicePrice")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter loyalty points" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.loyaltyPoints}
              onChange={handleInputChange("loyaltyPoints")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter status" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.status}
              onChange={handleInputChange("status")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter booking amount" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.bookingAmount}
              onChange={handleInputChange("bookingAmount")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Upload images:" />
            <input multiple type="file" accept="image/*" />
          </Box>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddTrip}>
        <Text variant="body2" text="Add Trip" />
      </Button>
    </Layout>
  );
};

export default AddTrip;
