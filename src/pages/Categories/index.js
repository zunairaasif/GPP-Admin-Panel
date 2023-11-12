import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Confirm from "../../components/ConfirmMsg";

const Categories = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories/category`)
      .then((response) => {
        const category = response.data.categories;
        setCategories(category);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
    setCategoryIdToDelete(null);
    setOpen(false);
  };

  const handleDelete = async () => {
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
        <Text variant="h3" text="List of all categories" sx={style.heading} />
        <Button
          variant="contained"
          onClick={handleNewCategory}
          sx={style.button}
        >
          <Text variant="body2" text="Add new category" />
        </Button>
      </Grid>

      <Grid container gap={3}>
        {categories?.map((value) => (
          <Grid
            item
            container
            gap={3}
            md={3.75}
            key={value._id}
            sx={style.block}
          >
            <Text variant="body1" text={value.name} />

            <Box sx={style.wrap} gap={1}>
              <Button
                variant="outlined"
                onClick={() => handleEditCategory(value._id, value)}
              >
                <Text variant="h6" text="Edit" />
              </Button>

              <Button
                variant="outlined"
                color="error"
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

export default Categories;
