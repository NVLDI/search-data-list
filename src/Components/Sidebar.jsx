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
    <SideNav.Toggle />
<SideNav.Nav defaultSelected="home">
        <NavItem eventKey="product">
            <NavIcon>
            <i class="fa-solid fa-h" style={{ fontSize: '1.5em' }}></i>
            </NavIcon>
            <NavText>
                Hyderabad
            </NavText>
            <NavItem eventKey="hyderabad">
            <NavText>
                Hyderabad
            </NavText>
            </NavItem> 
            <NavItem eventKey="OnlineData">
            <NavText>
                OnlineData
            </NavText>
            </NavItem> 
        </NavItem>
        <NavItem eventKey="product1">
        <NavIcon>
            <i class="fa-solid fa-k" style={{ fontSize: '1.5em' }}></i>
            </NavIcon>
            <NavText>
                Karnataka
            </NavText>
            <NavItem eventKey="karnataka">
            <NavText>
                Karnataka
            </NavText>
            </NavItem> 
        </NavItem>
        <NavItem eventKey="product2">
        <NavIcon>
            <i class="fa-solid fa-m" style={{ fontSize: '1.5em' }}></i>
            </NavIcon>
            <NavText>
            Maharashtra
            </NavText>
            <NavItem eventKey="Maharashtra">
            <NavText>
            Maharashtra
            </NavText>
            </NavItem> 
        </NavItem>
        <NavItem eventKey="product3">
        <NavIcon>
            <i class="fa-solid fa-t" style={{ fontSize: '1.5em' }}></i>
            </NavIcon>
            <NavText>
            Tamil Nadu
            </NavText>
            <NavItem eventKey="tamilnadu">
            <NavText>
            Tamil Nadu
            </NavText>
            </NavItem> 
        </NavItem>
        <NavItem eventKey="product4">
        <NavIcon>
            <i class="fa-solid fa-table" style={{ fontSize: '1.5em' }}></i>
            </NavIcon>
            <NavText>
            Excel Data
            </NavText>
            <NavItem eventKey="exceldata">
            <NavText>
            Excel Data
            </NavText>
            </NavItem> 
        </NavItem>
    </SideNav.Nav>
    </SideNav>
  )
}
