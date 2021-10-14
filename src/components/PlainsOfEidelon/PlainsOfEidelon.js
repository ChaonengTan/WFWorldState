import { useState } from 'react'
import { getData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import '../WFWorldState/WFWorldState.css'
import './PlainsOfEidelon.css';

function PlainsOfEidelon() {
    const [earth, setEarth] = useState(null)
    const [cetus, setCetus] = useState(null)
    useInterval(() => {
        getData(setEarth, `earth`)
        getData(setCetus, `cetus`)
    }, 1000)
    return (
        <div>
            {earth && cetus ?
            <div className="worldState">
                <div className='earth'>
                    <div>
                        <div>Earth | {earth.state}</div>
                        {parseTime(earth.timeLeft)}
                    </div>
                    <div>
                        <div>Cetus | {cetus.state}</div>
                        {parseTime(cetus.timeLeft)}
                    </div>
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default PlainsOfEidelon;
