import React from "react";

const LoaderContainer = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #ff6900",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default LoaderContainer;
