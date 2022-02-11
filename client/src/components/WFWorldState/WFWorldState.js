import { useState } from 'react'
import { getAllData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import timeLeft from '../timeLeft';
import './WFWorldState.css';

function WFWorldState() {
    const [data, setData] = useState(null)
    const [, updateState] = useState(null)
    useInterval(() => {
        getAllData(setData)
        updateState({})
    }, 1000)
    return (
        <div>
            {data ?
            <div className="wfWorldState">
                <div className='earth'>
                    <div>
                        <div>Earth | {data.earth.state}</div>
                        {parseTime(timeLeft(data.earth.expiry))}
                    </div>
                    <div>
                        <div>Cetus | {data.cetus.state}</div>
                        {parseTime(timeLeft(data.cetus.expiry))}
                    </div>
                </div>
                <div className='vallis'>
                    <div>Orb Vallis | {data.vallis.state}</div>
                    {parseTime(timeLeft(data.vallis.expiry))}
                </div>
                <div className='cambion'>
                    <div>Cambion Drift | {data.cambion.active}</div>
                    {parseTime(timeLeft(data.cambion.expiry))}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default WFWorldState;
