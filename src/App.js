import React from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Trips from "./pages/Trips";
import PrivateRoutes from "./routes";
import Services from "./pages/Services";
import Lotteries from "./pages/Lotteries";
import Categories from "./pages/Categories";
import { theme } from "../src/styles/Theme";
import AddTrip from "./pages/Trips/AddTrip";
import EditTrip from "./pages/Trips/EditTrip";
import ViewDetails from "./pages/Trips/TripDetails";
import AddService from "./pages/Services/AddService";
import AddLottery from "./pages/Lotteries/AddLottery";
import EditLottery from "./pages/Lotteries/EditLottery";
import EditService from "./pages/Services/EditServices";
import AddCategory from "./pages/Categories/AddCategory";
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
            <Route path="/lotteries" element={<Lotteries />} />
            <Route path="/new-lottery" element={<AddLottery />} />
            <Route path="/edit-lottery/:lotteryId" element={<EditLottery />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
