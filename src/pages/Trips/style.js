const style = {
  //*********** Common ***********
  heading: {
    marginBottom: 5,
  },

  //************ index ************

  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  block: {
    padding: 2,
    borderRadius: 3,
    backgroundColor: "white",
  },
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    textTransform: "none",
  },
  edit: {
    color: "#4077f7",
    cursor: "pointer",
  },
  delete: {
    cursor: "pointer",
  },
  button: {
    height: 40,
    textTransform: "none",
    backgroundColor: "#8e85f3",
  },

  //************ Add Trip *************

  flex: {
    display: "flex",
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
    marginTop: 4,
    textTransform: "none",
    width: "20%",
    alignSelf: "center",
  },
};

export default style;
