import React, {useState} from 'react'
import {FileInput} from 'react-md';
import Input from '@material-ui/core/Input';
import CanvasDraw from "react-canvas-draw";
import {SketchPicker} from 'react-color'
import { WaveLoading } from 'react-loadingg';

import axios, {post} from 'axios'
import userStyles from '../styles/CanvasStyles'
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import Icon from "@material-ui/core/Icon";
import {loadCSS} from 'fg-loadcss';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import {deepOrange} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import 'react-circular-progressbar/dist/styles.css';
import Progress from "./Progress";
import PrettoSlider from "./PrettoSlider";


// @WallTack/react-canvas-draw
// git+https://git@github.com/embiem/react-canvas-draw.git
// git+ssh://git@github.com/embiem/react-canvas-draw.git
// npm install WallTack/react-canvas-draw


function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}



const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(deepOrange[600]),
        backgroundColor: deepOrange[600],
        '&:hover': {
            backgroundColor: deepOrange[800],
        },
    },
}))(Button);


const Canvas = (props) => {
    const classes = userStyles();
    const [color, setColor] = useState("rgb(0, 0, 0)");
    const [saveableCanvas, setSaveableCanvas] = useState(null);
    const [loadableCanvas, setLoadableCanvas] = useState(null);
    const [eraser, setEraser] = useState(false);
    const [brushRadius, setBrushRadius] = useState(20);
    const [lazyRadius, setLazyRadius] = useState(10);
    const [prediction, setPrediction] = useState([]);
    const [highestPrediction, setHighestPrediction] = useState(null);
    const [canvasType, setCanvasType] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);



    const handleChange = async (event) => {
        setLoading(true);

        // console.log('Selected file:', event.target.files[0]);
        // await axios.post("http://127.0.0.1:5000/predict", event.target.files[0])
        //     .then((res)=> console.log(res))
        //     .catch((err)=> console.log(err));
        // console.log(`done`);
        // const formData = new FormData();
        // formData.append('file', event.target.files[0]);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        // await axios.post("http://127.0.0.1:5000/predict", formData, config)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));

        const formData = new FormData();
        const canvas = document.getElementsByTagName("canvas");
        // const canvas =  document.querySelector( 'canvas' );
        const img = canvas[1].toDataURL('image/png;base64', 1.0);
        console.log(img);
        const img_blob = dataURItoBlob(img);
        console.log(img_blob);

        formData.append('file', img_blob);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        // await axios.post("http://127.0.0.1:5000/predict", formData, config)
        await axios.post("https://mnist-api21.herokuapp.com/predict", formData, config)
            .then(async (res) => {
                // console.log(typeof (res.data.prediction['0']));
                // console.log(res.data.prediction['0'][0]);

                console.log(res);
                await setPrediction(res.data.prediction['0']);
                await setHighestPrediction(res.data.pred['0']);
                setLoading(false)
                // console.log(res.data.pred['0']);
            })
            .catch((err) => console.log(err));

    };


    const handleColorChange = (color) => {
        setColor(color.hex);
        console.log(prediction[5]);

    };

    return (
        <div className={classes.root}>
            {/*<Input*/}
            {/*    type={'file'}*/}
            {/*    onChange={handleChange}*/}
            {/*/>*/}


            {/*<button >Pick color</button>*/}

            <section className={classes.settings}>
                <section style={{width: '80%', marginLeft: '5%', marginTop: '20%'}}>
                    <Typography gutterBottom style={{color: '#FFFFE6'}}>Brush Radius</Typography>
                    <PrettoSlider
                        color={'#C51162'}
                        min={10}
                        step={0.5}
                        max={35}
                        // marks
                        value={brushRadius}
                        valueLabelFormat={brushRadius}
                        valueLabelDisplay="auto"
                        aria-label="custom thumb label"
                        defaultValue={18}
                        onChange={(event, newValue) => {
                            setBrushRadius(newValue)
                        }}
                    />
                    <Typography gutterBottom style={{color: '#FFFFE6'}}>Lazy Length</Typography>

                    <PrettoSlider
                        style={{marginBottom: '12%',color: '#303F9F'}}
                        min={1}
                        step={0.5}
                        max={30}
                        value={lazyRadius}
                        valueLabelFormat={lazyRadius}
                        valueLabelDisplay="auto"
                        aria-label="custom thumb label"
                        defaultValue={10}
                        onChange={(event, newValue) => {
                            setLazyRadius(newValue)
                        }}
                    />
                    <FormControlLabel
                        style={{color: '#FFFFE6'}}
                        control={<Switch
                            checked={eraser}
                            onChange={() => {
                                setEraser(eraser => !eraser);
                            }}
                            value="checkedB"
                            color="primary"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />}
                        label="Eraser"
                    />
                </section>
                <section style={{marginTop: '30%'}}>
                    <section style={{display: 'flex', justifyContent: 'space-around', marginBottom: '15%'}}>

                        <Button
                            startIcon={<UndoIcon/>}
                            variant="outlined"
                            color="secondary"
                            style={{fontSize: '0.7em'}}
                            onClick={() => {
                                saveableCanvas.undo();
                            }}
                        >
                            Undo
                        </Button>
                        <Button
                            startIcon={<CloudUploadIcon/>}
                            style={{fontSize: '0.7em', color: '#FFFFE6'}}
                            variant="outlined"
                            color="default"
                            onClick={() => {
                                try{
                                    loadableCanvas.loadSaveData(
                                        localStorage.getItem("savedDrawing")
                                    );
                                    setCanvasType(true);
                                }catch (e) {
                                    console.log(e);
                                }

                            }}
                        >
                            Load previous image
                        </Button>
                    </section>

                    <section style={{display: 'flex', justifyContent: 'space-around', marginBottom: '15%'}}>

                        <Button
                            onClick={() => {
                                localStorage.setItem(
                                    "savedDrawing",
                                    saveableCanvas.getSaveData()
                                );
                            }}
                            startIcon={<SaveIcon/>}
                            variant="contained"
                            color="primary">
                            Save
                        </Button>

                        <Button
                            style={{marginRight: '10%'}}

                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon/>}
                            onClick={() => {
                                saveableCanvas.clear();
                            }}
                        >
                            Clear
                        </Button>
                    </section>
                    <section style={{display: 'flex', justifyContent: 'space-around', marginBottom: '10%'}}>
                        <ColorButton
                            style={{marginRight: '12%'}}
                            variant="contained"
                            // color="primary"
                            startIcon={<Icon className={"far fa-lightbulb"} style={{color: 'white', fontSize: '20'}}/>}
                            onClick={handleChange}
                            disabled={loading}
                        >
                            Predict
                        </ColorButton>
                    </section>

                </section>


            </section>
            {/*<CanvasDraw*/}
            {/*    disabled*/}
            {/*    hideGrid*/}
            {/*    ref={canvasDraw => (setLoadableCanvas(canvasDraw))}*/}
            {/*    saveData={localStorage.getItem("savedDrawing")}*/}
            {/*/>*/}

            <section className={classes.canvas}>
                <p style={{textAlign: 'center', fontWeight: 800, color: 'white'}}>MINIST digit dataset prediction.</p>
                <p style={{textAlign: 'center', fontWeight: 500, color: 'white'}}>98.55% accuracy</p>
                <CanvasDraw
                    // className={classes.canvas}
                    ref={canvasDraw => {setSaveableCanvas(canvasDraw);  setLoadableCanvas(canvasDraw)}}
                    style={{background: "rgba(256, 256, 256, 0.1)"}}
                    brushColor={color}
                    erase={eraser}
                    canvasHeight={600}
                    canvasWidth={620}
                    brushRadius={brushRadius}
                    lazyRadius={lazyRadius}
                    catenaryColor={ color}
                    saveData={canvasType && localStorage.getItem("savedDrawing") }

                    // imgSrc={bg}
                    // imgSrc="data:image/jpeg;base64,/9j/4AA   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"
                />
                {/*<CanvasDraw*/}
                {/*    disabled*/}
                {/*    hideGrid*/}
                {/*    ref={canvasDraw => (setLoadableCanvas(canvasDraw))}*/}
                {/*    saveData={localStorage.getItem("savedDrawing")}*/}
                {/*/>*/}
            </section>
            <div className={classes.results}>
                {/*<p style={{width: "40%"}}/>*/}
                <section style={{display: 'flex', justifyContent: 'space-around', marginLeft: '2em'}}>
                    <SketchPicker onChange={handleColorChange} color={color} width={200} style={{color: 'red'}}/>

                </section>
                <section style={{marginTop: '0.2em'}}>

                    {loading ?
                        <section style={{display: 'flex', justifyContent: 'space-around', marginLeft: '2em', marginTop: '10em'}}>
                            <WaveLoading color={"#FFFFE6"}  style={{display: 'block'}}/>
                        </section>
                        :
                        prediction.length !== 0 &&
                                <>
                                    <Progress val={prediction[0]} index={0} val2={prediction[1]} index2={1} high={highestPrediction}/>
                                    <Progress val={prediction[2]} index={2} val2={prediction[3]} index2={3}  high={highestPrediction}/>
                                    <Progress val={prediction[4]} index={4} val2={prediction[5]} index2={5}  high={highestPrediction}/>
                                    <Progress val={prediction[6]} index={6} val2={prediction[7]} index2={7}  high={highestPrediction}/>
                                    <Progress val={prediction[8]} index={8} val2={prediction[9]} index2={9}  high={highestPrediction}/>
                                </>

                    }


                </section>
            </div>
        </div>
    )
};

export default Canvas;

