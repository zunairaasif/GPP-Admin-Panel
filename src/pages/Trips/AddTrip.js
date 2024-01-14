import {
  Box,
  Grid,
  Radio,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  FormGroup,
  InputLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import style from "./style";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const useStyles = makeStyles({
  twoColumns: {
    columnCount: 2,
    marginTop: 10,
  },
});

const AddTrip = () => {
  const classes = useStyles();
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
    image: [],
    category: "",
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
    setSelectedServices((prevSelectedServices) => {
      const isSelected = prevSelectedServices.includes(serviceId);

      if (isSelected) {
        // If serviceId is already in the list, remove it
        const updatedServices = prevSelectedServices.filter(
          (id) => id !== serviceId
        );
        return updatedServices;
      } else {
        // If serviceId is not in the list, add it
        const updatedServices = [...prevSelectedServices, serviceId];
        return updatedServices;
      }
    });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, image: files });
  };

  const handleAddTrip = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const formDataForApi = new FormData();
    formDataForApi.append("name", formData.name);
    formDataForApi.append("description", formData.description);
    formDataForApi.append("price", formData.price);
    formDataForApi.append("days", formData.days);
    formDataForApi.append("startDate", formData.startDate);
    formDataForApi.append("endDate", formData.endDate);
    formDataForApi.append("status", formData.status);
    formDataForApi.append("category", selectedCategory);
    formDataForApi.append("bookingAmount", formData.bookingAmount);
    formDataForApi.append("seatOfChoicePrice", formData.seatOfChoicePrice);
    formDataForApi.append("totalSeats", formData.totalSeats);
    formDataForApi.append("loyaltyPoints", formData.loyaltyPoints);

    for (const serviceId of selectedServices) {
      formDataForApi.append("services", serviceId);
    }

    formData.image.forEach((file) => {
      formDataForApi.append("image", file);
    });

    axios
      .post(`${baseUrl}/trips/trip`, formDataForApi, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Trip added successfully:", response.data);
          setLoading(false);
          navigate("/trips");
        } else {
          console.error("Error:", response.data);
          setLoading(false);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error posting:", error);
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
        text="Error adding a new trip!"
      />

      <Typography variant="h3" sx={style.heading}>
        Add a new trip
      </Typography>

      <Grid container gap={8} sx={style.flex}>
        <Grid container item md={5} sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter Name</Typography>
            <TextField
              size="small"
              sx={style.label}
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box sx={style.desc} gap={1}>
            <Typography variant="h6">Enter description:</Typography>
            <ReactQuill
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
            />
          </Box>

          <Box sx={style.formContainer}>
            <Typography variant="h6">Select start date:</Typography>
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

          <Box sx={style.formContainer}>
            <Typography variant="h6">Select end date:</Typography>
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

          <Box>
            <Typography variant="h6">Choose services:</Typography>
            <Box className={classes.twoColumns}>
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
          </Box>
        </Grid>

        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter price</Typography>
            <TextField
              size="small"
              sx={style.label}
              value={formData.price}
              onChange={handleInputChange("price")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter days</Typography>
            <TextField
              size="small"
              sx={style.label}
              value={formData.days}
              onChange={handleInputChange("days")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter total seats</Typography>
            <TextField
              size="small"
              sx={style.label}
              value={formData.totalSeats}
              onChange={handleInputChange("totalSeats")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter seat of choice price</Typography>
            <TextField
              size="small"
              sx={style.label}
              value={formData.seatOfChoicePrice}
              onChange={handleInputChange("seatOfChoicePrice")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter loyalty points</Typography>
            <TextField
              size="small"
              sx={style.label}
              value={formData.loyaltyPoints}
              onChange={handleInputChange("loyaltyPoints")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter booking amount</Typography>
            <TextField
              size="small"
              sx={style.label}
              value={formData.bookingAmount}
              onChange={handleInputChange("bookingAmount")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Enter status</Typography>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                label="Status"
                value={formData.status}
                id="demo-simple-select"
                labelId="demo-simple-select-label"
                onChange={handleInputChange("status")}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={style.form} gap={2}>
            <Typography variant="h6">Upload images:</Typography>
            <input
              multiple
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Box>

          <Box>
            <Typography variant="h6">Select category:</Typography>
            <FormControl component="fieldset">
              <Box className={classes.twoColumns}>
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
                          onChange={() => handleCategoryChange(value._id)}
                        />
                      }
                      label={value.name}
                    />
                  ))}
                </RadioGroup>
              </Box>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddTrip}>
        <Typography variant="body2">Add Trip</Typography>
      </Button>
    </Layout>
  );
};

export default AddTrip;
