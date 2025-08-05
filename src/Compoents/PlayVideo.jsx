import React, { useEffect, useState } from "react";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import { API_KEY, value_converter } from "../data";
import axios from "axios";
import moment from "moment";

const PlayVideo = ({ videoId }) => {
  const [data, setData] = useState(null);
  const [channel, setChannel] = useState(null);
  const [comments, setComments] = useState(null);

  const fetchVideo = async () => {
    const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await axios.get(videoUrl).then((res) => setData(res.data.items[0]));
  };

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  const fetchOtherData = async () => {
    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.snippet.channelId}&key=${API_KEY}`;
    await axios.get(channelUrl).then((res) => setChannel(res.data.items[0]));

    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await axios.get(commentUrl).then((res) => setComments(res.data.items));
  };

  useEffect(() => {
    if (data && data.snippet?.channelId) {
      fetchOtherData();
    }
  }, [data]);

  if (!data || !channel || !comments) {
    return (
      <div className="text-white pt-[70px] px-4">
        <p>Loading Data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 pt-[70px] md:px-4 px-2">
      {/* Video Player */}
      <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-xl">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold mt-4 text-white">
        {data.snippet.title}
      </h3>

      {/* Stats + Buttons */}
      <div className="flex justify-between flex-wrap items-center mt-2 text-gray-400 gap-2 text-sm sm:text-base">
        <p>
          {value_converter(data.statistics.viewCount)} views •{" "}
          {moment(data.snippet.publishedAt).fromNow()}
        </p>
        <div className="flex gap-3 flex-wrap">
          <Action icon={like} label={value_converter(data.statistics.likeCount)} />
          <Action icon={dislike} label="12" />
          <Action icon={share} label="Share" />
          <Action icon={save} label="Save" />
        </div>
      </div>

      <hr className="my-4 border-gray-700" />

      {/* Channel Info */}
      <div className="flex items-start sm:items-center gap-4 mb-4">
        <img
          src={channel.snippet.thumbnails.default.url}
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <p className="text-white font-semibold text-base sm:text-lg">
            {data.snippet.channelTitle}
          </p>
          <span className="text-gray-400 text-sm">
            {value_converter(channel.statistics.subscriberCount)} Subscribers
          </span>
        </div>
        <button className="bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700 text-sm">
          Subscribe
        </button>
      </div>

      {/* Description */}
      <div className="text-gray-300 text-sm sm:text-base mb-4 whitespace-pre-wrap">
        {data.snippet.description}
      </div>

      <hr className="my-4 border-gray-700" />

      {/* Comments */}
      <h3 className="text-white font-semibold mb-3 text-base sm:text-lg">
        {value_converter(data.statistics.commentCount)} Comments
      </h3>
      {comments?.map((item, i) => (
        <div key={i} className="flex gap-3  md:flex-row flex-col mb-4 text-sm">
          <img
            src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="text-white font-semibold text-sm sm:text-base">
              {item.snippet.topLevelComment.snippet.authorDisplayName}
              <span className="text-gray-500 text-xs sm:text-sm ml-1">
                • {moment(item.snippet.publishedAt).fromNow()}
              </span>
            </h4>
            <p className="text-gray-300 mb-1">
              {item.snippet.topLevelComment.snippet.textDisplay}
            </p>
            <div className="flex items-center gap-2">
              <img src={like} alt="" className="w-4 h-4" />
              <span className="text-xs text-gray-400">
                {value_converter(item.snippet.topLevelComment.snippet.likeCount)}
              </span>
              <img src={dislike} alt="" className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Action Component
const Action = ({ icon, label }) => (
  <span className="flex items-center gap-1 text-gray-300 cursor-pointer hover:text-white">
    <img src={icon} alt="" className="w-5 h-5" />
    <span className="text-sm">{label}</span>
  </span>
);

export default PlayVideo;
