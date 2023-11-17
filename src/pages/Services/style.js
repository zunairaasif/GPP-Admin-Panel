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
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  edit: {
    color: "#4077f7",
    cursor: "pointer",
  },
  delete: {
    cursor: "pointer",
  },

  //************ Add Service *************

  flex: {
    display: "flex",
    marginBottom: "30px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
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
    marginTop: 2,
    minWidth: "20%",
    textTransform: "none",
    alignSelf: "flex-start",
  },
};

export default style;
