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
            setData({earth,cetus,vallis,cambion})
        })
    }
    useInterval(getData, 1000)
    // useEffect(() => {
    //     getData()
    // }, []);
    console.log(data)
    return (
        <div>
            {data ?
            <div className="wfWorldState">
                <div className='earth'>
                    <div>
                        earth:
                        {data.earth.state}
                        {data.earth.timeLeft}
                    </div>
                    <div>
                        cetus:
                        {data.cetus.state}
                        {data.cetus.timeLeft}
                    </div>
                </div>
                <div className='vallis'>
                    orbVallis:
                    {data.vallis.state}
                    {data.vallis.timeLeft}
                </div>
                <div className='cambion'>
                    cambionDrift:
                    {data.cambion.active}
                    {/* {data.cambion.timeLeft} */}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default WFWorldState;
