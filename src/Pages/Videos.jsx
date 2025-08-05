import React, { useEffect, useState } from 'react';
import PlayVideo from '../Compoents/PlayVideo';
import Recommended from '../Compoents/Recommended';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from '../data';

const Videos = () => {
  const { categoryId, videoId } = useParams();
  const [resolvedCategoryId, setResolvedCategoryId] = useState(categoryId);

  // If categoryId is "0", fetch actual category using videoId
  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId === "0" && videoId) {
        try {
          const res = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
          );
          const actualCategoryId = res.data.items[0]?.snippet?.categoryId || "0";
          setResolvedCategoryId(actualCategoryId);
        } catch (err) {
          console.error("Failed to fetch actual category:", err);
        }
      }
    };
    fetchCategory();
  }, [categoryId, videoId]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 md:px-4 px-2 py-4">
      {/* Left: Main Video Player */}
      <div className="w-full lg:w-[70%]">
        <PlayVideo videoId={videoId} />
      </div>

      {/* Right: Recommended Sidebar */}
      <div className="w-full hidden sm:block lg:w-[30%]">
        <Recommended categoryId={resolvedCategoryId} />
      </div>
    </div>
  );
};

export default Videos;
