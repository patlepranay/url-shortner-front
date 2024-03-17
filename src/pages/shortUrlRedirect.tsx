import { useEffect } from "react";
import {  useParams } from "react-router-dom";

const ShortUrlRedirect = () => {
  const { shortUrl } = useParams();

  const fetchUrlFromDB = async () => {
    const result = await fetch(`http://localhost:5000/api/getLink/${shortUrl}`);
    const longUrl = await result.json();
    console.log(longUrl);
    console.log(window.location.href);

    window.location.replace(`https://${longUrl.urlDetails[0].originalUrl}`);
  };
  useEffect(() => {
    fetchUrlFromDB();
  }, );
  return null;
};

export default ShortUrlRedirect;
