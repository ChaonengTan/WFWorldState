import { useState } from 'react'
import { getAllData } from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import parseTime from '../parseTime';
import './WFWorldState.css';

function WFWorldState() {
    const [data, setData] = useState(null)
    useInterval(() => {getAllData(setData)}, 1000)
    // useEffect(() => {
    //     getAllData()
    // }, []);
    // console.log(data)
    return (
        <div>
            {data ?
            <div className="wfWorldState">
                <div className='earth'>
                    <div>
                        <div>Earth | {data.earth.state}</div>
                        {parseTime(data.earth.timeLeft)}
                    </div>
                    <div>
                        <div>Cetus | {data.cetus.state}</div>
                        {parseTime(data.cetus.timeLeft)}
                    </div>
                </div>
                <div className='vallis'>
                    <div>Orb Vallis | {data.vallis.state}</div>
                    {parseTime(data.vallis.timeLeft)}
                </div>
                <div className='cambion'>
                    <div>Cambion Drift | {data.cambion.active}</div>
                    {parseTime(data.cambion.timeLeft)}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default WFWorldState;
