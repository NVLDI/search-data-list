import React from 'react';
import Dashboard from './Components/Dashboard';
import ExcelData from './State/ExcelData'
import TN from './State/Tamilnadu'
import MA from './State/Maharashtra'
import KA from './State/Karnataka'
import HY from './State/Hyderabad'
import ON from './State/OnlineData'
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
            </Routes>
      </Router>
      </div>
      );
};
export default withAuthenticator(App);