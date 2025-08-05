import React, { useState } from 'react'
import home from "../assets/home.png"
import gameIcon from "../assets/game_icon.png"
import autoMob from "../assets/automobiles.png"
import sports from "../assets/sports.png"
import entertainment from "../assets/entertainment.png"
import tech from "../assets/tech.png"
import music from "../assets/music.png"
import blogs from "../assets/blogs.png"
import news from "../assets/news.png"
import jack from "../assets/jack.png"
import simon from "../assets/simon.png"
import tom from "../assets/tom.png"
import megan from "../assets/megan.png"
import cameron from "../assets/cameron.png"
import "../App.css"





const Sidebar = ({ sidebar, category, setCategory }) => {


  return (
    <div className={`h-[100vh] fixed top-[52px] bg-gray-800 text-white transition-all duration-200 ease-in-out  ${sidebar ? "small-nav md:w-[5%] w-[20%]" : "md:w-[15%] w-0"} z-10`}>
      <div>
        <div className={`side-links ${category === 0 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(0)}>
          <img src={home} alt="" />
          <p>Home</p>
        </div>
        <div className={`side-links ${category === 20 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(20)}>
          <img src={gameIcon} alt="" />
          <p>Gaming</p>
        </div>
        <div className={`side-links ${category === 2 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(2)}>
          <img src={autoMob} alt="" />
          <p>automobiles</p>
        </div>
        <div className={`side-links ${category === 17 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(17)}>
          <img src={sports} alt="" />
          <p>Sports</p>
        </div>
        <div className={`side-links ${category === 24 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(24)}>
          <img src={entertainment} alt="" />
          <p>Entertainment</p>
        </div>
        <div className={`side-links ${category === 28 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(28)}>
          <img src={tech} alt="" />
          <p>Technology</p>
        </div>
        <div className={`side-links ${category === 10 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(10)}>
          <img src={music} alt="" />
          <p>Music</p>
        </div>
        <div className={`side-links ${category === 22 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(22)}>
          <img src={blogs} alt="" />
          <p>Blogs</p>
        </div>
        <div className={`side-links ${category === 25 ? "mb-2 border-b-3 border-red-700" : "border-none"}`} onClick={() => setCategory(25)}>
          <img src={news} alt="" />
          <p>News</p>
        </div>
        <hr />
      </div>
      <div className=' '>
        <h2 className={`font-bold md:p-2 p-0 ${sidebar ? "block" : "hidden"}`}>Subcribers</h2>
        <div className='sub-links'>
          <img src={jack} alt="" />
          <p>PewDiePei</p>
        </div> 
        <div className='sub-links'>
          <img src={simon} alt="" />
          <p>MrBeast</p>
        </div>
        <div className='sub-links'>
          <img src={tom} alt="" />
          <p>Justin Bieber</p>
        </div>
        <div className='sub-links'>
          <img src={megan} alt="" />
          <p>5-min Crafts</p>
        </div>
        <div className='sub-links'>
          <img src={cameron} alt="" />
          <p>Nas Daily</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
