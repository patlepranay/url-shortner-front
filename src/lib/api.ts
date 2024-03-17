import axios from "axios";

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // If response is successful, return it as is
    return response;
  },
  function (error) {
    // Check if error status is 405 (Method Not Allowed)
    if (error.response && error.response.status === 405) {
      // Handle 405 error here
      // For example, log the error or perform some action
      console.log(
        "405 Method Not Allowed. Requested method is not allowed for this resource."
      );
      // Return a modified response or null if you don't want to propagate the error
      return null; // or return some modified response
    }

    // For other errors, propagate the error
    return Promise.reject(error);
  }
);

export const createShortLinkAPI = async (url: string, token: string) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/createShortLink",
      { url: url },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
