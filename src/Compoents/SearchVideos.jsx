import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../data';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const SearchVideos = ({ sidebar }) => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${API_KEY}`;
        const res = await axios.get(searchUrl);
        setVideos(res.data.items);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) fetchSearchResults();
  }, [query]);

  return (
    <div className="flex">
      <Sidebar sidebar={sidebar} />
      <div className={`bg-gray-900 overflow-hidden px-1 md:pr-[2%] pr-0 py-[20px] w-full ${sidebar ? "md:pl-[7%] pl-0" : "md:pl-[17%] pl-0"}`}>
        <div className="pt-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
          {videos.map((item, idx) => (
            <Link
              to={`/video/0/${item.id.videoId}`}  
              key={idx}
              className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
            >
              <img
                src={item.snippet.thumbnails.high.url}
                alt={item.snippet.title}
                className="w-full h-52 object-cover aspect-auto rounded"
              />
              <h2 className="mt-2 text-lg font-semibold">{item.snippet.title}</h2>
              <p className="text-sm text-gray-400">{item.snippet.channelTitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchVideos;
