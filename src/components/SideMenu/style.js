const style = {
  sideMenu: {
    display: "flex",
    padding: "15px",
    color: "#5d596c",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  heading: {
    marginTop: "10px",
    marginBottom: "25px",
  },
  menuItems: {
    marginTop: "5px",
    marginBottom: "10px",
  },
  link: {
    textDecoration: "none",
  },
  menuItem: {
    height: "50px",
    display: "flex",
    color: "#5d596c",
    paddingLeft: "10px",
    alignItems: "center",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#f7f5f9",
    },
  },
  menuItemSelected: {
    height: "50px",
    display: "flex",
    color: "#ffffff",
    paddingLeft: "10px",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: "#8e85f3",
  },
  icon: {
    marginRight: "6px",
  },
  setting: {
    marginTop: "10px",
  },
};

export default style;
