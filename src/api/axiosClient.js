const axios = require("axios");

const axiosClient = axios.create({
    baseURL: "https://demowebdeploy.onrender.com/",
    timeout: 5000,
    headers: {
        "Content-type": "application/json",
    },
});
axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

module.exports = new axiosClient();
