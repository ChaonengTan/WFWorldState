import { useState } from 'react'
import { getData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import timeLeft from '../timeLeft';
import '../WFWorldState/WFWorldState.css'
import '../PlainsOfEidelon/PlainsOfEidelon.css';

function OrbVallis() {
    const [vallis, setVallis] = useState(null)
    const [, updateState] = useState(null)
    useInterval(() => {
        getData(setVallis, `vallis`)
        updateState({})
    }, 1000)
    return (
        <div>
            {vallis ?
            <div className="wfWorldState worldState">
                <div className='vallis'>
                    <div>Orb Vallis | {vallis.state}</div>
                    {parseTime(timeLeft(vallis.expiry))}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default OrbVallis;
