import { useState, useEffect } from 'react'
import WorldState from "../../functions/WorldState";
import useInterval from '../../functions/useInterval';
import './WFWorldState.css';

function WFWorldState() {
    const [data, setData] = useState(null)
    async function getData() {
        const earth = await WorldState('pc', 'earthCycle')
        const cetus = await WorldState('pc', 'cetusCycle')
        const vallis = await WorldState('pc', 'vallisCycle')
        const cambion = await WorldState('pc', 'cambionCycle')
        Promise.all([earth, cetus, vallis, cambion]).then(() => {
            cambion.timeLeft = cetus.timeLeft
        }).then(() => {
            [earth, cetus, vallis, cambion].forEach(loc => {
                const currentTime = new Date()
                const expTime = new Date(loc.expiry)
                loc.timeLeft = (expTime-currentTime)/1000
                // console.log(`difference: ${(expTime-currentTime)/1000}s`)
            })
        }).then(() => {
            setData({earth,cetus,vallis,cambion})
        })
    }
    // useInterval(getData, 1000)
    useEffect(() => {
        getData()
    }, []);
    console.log(data)
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
                        earth:
                        {data.earth.state}
                        {parseTime(data.earth.timeLeft)}
                    </div>
                    <div>
                        cetus:
                        {data.cetus.state}
                        {parseTime(data.cetus.timeLeft)}
                    </div>
                </div>
                <div className='vallis'>
                    orbVallis:
                    {data.vallis.state}
                    {parseTime(data.vallis.timeLeft)}
                </div>
                <div className='cambion'>
                    cambionDrift:
                    {data.cambion.active}
                    {parseTime(data.cambion.timeLeft)}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default WFWorldState;
