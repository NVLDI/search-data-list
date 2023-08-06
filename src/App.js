import React from 'react';
import Dashboard from './Components/Dashboard';
import ExcelData from './State/ExcelData'
import TN from './State/Tamilnadu'
import MA from './State/Maharashtra'
import KA from './State/Karnataka'
import HY from './State/Hyderabad'
import ON from './State/OnlineData'
import TN_Data from './State/TamilNadu_Data'
import New2020HY from './State/New2020Hyderabad'
import TN_Data_VID from './State/TamilNaduVID'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(awsconfig);
function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route exact path="/ExcelData" element={<ExcelData/>}/>
                <Route exact path="/tamilNadu" element={<TN/>}/>
                <Route exact path="/maharashtra" element={<MA/>}/>
                <Route exact path="/hyderabad" element={<HY/>}/>
                <Route exact path="/karnataka" element={<KA/>}/>
                <Route exact path="/onlinedata" element={<ON/>}/>
                <Route exact path="/New2020-Hyderabad" element={<New2020HY/>}/>
                <Route exact path="/tamilnadudata" element={<TN_Data/>}/>
                <Route exact path="/TNDataVID" element={<TN_Data_VID/>}/>
            </Routes>
      </Router>
      </div>
      );
};
export default withAuthenticator(App);