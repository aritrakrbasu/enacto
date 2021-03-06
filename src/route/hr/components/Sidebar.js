import { faCogs, faFileDownload, faSignOutAlt, faTable, faUserTie, faAtom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useAuth } from '../../../context/AuthProvider'
import '../../student/styles/sidebar.css'
import {NavLink} from 'react-router-dom'

function Sidebar() {
    const {currentUser,logout} = useAuth()
    const history = useHistory()

    async function handleLogout() {    
        try {
          await logout()
          history.push("/hr-login")
        } catch {
          console.log("Failed to log out")
        }
      }
    
    useEffect(() => {

        if(currentUser && currentUser.uid)
        {
            if(!currentUser.isHr)
                handleLogout()
        }
    }, [currentUser])
    return (
        <div className="sidebar">
            <div className="brand-sidebar">Enact to get hired</div>
            <div className="brand-sidebar-verticle">Enacto</div>
            <ul class="sidebar-container">
                <NavLink activeClassName="selected-nav" to="/hr-dashboard"><li>
                    <FontAwesomeIcon icon={faTable}/> 
                    <span>Dashboard</span>
                </li></NavLink>
                <NavLink activeClassName="selected-nav" to="/hr-offers"><li>
                    <FontAwesomeIcon icon={faAtom}/> 
                    <span>Offers</span>
                </li></NavLink>
                <NavLink activeClassName="selected-nav" to="/hr-jobs"><li>
                    <FontAwesomeIcon icon={faUserTie}/> 
                    <span>Jobs</span>
                </li></NavLink>
                <NavLink activeClassName="selected-nav" to="/hr-data-retrieve"><li>
                    <FontAwesomeIcon icon={faFileDownload}/> 
                    <span>Candidate</span>
                </li></NavLink>
                <NavLink activeClassName="selected-nav" to="/hr-settings"><li>
                    <FontAwesomeIcon icon={faCogs}/> 
                    <span>Settings</span>
                </li></NavLink>
                <li>
                    <Button variant="light" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Button>
                </li>
                
            </ul>
        </div>
    )
}

export default Sidebar
