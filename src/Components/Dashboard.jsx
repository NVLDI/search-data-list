import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import TopBar from './Appbar'
export default function Dashboard() {
  const PreventBackButton = () => {
    useEffect(() => {
      const disableBackButton = (e) => {
        e.preventDefault();
        window.location.replace(window.location.href);
      };
  
      window.addEventListener('popstate', disableBackButton);
  
      return () => {
        window.removeEventListener('popstate', disableBackButton);
      };
    }, []);
  }  
  return (
    <div>
        <TopBar/>
        <Sidebar/>
        <div style={{ textAlign: 'center', paddingTop: '200px'}}>
      <h1>Welcome to My Website</h1>
      <p>This is the welcome page of my Search Engine.</p>
      <p>Use search icon to select list of State</p>
      <p>Feel free to explore and enjoy your stay!</p>
    </div>
    </div>
  )
}
