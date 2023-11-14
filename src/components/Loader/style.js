const style = {
  container: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
  txt: {
    marginTop: "20px",
  },
};

export default style;
