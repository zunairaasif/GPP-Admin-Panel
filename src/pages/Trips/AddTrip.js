import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const AddTrip = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    days: "",
    totalSeats: "",
    bookingAmount: "",
    description: "",
    category: "",
    seatOfChoicePrice: "",
    loyaltyPoints: "",
    status: "",
    services: "",
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAddTrip = () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${baseUrl}/trips/trip`, formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Trip api:", response.data);
          navigate("/trips");
        } else console.error("Error:", response.data.error);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <Layout>
      <Text variant="h3" text="Add a new trip" sx={style.heading} />

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
        </Grid>

        <Grid sx={style.formContainer} gap={4}>
          <Box sx={style.form} gap={2}>
            <Text variant="h6" text="Enter category" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.category}
              onChange={handleInputChange("category")}
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
            <Text variant="h6" text="Enter services" />
            <TextField
              size="small"
              sx={style.label}
              value={formData.services}
              onChange={handleInputChange("services")}
            />
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
