import { useState } from 'react'
import WorldState from "../../functions/WorldState";
// import './WFWorldState.css';

function WFWorldState() {
    const [data, setData] = useState(null)
    async function getData() {
        await setData({
            earth: await WorldState('pc', 'earthCycle'),
            cetus: await WorldState('pc', 'cetusCycle'),
            vallis: await WorldState('pc', 'vallisCycle'),
            cambion: await WorldState('pc', 'cambionCycle'),
        })
    }
    getData()
    return (
        <div className="wfWorldState">
            {data ?
            <div>
                <div className='earth'>
                    {data.earth.state}
                    {data.earth.timeLeft}

                    {data.cetus.state}
                    {data.cetus.timeLeft}
                </div>
                <div className='vallis'>
                    {data.vallis.state}
                    {data.vallis.timeLeft}
                </div>
                <div className='cambion'>
                    {data.cambion.state}
                    {data.cambion.timeLeft}
                </div>
            </div> :
            `fetching data`
            }
        </div>
    );
}

export default WFWorldState;
