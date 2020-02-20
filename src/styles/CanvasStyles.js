import {fade, makeStyles} from "@material-ui/core/styles";
import bg from "./Confetti-Doodles.svg";
import bg2 from "./Hollowed-Boxes.svg";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        background: `url(${bg2}) center center fixed`,
        WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        OBackgroundSize: "cover",
        backgroundSize: "cover !important",
        // marginRight: "2%",
        // marginLeft: "2%",
        display: 'flex',
        justifyContent: 'space-between',
        // paddingTop: '5%'
    },
    settings:{
        width: '25%',
        height: '91%',
        // backgroundColor: "#80A4AE",
        display: 'inline-block',
        // borderRight: '3px solid black',
        padding: '2em',
        // marginRight: '1em'
        // marginBottom: '40%'
    },
    results:{
        width: '24%',
        // minWidth: '50vw',
        height: '95.5%',
        padding: '1em',
        // backgroundColor: "green",
        display: 'inline-block',
        // marginLeft: '1em',
        zIndex: 100


    },
    canvas:{
        width: '47.5%',
        // minWidth: 590,

        // width: '47.5%',
        height: '90vh',
        margin: 0,
        padding: 0,
        // marginLeft: '5%',
        // marginRight: '5.5%',
        // marginTop: '%',
        // backgroundColor: "red",
        display: 'inline-block'
    },
    "@global .sketch-picker":{
        background: "none !important"
    }

}));

export default useStyles;
