import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../data';
import axios from 'axios';
import moment from 'moment';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchVideos = async () => {
    const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    try {
      const res = await axios.get(videoUrl);
      setData(res.data.items); 
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [category]);



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-[100px] px-4">
      {data?.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          key={index}
          className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          <img
            src={item.snippet.thumbnails.medium.url} 
            alt={`Video thumbnail ${index + 1}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <h2 className="text-base font-semibold mb-1 line-clamp-2">
              {item.snippet.title}
            </h2>
            <h3 className="text-sm text-gray-400">{item.snippet.channelTitle}</h3>
            <p className="text-sm text-gray-500">
              {value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
