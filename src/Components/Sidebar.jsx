import React from 'react'
import SideNav,{NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import "./Sidebar.css"
import {useNavigate} from 'react-router-dom';
export default function Sidebar() {
    const navigate = useNavigate();
  return (
   <SideNav
    onSelect={(selected) => {
        // Add your code here
        console.log(selected);
        navigate('/'+selected)
    }}
    className="Mysidebar"> 

<SideNav.Nav defaultSelected="home">
       
        <NavItem eventKey="product">
            <NavIcon>
            <i class="fa-solid fa-magnifying-glass" style={{ fontSize: '1.5em' }}></i>
            </NavIcon>
            <NavText>
                Search Customer Data
            </NavText>
            <NavItem eventKey="hyderabad">
            <NavText>
                Hyderabad
            </NavText>
            </NavItem> 
            <NavItem eventKey="karnataka">
            <NavText>
                Karnataka
            </NavText>
            </NavItem> 
            <NavItem eventKey="maharashtra">
            <NavText>
                Maharashtra
            </NavText>
            </NavItem> 
            <NavItem eventKey="tamilNadu">
            <NavText>
                Tamil Nadu
            </NavText>
            </NavItem> 
            <NavItem eventKey="ExcelData">
            <NavText>
                ExcelData
            </NavText>
            </NavItem> 
        </NavItem>
    </SideNav.Nav>
    </SideNav>
  )
}
