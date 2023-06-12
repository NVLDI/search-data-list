import React from 'react'
import "./Appbar.css";
import {NotificationsNone, Language,Settings} from '@mui/icons-material/';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';

export default function Appbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/dashboard"} className='link'>
          <sapn className="logo">Search Engine</sapn>
          </Link></div>
        <div className="topRight">
            <Tooltip title="Notification">
            <div className="topbarIconsContainer">
                <NotificationsNone/>
            </div>
            </Tooltip>
            <Tooltip title="Language">
            <div className="topbarIconsContainer">
                <Language/>
            </div>
            </Tooltip>
            <Tooltip title="Setting">
            <div className="topbarIconsContainer">
                <Settings/>
            </div>
            </Tooltip>
        </div>
      </div>
    </div>
  )
}