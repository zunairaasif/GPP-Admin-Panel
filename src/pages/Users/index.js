import {
  Grid,
  Table,
  Paper,
  Button,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { CSVLink } from "react-csv";
import React, { useState, useEffect } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";

const columns = [
  { id: "profilePic", label: "Profile Picture" },
  { id: "name", label: "Name" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "city", label: "City" },
  { id: "gender", label: "Gender" },
  { id: "balance", label: "Balance" },
  { id: "points", label: "Points" },
  { id: "admin", label: "Admin" },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${baseUrl}/auth/getUsers`, {
        headers,
      })
      .then((response) => {
        const user = response.data.users;
        console.log(user);
        setUsers(user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [baseUrl]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      <Grid container sx={style.container}>
        <Text variant="h3" text="List of all Users" />

        <Button variant="contained" sx={style.button}>
          <FileDownloadIcon fontSize="small" />

          <CSVLink
            data={users}
            headers={columns.map((column) => ({
              label: column.label,
              key: column.id,
            }))}
            filename={"users.csv"}
            style={style.csv}
          >
            <Text variant="body2" text="Export" />
          </CSVLink>
        </Button>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      color: "white",
                      backgroundColor: "#2a2f42",
                    }}
                  >
                    <Text variant="h5" text={column.label} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {users &&
                users.length > 0 &&
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id} hover role="checkbox">
                      {columns.map((column) => (
                        <TableCell key={column.id} align="left">
                          {column.id === "profilePic" ? (
                            <img
                              alt={row[column.name]}
                              src={row[column.id]}
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : column.id === "admin" ? (
                            row[column.id] ? (
                              "true"
                            ) : (
                              "false"
                            )
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 30, 50]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
};

export default Users;
