import { useState } from 'react'
import { getData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import '../WFWorldState/WFWorldState.css'
import '../PlainsOfEidelon/PlainsOfEidelon.css';

function CambionDrift() {
    const [cambion, setCambion] = useState(null)
    useInterval(() => {
        getData(setCambion, `cambion`)
    }, 1000)
    return (
        <div>
            {cambion ?
            <div className="wfWorldState worldState">
                <div className='cambion'>
                    <div>Cambion Drift | {cambion.state}</div>
                    {parseTime(cambion.timeLeft)}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default CambionDrift;
