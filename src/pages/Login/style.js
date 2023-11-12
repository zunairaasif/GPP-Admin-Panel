import bg from "../../images/bg.jpg";

const style = {
  container: {
    padding: 5,
    height: "100vh",
    alignItems: "center",
    backgroundSize: "cover",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
  },
  login: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%",
    padding: "30px",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  forgetPswd: {
    fontSize: 18,
    display: "flex",
    marginBottom: "3%",
    justifyContent: "flex-end",
  },
  button: {
    padding: "10px",
    backgroundColor: "#8e85f3",
  },
  alert: {
    alignItems: "center",
  },
};

export default style;
