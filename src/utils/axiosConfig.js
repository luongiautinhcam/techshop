export const base_url = "http://localhost:5000/api/";
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = { 
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage.token !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
  // headers: {
  //   Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
  //   Accept: "application/json",
  // },
};
// const getTokenFromLocalStorage = localStorage.getItem("customer")
//   ? JSON.parse(localStorage.getItem("customer"))
//   : {};

// export const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage.token || ""}`,
//     Accept: "application/json",
//   },
// };
