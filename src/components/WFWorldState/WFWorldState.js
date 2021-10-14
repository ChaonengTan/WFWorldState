import { useState } from 'react'
import { WorldState, getAllData} from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import './WFWorldState.css';

function WFWorldState() {
    const [data, setData] = useState(null)
    
    useInterval(() => {getAllData(setData)}, 1000)
    // useEffect(() => {
    //     getAllData()
    // }, []);
    // console.log(data)
    function parseTime(timeLeft) {
        return (
            <div>
                {Math.floor(timeLeft/3600)}h {Math.floor((timeLeft%3600)/60)}m {Math.floor(timeLeft%60)}s
            </div>
        )
    }
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
