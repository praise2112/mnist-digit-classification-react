import React from 'react'
import ProgressProvider from "./ProgressProvider";
import {CircularProgressbar} from "react-circular-progressbar";
import Fab from "@material-ui/core/Fab";


const Progress = (props)=> {
    return (
        <section style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            {props.high === props.index ?
                <Fab color="secondary" aria-label="edit" size={'small'} style={{margin: 0, padding: 0}}>
                    <span style={{fontSize: '1.5em'}}>{props.index}</span>
                </Fab>:
                <Fab aria-label="edit" size={'small'} style={{margin: 0, padding: 0}}>
                    <span style={{fontSize: '1.2em'}}>{props.index}</span>
                </Fab>

            }
            <ProgressProvider valueStart={1} valueEnd={parseFloat((props.val * 100).toFixed(4))}>
                {value => <CircularProgressbar
                    background={true}
                    value={value} text={`${value}%`}
                    // style={{paddingLeft: "1em"}}
                    styles={{
                        root: {
                            width: "4.5em",
                            display: 'inline-block',
                            // paddingLeft: "5em",
                            paddingTop: "0.8em"
                        },
                        // path: {
                        //     // Path color
                        //     stroke: `rgb(63, 81, 181)`,
                        // },
                        text: {
                            // Text color
                            fill: '#FFFFE6',
                            fontSize: '1.1em'
                        },
                        background:{
                            fill:  'rgba(0, 0, 0, 0.2)'
                        }
                    }}
                />}
            </ProgressProvider>
            {props.high === props.index2 ?
                <Fab color="secondary" aria-label="edit" size={'small'} style={{margin: 0, padding: 0}}>
                    <span style={{fontSize: '1.5em'}}>{props.index2}</span>
                </Fab>:
                <Fab aria-label="edit" size={'small'} style={{margin: 0, padding: 0}}>
                    <span style={{fontSize: '1.2em'}}>{props.index2}</span>
                </Fab>

            }
            <ProgressProvider valueStart={1} valueEnd={parseFloat((props.val2 * 100).toFixed(4))}>
                {value => <CircularProgressbar
                    background={true}
                    value={value} text={`${value}%`}
                    // style={{paddingLeft: "1em"}}
                    styles={{
                        root: {
                            width: "4.5em",
                            display: 'inline-block',
                            // paddingLeft: "5em",
                            paddingTop: "0.8em"
                        },
                        path: {
                            // Path color
                            // stroke: `rgb(63, 81, 181)`,
                        },
                        text: {
                            // Text color
                            fill: '#FFFFE6',
                            fontSize: '1.1em'
                        },
                        background:{
                            fill:  (props.index2 === 9 || props.index2 === 7 ) ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'
                        }
                    }}
                />}
            </ProgressProvider>
        </section>
    )
};

export default Progress

