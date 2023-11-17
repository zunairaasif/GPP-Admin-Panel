const style = {
  //*********** Common ***********
  heading: {
    marginBottom: 5,
  },

  //************ index ************

  container: {
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    height: 40,
    textTransform: "none",
    backgroundColor: "#8e85f3",
  },
  block: {
    padding: 2,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  //************ Add Category *************

  flex: {
    display: "flex",
    alignItems: "center",
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    "& label": {
      fontSize: 13,
      marginTop: "2px",
    },
  },
  addBtn: {
    minWidth: "20%",
    textTransform: "none",
  },
};

export default style;
