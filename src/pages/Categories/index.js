import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import style from "./style";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import Confirm from "../../components/ConfirmMsg";
import AlertMessage from "../../components/Alert";

const Categories = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
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

  const handleNewCategory = () => {
    navigate("/new-category");
  };

  const handleEditCategory = (categoryId, categoryDetails) => {
    navigate(`/edit-category/${categoryId}`, { state: { categoryDetails } });
  };

  const handleOpen = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryIdToDelete(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    setOpen(false);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(
        `${baseUrl}/categories/category/${categoryIdToDelete}`,
        { headers }
      );

      const response = await axios.get(`${baseUrl}/categories/category`);
      const updatedCategories = response.data.categories;

      console.log("Category deleted successfully");
      setCategories(updatedCategories);

      setLoading(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting category:", error);
      setLoading(false);
      setOpenErrorSnackbar(true);
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Loader open={loading} />

      <Confirm
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="success"
        text="Category deleted successfully!"
      />

      <AlertMessage
        open={openErrorSnackbar}
        onClose={() => setOpenErrorSnackbar(false)}
        severity="error"
        text="Error deleting category!"
      />

      <Grid container sx={style.container}>
        <Typography variant="h3">List of all categories</Typography>
        <Button
          variant="contained"
          onClick={handleNewCategory}
          sx={style.button}
        >
          <Typography variant="body2">Add new category</Typography>
        </Button>
      </Grid>

      <Grid container gap={3}>
        {categories ? (
          categories.map((value) => (
            <Grid
              item
              container
              gap={3}
              md={5.75}
              key={value._id}
              sx={style.block}
            >
              <Box sx={style.wrap} gap={2}>
                <img src={value.image} alt={value.name} width={25} />
                <Typography variant="body1">{value.name}</Typography>
              </Box>

              <Box sx={style.wrap} gap={1}>
                <Button
                  variant="outlined"
                  onClick={() => handleEditCategory(value._id, value)}
                >
                  <Typography variant="h6">Edit</Typography>
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpen(value._id)}
                >
                  <Typography variant="h6">Delete</Typography>
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <NoData text="categories" />
        )}
      </Grid>
    </Layout>
  );
};

export default Categories;
