import React, { useEffect, useState } from 'react';
import thumbnail1 from "../assets/thumbnail1.png";
import thumbnail2 from "../assets/thumbnail2.png";
import thumbnail3 from "../assets/thumbnail3.png";
import thumbnail4 from "../assets/thumbnail4.png";
import thumbnail5 from "../assets/thumbnail5.png";
import thumbnail6 from "../assets/thumbnail6.png";
import thumbnail7 from "../assets/thumbnail7.png";
import thumbnail8 from "../assets/thumbnail8.png";
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../data';
import axios from 'axios';
import moment from 'moment';

const Recommended = ({categoryId}) => {

  const [data, setData] = useState(null)

  const fetchVideos = async() => {
    const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
    await axios.get(videoUrl)
    .then((res) => setData(res.data.items))
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  
  return (
    <div className="flex flex-col gap-4 pt-[70px]">
      {data?.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          key={index}
          className="flex gap-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg overflow-hidden shadow-md transition-all duration-300"
        >
          <img
            src={item.snippet.thumbnails.default.url}
            alt={`Video thumbnail ${index + 1}`}
            className="w-36 h-24 rounded-lg object-cover flex-shrink-0"
          />
          <div className="p-2 flex flex-col justify-between">
            <h2 className="text-sm font-semibold leading-snug">
              {item.snippet.title}
            </h2>
            <h3 className="text-xs text-gray-400">{item.snippet.channelTitle}</h3>
            <p className="text-xs text-gray-500">{value_converter(item.statistics.viewCount)} • {moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
