import React from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Trips from "./pages/Trips";
import Users from "./pages/Users";
import PrivateRoutes from "./routes";
import Bookings from "./pages/Bookings";
import Services from "./pages/Services";
import LuckyDraw from "./pages/LuckyDraw";
import Categories from "./pages/Categories";
import { theme } from "../src/styles/Theme";
import AddTrip from "./pages/Trips/AddTrip";
import EditTrip from "./pages/Trips/EditTrip";
import ViewDetails from "./pages/Trips/TripDetails";
import AddBooking from "./pages/Bookings/AddBooking";
import AddService from "./pages/Services/AddService";
import EditService from "./pages/Services/EditServices";
import AddCategory from "./pages/Categories/AddCategory";
import AddLuckyDraw from "./pages/LuckyDraw/AddLuckyDraw";
import EditCategory from "./pages/Categories/EditCategory";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/trips" element={<Trips />} />
            <Route path="/view-details/:tripId" element={<ViewDetails />} />
            <Route path="/new-trip" element={<AddTrip />} />
            <Route path="/edit-trip/:tripId" element={<EditTrip />} />
            <Route path="/services" element={<Services />} />
            <Route path="/new-service" element={<AddService />} />
            <Route path="/edit-service/:serviceId" element={<EditService />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/new-category" element={<AddCategory />} />
            <Route
              path="/edit-category/:categoryId"
              element={<EditCategory />}
            />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/new-booking" element={<AddBooking />} />
            <Route path="/lucky-draws" element={<LuckyDraw />} />
            <Route path="/new-lucky-draw" element={<AddLuckyDraw />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
