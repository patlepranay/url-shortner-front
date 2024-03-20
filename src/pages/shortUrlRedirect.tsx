import { fetchUrlFromAPI, incrementLinkVisit } from "@/lib/api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShortUrlRedirect = () => {
  const { shortUrl } = useParams();
  const navigator = useNavigate();

  const fetchUrlFromDB = async () => {
    try {
      const result = await fetchUrlFromAPI(shortUrl!);
      if (result.status == 400) {
        throw "Url do not exists";
      }
      incrementLinkVisit(shortUrl!);
      const longUrl = await result.json();
      window.location.replace(`https://${longUrl.urlDetails[0].originalUrl}`);
    } catch (err) {
      console.log(err);
      navigator("/error");
    }
  };

  useEffect(() => {
    fetchUrlFromDB();
  });
  return null;
};

export default ShortUrlRedirect;
