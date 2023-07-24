import React from 'react'
import Sidebar from './Sidebar'
import TopBar from './Appbar'
import './Style.css'
export default function Dashboard() {
  return (
    <div>
        <TopBar/>
        <Sidebar/>
        <div className='container1'>
         <h1>Welcome to My Website</h1>
      <h2>This is the welcome page of my Search Engine.</h2>
      <h3>Final Update will be search using Customer Name, City, Mobile, with sub attributes will be given in drop down list and all possible ways</h3>
     <p>Feel free to explore and enjoy your stay!</p>
    </div>
    </div>
  )
}
