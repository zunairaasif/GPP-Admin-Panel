import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  FormGroup,
  InputLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles({
  twoColumns: {
    columnCount: 2,
    marginTop: 10,
  },
});

const EditTrip = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const initialTripData = state?.tripDetails;

  const formattedStartDate = initialTripData.startDate
    ? dayjs(initialTripData.startDate)
    : null;
  const formattedEndDate = initialTripData.endDate
    ? dayjs(initialTripData.endDate)
    : null;

  const [formData, setFormData] = useState({
    id: initialTripData._id,
    name: initialTripData.name,
    description: initialTripData.description,
    price: initialTripData.price,
    days: initialTripData.days,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    status: initialTripData.status,
    services: initialTripData.services,
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
  }, [baseUrl]);

  const [selectedServices, setSelectedServices] = useState(
    initialTripData.services.map((service) => service._id) || []
  );

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

  const handleDateChange = (field) => (date) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleEditTrip = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const updatedFormData = {
      ...formData,
      services: selectedServices,
    };

    axios
      .put(`${baseUrl}/trips/trip`, updatedFormData, {
        headers: headers,
      })
      .then((response) => {
        const data = response.data;

        if (data.success) {
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
        <Grid
          container
          item
          md={4}
          sm={12}
          xs={12}
          gap={4}
          sx={style.formContainer}
        >
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
            <Text variant="h6" text="Price:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.price}
              onChange={handleInputChange("price")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Days:" />
            <TextField
              size="small"
              sx={style.label}
              variant="standard"
              value={formData.days}
              onChange={handleInputChange("days")}
            />
          </Box>

          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Status:" />
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

          <Box gap={2}>
            <Text variant="h6" text="Choose services:" />
            <Box className={classes.twoColumns}>
              {services?.map((value) => (
                <FormGroup key={value._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedServices?.some(
                          (service) => service === value._id
                        )}
                        onChange={() => handleServiceChange(value._id)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={value.name}
                  />
                </FormGroup>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          gap={4}
          container
          sx={style.formContainer}
        >
          <Box sx={style.desc} gap={1}>
            <Text variant="h6" text="Description:" />
            <ReactQuill
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
            />
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={style.dates}
                label="Select start date"
                value={formData.startDate}
                onChange={handleDateChange("startDate")}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={style.dates}
                label="Select end date"
                value={formData.endDate}
                onChange={handleDateChange("endDate")}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleEditTrip}>
        <Text variant="body2" text="Edit Trip" />
      </Button>
    </Layout>
  );
};

export default EditTrip;
