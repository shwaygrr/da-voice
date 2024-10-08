import { useLocation, Link, useOutletContext } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import InfoArticle from "../components/InfoArticle";
import { useEffect, useState } from "react";

const Representative = () => {
  const location = useLocation();
  const { handleExpandSidebar, handleCollapseSidebar } = useOutletContext();
  const queryParams = new URLSearchParams(location.search);
  const [articles, setArticles] = useState(null);
  const [bio, setBio] = useState("")
  const params = {
    name: queryParams.get("name"),
    position: queryParams.get("position"),
    party: queryParams.get("party"),
    website: queryParams.get("website"),
    phone: queryParams.get("phone"),
    address: queryParams.get("address"),
  };


  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/bio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: params.name }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch bio");
        }
  
        const data = await response.json();
        setBio(data.bio);
      } catch (err) {
        throw new Error("Failed to fetch bio: " + err.message); // Handle error
      };
    }

    if (bio.length === 0) {
      fetchBio()
    }

    handleExpandSidebar();
    const API_KEY = import.meta.env.VITE_FASTAPI_KEY;

    const URL =
      "https://real-time-news-data.p.rapidapi.com/search?query=" +
      params.name +
      "&limit=5&time_published=anytime&country=US&lang=en";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
      },
    };

    const fetchData = async () => {
      try {
        const response = await fetch(URL, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchData();
  }, [params.name]);

  return (
    <div className="repres">
      <Link to="/" className="back" onClick={handleCollapseSidebar}>
        <IoMdArrowRoundBack className="text-xl" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 pt-2">{params.name}</h1>
      <h2 className="text-lg mb-2">{params.position}</h2>
      <h2 className="text-lg mb-2">{params.party}</h2>

      <a href={params.website} target="_blank" className="block text-blue-500 hover:underline">
        <p>Website</p>
      </a>
      <p className="mt-2">{params.phone}</p>
      <h2 className="text-lg font-semibold mt-4">Address</h2>
      <p>{params.address}</p>
      <div className="mt-4">
        <h1 className="text-lg font-bold mb-4 pt-2">Biography</h1>
        {bio.length !== 0 ? (
          <div>
            <p>{bio}</p>
            <p className="text-sm text-gray-500 mt-2">
              *This biography was generated using ChatGPT and may not be fully accurate. Please verify the information.
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="mt-4">
        <h1 className="text-lg font-bold mb-4 pt-2">Articles</h1>
        {articles ? (
          articles.map((article, index) => (
            <InfoArticle
              key={index}
              url={article.link}
              image={article.photo_url}
              headline={article.title}
              content={article.snippet}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Representative;
