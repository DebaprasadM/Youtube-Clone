import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_Converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

function PlayVideo() {
const {videoId}=useParams()

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    setApiData(data.items[0]);
  };

  const fetchOtherData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
      apiData ? apiData.snippet.channelId : ""
    }&key=${API_KEY}`;
    const res = await fetch(channelData_url);
    const data = await res.json();
    if (data.items?.length > 0) setChannelData(data.items[0]);

    // fetch comment data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

    const res2 = await fetch(comment_url);
    const data2 = await res2.json();
    if (data2.items?.length > 0) setCommentData(data2.items);
  };

  useEffect(() => {
    fetchVideoData();
 window.scrollTo(0, 0)
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
   
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoplay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_Converter(apiData.statistics.viewCount) : "16k"}{" "}
          Views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "Loading"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_Converter(apiData.statistics.likeCount) : "16k"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : null}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Deb M Vlogs"}</p>
          <span>
            {channelData
              ? value_Converter(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "shows the beauty of Bengal-India-world"}
        </p>
        <p>subscribe to watch more lovely video</p>
        <hr />
        <h4>
          {apiData ? value_Converter(apiData.statistics.commentCount) : 123}{" "}
          Comments
        </h4>
        {commentData.map((item, idx) => {
          return (
            <div key={idx} className="comment">
              <img
                src={
                  item?.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt=""
              />
              <div>
                <h3>
                  {item?.snippet.topLevelComment.snippet.authorDisplayName.slice(1)}{" "}
                  <span>1 day ago</span>
                </h3>
                <p>{item?.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_Converter(
                      item?.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlayVideo;
