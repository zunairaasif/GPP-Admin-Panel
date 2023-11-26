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
  label: {
    "& label": {
      fontSize: 13,
      marginTop: "2px",
    },
  },
  desc: {
    marginBottom: 5,
    display: "flex",
    flexDirection: "column",
  },

  //************ index ************

  container: {
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  block: {
    padding: 2,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  title: {
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
  addBtn: {
    marginTop: 4,
    minWidth: "20%",
    alignSelf: "center",
    textTransform: "none",
  },

  //************ Edit Trip *************

  dates: {
    maxWidth: "50%",
  },
};

export default style;
