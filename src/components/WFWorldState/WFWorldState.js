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
                const currentTime = new Date().getSeconds()
                const timeLeftArr = loc.timeLeft.split(' ').map(time => {
                    return time.match(/\d/g).join('')
                }).reverse()
                // console.log(`${loc.id}: `+timeLeftArr)
                switch(timeLeftArr.length) {
                    case 1:
                        timeLeftArr[0] = timeLeftArr[0]-currentTime
                        break
                    case 2:
                        if (timeLeftArr[0]-currentTime<0) {
                            timeLeftArr[1] = timeLeftArr[1]-1
                            timeLeftArr[0] = parseInt(timeLeftArr[0])+60
                        }
                        timeLeftArr[0] = timeLeftArr[0]-currentTime
                        break
                    case 3:
                        if (timeLeftArr[0]-currentTime<0) {
                            if (timeLeftArr[1]-1<0) {
                                timeLeftArr[2] = timeLeftArr[2]-1
                                timeLeftArr[1] = parseInt(timeLeftArr[1])+60
                            }
                            timeLeftArr[1] = timeLeftArr[1]-1
                            timeLeftArr[0] = parseInt(timeLeftArr[0])+60
                        }
                        timeLeftArr[0] = timeLeftArr[0]-currentTime
                        break
                }
                // console.log(`${loc.id}|POST: `+timeLeftArr)
                loc.timeLeft = timeLeftArr.reverse()
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
    function displayTime(timeArr) {
        return (
            <div>
                {timeArr.length === 3 && <div>{timeArr[0]}h {timeArr[1]}m {timeArr[2]}s</div>}
                {timeArr.length === 2 && <div>{timeArr[0]}m {timeArr[1]}s</div>}
                {timeArr.length === 1 && <div>{timeArr[0]}s</div>}
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
                        {displayTime(data.earth.timeLeft)}
                    </div>
                    <div>
                        cetus:
                        {data.cetus.state}
                        {displayTime(data.cetus.timeLeft)}
                    </div>
                </div>
                <div className='vallis'>
                    orbVallis:
                    {data.vallis.state}
                    {displayTime(data.vallis.timeLeft)}
                </div>
                <div className='cambion'>
                    cambionDrift:
                    {data.cambion.active}
                    {displayTime(data.cambion.timeLeft)}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default WFWorldState;
