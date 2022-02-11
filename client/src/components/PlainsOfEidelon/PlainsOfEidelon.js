import { useState } from 'react'
import { getData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import timeLeft from '../timeLeft';
import '../WFWorldState/WFWorldState.css'
import './PlainsOfEidelon.css';

function PlainsOfEidelon() {
    const [earth, setEarth] = useState(null)
    const [cetus, setCetus] = useState(null)
    const [, updateState] = useState(null)
    useInterval(() => {
        getData(setEarth, `earth`)
        getData(setCetus, `cetus`)
        updateState({})
    }, 1000)
    return (
        <div>
            {earth && cetus ?
            <div className="wfWorldState worldState">
                <div className='earth'>
                    <div>
                        <div>Earth | {earth.state}</div>
                        {parseTime(timeLeft(earth.expiry))}
                    </div>
                    <div>
                        <div>Cetus | {cetus.state}</div>
                        {parseTime(timeLeft(cetus.expiry))}
                    </div>
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default PlainsOfEidelon;
