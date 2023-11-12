const style = {
  bg: { backgroundColor: "white" },
  toolbar: { flex: 1, display: "flex" },
  search: { backgroundColor: "#f6f6f8" },
  box: { flexGrow: 1 },
  img: { marginRight: 7 },
  hover: { "&:hover": { cursor: "pointer" } },
  searchField: {
    borderRadius: "2px",
    position: "relative",
    backgroundColor: "#f6f6f8",
  },
  searchIconWrapper: {
    paddingTop: "6px",
    paddingLeft: "6px",
    position: "absolute",
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
};

export default style;
