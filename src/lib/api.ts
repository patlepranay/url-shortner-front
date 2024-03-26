import axios from "axios";
import { Link } from "./store";

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

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const createShortLinkAPI = async (url: string, token: string,customUrl?:string) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/api/createShortLink`,
      { url: url ,customShortUrl:customUrl},
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

export const incrementLinkVisit = async (url: string) => {
  await axios.post(`${BASE_URL}/api/incrementLinkVisit`, {
    url: url,
  });
  return null;
};

export const changeLinkStatusAPI = async (link: Link, token: string) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/changeLinkStatus`,
      {
        link: link,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const checkCustomUrlAvailaibilityAPI = async (
  url: string,
  token: string
) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/api/checkCustomUrlAvailaibility/${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const  fetchUrlFromAPI = async (shortUrl: string) => {
  try {
    return await fetch(`${BASE_URL}/api/getLink/${shortUrl}`);
  } catch (err) {
    console.log(err);
  }
};

export const getLinksCreatedByUserAPI = async (
  email: string,
  token: string
) => {
  try {
    return await fetch(`${BASE_URL}/api/getLinksCreatedByUser/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
