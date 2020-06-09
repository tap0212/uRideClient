import React, {useContext, useState} from 'react'
import Navbar from '../../NavBar/navbar'
import {AppContext} from '../../../context'
import {Grid} from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import {ReactComponent as SignupSvg} from '../../../assets/undraw_fingerprint_swrc.svg'
import {signin, authenticate} from '../../../APICalls/auth'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";


const Signup = () => {
    const override = css`
    display: block;
    margin-left:50%;
   `;
    const {dark} = useContext(AppContext)
    const [state, setState] = useState({
        email: "", 
        password:"", 
        error:"", 
        loading:false, 
        didRedirect:false,
    });
    const {email, password, error, loading, didRedirect} = state;
    const handleChange = name => event => {
        setState({...state, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setState({...state, error:'', loading:true});
        signin({email,password})
            .then(data => {
                if(data.error){
                    setState({...state, error:data.error, loading:false})
                }
                else{
                    authenticate(data, () => {
                        setState({
                            ...state,
                            didRedirect: true
                        })
                    })
                }
            }).catch(console.log("error in login"))
    }
    const Flash = () => {
        if(error){
            return  <Alert severity="error"><span className="flash">{error}</span></Alert>
        }
        if(didRedirect===true){
            return  <Redirect to="/" />
        }
    }
    return (
        <div>
            <Navbar/>
            <Grid className={dark ? "signup-container" : "signup-container-dark"} container spacing={0}>
                <Grid className="signup-left" item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="signup-form">
                        <h3 className="join-head">Login to book a uRide.</h3>
                        <h4 className="join-head-sub">We Simplify car rentals so you can focus on what's important.</h4>
                        {Flash()}
                        <form className="signup-form-form">
                            <div className="form-control-div">
                                <input
                                 autoFocus
                                 required 
                                 type="email" 
                                 placeholder="john@gmail.com"
                                 onChange={handleChange("email")}
                                 value={email}

                                 />
                            </div>

                            <div className="form-control-div">
                                <input 
                                required 
                                type="password" 
                                placeholder="*******"
                                onChange={handleChange("password")}
                                value={password}
                                />
                            </div>
                            
                            <div className="checkbox-div">
                                Not a user?<Link className="login-link" to="/signup">Signup</Link>
                            </div>
                            <button onClick={onSubmit} className="signup-button">Login</button>
                            {loading && 
                                <PropagateLoader
                                    css={override}
                                    size={25}
                                    color={"#6C63FE"}
                                    loading={loading}
                                />
                            }
                        </form>
                    </div>
                </Grid>

                <Grid className="signup-right" item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <SignupSvg className="login-svg" />
                </Grid>
            </Grid>
        </div>
    )
}
export default Signup