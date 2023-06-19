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
      <h2>This is the welcome page of my Search Engine. For this moment we have activated the following search engine</h2>
      <h3>Maharashtra Search Engine, Hyderabad Online Search Engine</h3>
      <h2>Latest Update!!!!!</h2>
      <h3>Hyderabad Search Engine, New2020 Hyderabad Online Search Engine</h3>
      <h2>Upcoming Update!!!!!</h2>
      <h3>Karnataka Search Engine ,Lately Tamil-Nadu Search Engine</h3>
     <p>Feel free to explore and enjoy your stay!</p>
    </div>
    </div>
  )
}
