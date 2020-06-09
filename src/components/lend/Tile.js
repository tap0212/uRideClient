import React, {useContext, useState} from 'react'
import {Grid} from '@material-ui/core'
import {AppContext} from '../../context'
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import StarHalfOutlinedIcon from '@material-ui/icons/StarHalfOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../../../node_modules/react-responsive-modal/styles.css';
import {getPhoto} from '../../APICalls/car'

const Tile = (props) => {
    const {dark} = useContext(AppContext)
    const [like, setLike] = useState(false)
    const [photoUrl, setPhotoUrl] = React.useState("")
    React.useEffect(() => {
        getPhoto(props.car._id)
            .then((res) => {
                setPhotoUrl(res.url)
            })
            .catch(err => console.log(err))
    }, [])



    const handleLike = () => {
        setLike(prev => !prev)
    }
    return (
        <div id="car" className={dark ? "car-tile car-tile-bright" : "car-tile car-tile-dark"}>
            <Grid container>
                <Grid item  xs={12} md={3}>
                    <div className="col1">
                        {
                            like
                              ?
                            <FavoriteIcon style={{fontSize:20}} onClick={handleLike} className="like" /> 
                              :
                            <FavoriteBorderIcon style={{fontSize:20}} onClick={handleLike} className="unlike" />
                        }

                        <img src={photoUrl} className="img" alt=""/>
                    </div>
                </Grid>

                <Grid item  xs={6} md={5}>
                    <div className="col2">
                        <h5>{props.car.category.name}</h5>
                        <h2>{props.car.brand}</h2>
                        <h3>{props.car.modelName}</h3>
                        <span><EventAvailableOutlinedIcon style={{fontSize:"20"}} className="fuel"/>{props.car.year}</span>
                        <span><LocalGasStationOutlinedIcon style={{fontSize:"20"}} className="fuel"/>Petrol</span>
                        <span><SettingsOutlinedIcon style={{fontSize:"20"}} className="fuel"/>Manual</span>

                    </div>
                </Grid>

                <Grid item  xs={6} md={4}>
                    <div className="col3">
                        <StarHalfOutlinedIcon className="star" />
                        <h5>uRide10 Applied</h5>
                        <h1><span className="rs">&#8377; </span>{props.car.price}/-</h1>
                        <button>Book Now!</button>
                        <h6>*prices are for 24hrs</h6>
                        <h6>**Extra 20% for each next 12 hrs.</h6>
                    </div>
                </Grid>    
            </Grid>
            
        </div>
    )
}
export default Tile

