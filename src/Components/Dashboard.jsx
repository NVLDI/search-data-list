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
      <p>This is the welcome page of my Search Engine. </p>
      <p>Use search icon to select list of State</p>
     <p>Feel free to explore and enjoy your stay!</p>
    </div>
    </div>
  )
}
