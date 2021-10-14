import { useState } from 'react'
import { getData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import '../WFWorldState/WFWorldState.css'
import '../PlainsOfEidelon/PlainsOfEidelon.css';

function OrbVallis() {
    const [vallis, setVallis] = useState(null)
    useInterval(() => {
        getData(setVallis, `vallis`)
    }, 1000)
    return (
        <div>
            {vallis ?
            <div className="worldState">
                <div className='vallis'>
                    <div>Orb Vallis | {vallis.state}</div>
                    {parseTime(vallis.timeLeft)}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default OrbVallis;
