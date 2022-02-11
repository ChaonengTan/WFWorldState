import { useState } from 'react'
import { getData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import timeLeft from '../timeLeft';
import '../WFWorldState/WFWorldState.css'
import '../PlainsOfEidelon/PlainsOfEidelon.css';

function CambionDrift() {
    const [cambion, setCambion] = useState(null)
    const [, updateState] = useState(null)
    useInterval(() => {
        getData(setCambion, `cambion`)
        updateState({})
    }, 1000)
    return (
        <div>
            {cambion ?
            <div className="wfWorldState worldState">
                <div className='cambion'>
                    <div>Cambion Drift | {cambion.state}</div>
                    {parseTime(timeLeft(cambion.expiry))}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default CambionDrift;
