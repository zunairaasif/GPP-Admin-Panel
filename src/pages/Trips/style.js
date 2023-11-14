const style = {
  //*********** Common ***********
  heading: {
    marginBottom: 5,
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
  },

  //************ index ************

  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  block: {
    padding: 2,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
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

  //************ Trip Details *************

  detailBlock: {
    padding: 1,
    display: "flex",
    flexDirection: "column",
  },
  action: {
    display: "flex",
    alignSelf: "flex-end",
  },
  width: {
    width: "70%",
  },
  categories: {
    paddingTop: 1,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 2,
    display: "flex",
    paddingBottom: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid black",
  },

  //************ Add Trip *************

  formContainer: {
    display: "flex",
    flexDirection: "column",
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
