import { useState } from 'react'
import WorldState from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import './WFWorldState.css';

function WFWorldState() {
    const [data, setData] = useState(null)
    async function getAllData(setData) {
        const earth = await WorldState('pc', 'earthCycle')
        const cetus = await WorldState('pc', 'cetusCycle')
        const vallis = await WorldState('pc', 'vallisCycle')
        const cambion = await WorldState('pc', 'cambionCycle')
        Promise.all([earth, cetus, vallis, cambion]).then(() => {
            // Gives cambionDrift a timeLeft attribute
            cambion.timeLeft = cetus.timeLeft
        }).then(() => {
            // Manually calculates time left from expiryTime-currentTime
            [earth, cetus, vallis, cambion].forEach(loc => {
                const currentTime = new Date()
                const expTime = new Date(loc.expiry)
                loc.timeLeft = (expTime-currentTime)/1000
                // console.log(`difference: ${(expTime-currentTime)/1000}s`)
            })
        }).then(() => {
            // Capitalizes states ie. day, warm, fass
            [earth, cetus, vallis].forEach(loc => {
                loc.state = loc.state.charAt(0).toUpperCase() + loc.state.slice(1)
            })
            cambion.active = cambion.active.charAt(0).toUpperCase() + cambion.active.slice(1)
        }).then(() => {
            setData({earth,cetus,vallis,cambion})
        })
    }
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
