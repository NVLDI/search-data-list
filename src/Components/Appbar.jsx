import React from 'react'
import "./Appbar.css";
import {NotificationsNone, Language,Settings} from '@mui/icons-material/';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { Authenticator } from '@aws-amplify/ui-react';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
export default function Appbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/"} className='link'>
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
            <Tooltip title="Logout">
            <div className="topbarIconsContainer">
            <Authenticator>
                  {({ signOut, user }) => (
                    <>
                  <LogoutIcon onClick={signOut}>Logout</LogoutIcon>
                  </>
                  )}
            </Authenticator>
            </div>
            </Tooltip>
        </div>
      </div>
    </div>
  )
}