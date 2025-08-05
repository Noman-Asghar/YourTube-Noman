import React, { useState } from 'react'
import Sidebar from '../Compoents/Sidebar'
import Feed from '../Compoents/Feed'


const Home = ({sidebar}) => {
    const [category, setCategory] = useState(0)
  return (
    <div>
      <Sidebar sidebar={sidebar}  category={category} setCategory={setCategory}/>
      <div className={`bg-gray-900 md:pr-[2%] pr-0 py-[20px] ${sidebar ? "md:pl-[7%] pl-0" : "md:pl-[17%] pl-0"}`}>
        <Feed  category={category}/>
      </div>
      
    </div>
  )
}

export default Home
