import React, { useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login'
import ExcelData from './State/ExcelData'
import TN from './State/Tamilnadu'
import MA from './State/Maharashtra'
import KA from './State/Karnataka'
import HY from './State/Hyderabad'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

function App() {
  const App = () => {
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
      };
  
      window.onbeforeunload = handleBeforeUnload;
  
      return () => {
        window.onbeforeunload = null;
      };
    }, []);
  }
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/Dashboard" element={<Dashboard/>}/>
                <Route exact path="/ExcelData" element={<ExcelData/>}/>
                <Route exact path="/tamilNadu" element={<TN/>}/>
                <Route exact path="/maharashtra" element={<MA/>}/>
                <Route exact path="/hyderabad" element={<HY/>}/>
                <Route exact path="/karnataka" element={<KA/>}/>
            </Routes>
      </Router>
      </div>
      );
};
export default (App);