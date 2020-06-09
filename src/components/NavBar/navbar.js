import React, {useContext} from 'react'
import './navbar.scss'
import { Link, withRouter } from 'react-router-dom'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import DriveEtaTwoToneIcon from '@material-ui/icons/DriveEtaTwoTone';
import ViewDayTwoToneIcon from '@material-ui/icons/ViewDayTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import {ReactComponent as Logo} from '../../assets/step1.svg'
import {AppContext} from '../../context'
import {isAuthenticated, signout} from '../../APICalls/auth' 
const Navbar = ({history}) => {
    const {dark, setDark} = useContext(AppContext)
    const toggleTheme = () => {
        setDark(prevValue => !prevValue)
    }

    return (
     <div>
         <div className={dark ? "navbar-container navbar-container-bright" : "navbar-container navbar-container-dark"}>
            <ul className="nav-ul">
                <li className="nav-li" onClick={toggleTheme}>
                    {
                        dark ?  <WbSunnyIcon />  : <Brightness2Icon style={{color:"white"}}/> 
                    }
                </li>
                <Link to="/"><li className={dark ? "logo logo-bright" : "logo logo-dark"}>u<span className="R">R</span>ide<Logo className="logo-svg"/></li></Link>
                
                {
                    !isAuthenticated() && 
                    (
                        <>
                        <Link to="/login"><li className={dark ? "nav-li nav-li-bright signup signup-bright" : "nav-li nav-li-dark signup signup-dark"}>Login</li></Link>
                        </>
                    )
                }
                {
                    isAuthenticated() && 
                    <li onClick={() => {
                                    signout(() => {
                                        history.push("/")
                                    })
                                }} className={dark ? "nav-li nav-li-bright" : " nav-li nav-li-dark"}>Logout</li>
                }
                
                <Link to="/ride"><li className={dark ? "nav-li nav-li-bright" : " nav-li nav-li-dark"}>Get a Ride</li></Link>
                <Link to="/lend"> <li className={dark ? "nav-li nav-li-bright" : " nav-li nav-li-dark"}>Lend your Car</li></Link>
            </ul>
        </div>

        <div className={dark ? "vBar-container vBar-container-bright" : "vBar-container vBar-container-dark"}>
                <div className="vLogo">
                    <div id="block" className="vLogo">
                    <Link to="/">
                        <Logo  id="logo-svg-h"/>
                    </Link>
                    </div>
                </div>
                <div className="vNav-li">
                    <div id="block" className={dark ? "vNav-li vNav-li-bright" : " vNav-li vNav-li-dark"}>
                            <Link to="/lend">
                                <ViewDayTwoToneIcon className={dark ? "icon-bright" : "icon-dark"} style={{fontSize:30}}/>
                            </Link>
                            <p>Lend</p>
                    </div>
                </div>

                <div className="vNav-li">
                    <div  id="block"className={dark ? "vNav-li vNav-li-bright" : " vNav-li vNav-li-dark"}>
                        <Link to="ride">
                            <DriveEtaTwoToneIcon className={dark ? "icon-bright" : "icon-dark"} style={{fontSize:30}}/>
                        </Link>
                        <p>Ride</p>
                    </div>
                </div>

                <div className="vNav-li">
                    <div id="block" className={dark ? "vNav-li vNav-li-bright" : " vNav-li vNav-li-dark"}>
                       {isAuthenticated() ?
                                <>
                                <ExitToAppTwoToneIcon onClick={() => {
                                    signout(() => {
                                        history.push("/")
                                    })
                                }} className={dark ? "icon-bright" : "icon-dark"} style={{fontSize:30}}
                                 />
                                <p>Logout</p>
                                </>
                        : 
                        <Link style={{textDecoration:"none"}} to="login">
                            <FaceTwoToneIcon className={dark ? "icon-bright" : "icon-dark"} style={{fontSize:30}}/>
                            <p
                            className={dark ? "bright": "dark"}
                            >Profile</p>
                        </Link>
                        }
                        
                    </div>
                </div>
                
                <div className="vNav-li">
                    <div id="block" className="vNav-li" onClick={toggleTheme}>
                        {
                            dark ?  <WbSunnyIcon style={{fontSize:25, float:"right", marginRight:"5%"}}/>  : <Brightness2Icon style={{color:"white", fontSize:25, float:"right", marginRight:"5%"}}/> 
                        }
                        <p>D/B</p>
                    </div>
                </div>
        </div>


     </div>
    )
}

export default withRouter(Navbar) 
