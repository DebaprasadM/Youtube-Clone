import "./Recommanded.css";
import React, { useEffect, useState } from "react";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { API_KEY } from "../../data";
import { value_Converter } from "../../data";
import { Link } from "react-router-dom";

function Recommanded({ categoryId }) {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    const res = await fetch(relatedVideo_url);
    const data = await res.json();
    setApiData(data.items);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommanded">
      {apiData.map((item, idx) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={idx} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
              <h4>{item.snippet.title || "Victoria Memorial - Kolkata"}</h4>
              <p>{item.snippet.channelTitle || "Deb M Vlogs"}</p>
              <p>
                {value_Converter(item.statistics.viewCount) || "400k"} Views
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Recommanded;
