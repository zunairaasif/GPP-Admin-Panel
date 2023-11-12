import {
  Box,
  Grid,
  Button,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import React, { useState } from "react";

import Text from "../Text";
import style from "./style";
import Layout from "../Layout";
import Confirm from "../ConfirmMsg";

const ViewDetails = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log("delete");
  };

  return (
    <Layout>
      <Confirm
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <Grid container gap={3} sx={style.container}>
        <Grid container sx={style.block}>
          <Text variant="h3" text="7 Days Qatar Trip" />
          <Box sx={style.action} gap={2}>
            <Button variant="contained">
              <Text variant="body2" text="Edit" />
            </Button>

            <Button variant="contained" color="error" onClick={handleOpen}>
              <Text variant="body2" text="Delete" />
            </Button>
          </Box>
        </Grid>

        <Divider />

        <Box sx={style.desc} gap={1}>
          <Text variant="h5" text="Description:" />
          <Text
            variant="body1"
            sx={style.width}
            text="Qui id aute qui proident et id non aliquip minim. Irure sit minim excepteur adipisicing sint consectetur Lorem est aliquip. Culpa sunt aliqua est ut reprehenderit consectetur excepteur amet quis laborum nostrud adipisicing Lorem qui. Dolor eiusmod veniam et duis Lorem."
          />
        </Box>

        <Grid container gap={2}>
          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Price" />
            <Text variant="body1" text="7000" />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Days" />
            <Text variant="body1" text="7" />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Booking Amount" />
            <Text variant="body1" text="5000" />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Total Seats" />
            <Text variant="body1" text="30" />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Seat of choice price" />
            <Text variant="body1" text="1000" />
          </Box>

          <Box sx={style.categories} gap={1}>
            <Text variant="h5" text="Loyality Points" />
            <Text variant="body1" text="20" />
          </Box>
        </Grid>

        <Box sx={style.details} gap={1}>
          <Text variant="h5" text="Status:" />
          <Text variant="body1" text="true" />
        </Box>

        <Box sx={style.details} gap={1}>
          <Text variant="h5" text="Category:" />
          <Text variant="body1" text="65370d232a957d5ba6fbfc51" />
        </Box>

        <Box sx={style.details} gap={1}>
          <Text variant="h5" text="Start Date:" />
          <Text variant="body1" text="2023-10-22T22:34:40.600Z" />
        </Box>

        <Box sx={style.details} gap={1}>
          <Text variant="h5" text="End Date:" />
          <Text variant="body1" text="2023-10-22T22:34:40.600Z" />
        </Box>
      </Grid>

      <ImageList cols={4}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Layout>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
];

export default ViewDetails;
