import { gql } from '@apollo/client'
import { client } from '../index'

async function WorldState(platform, location) {
    try {
        const json = await client.query({
            query: gql`
                query {
                    getWorldstate(location: ${location}) {
                        state
                        timeLeft
                    }
                }`
        })
        console.log(json.data.getWorldstate.timeLeft)
        return json.data.getWorldstate
    } catch(err) {
        return err.message
    }
}
async function getAllData(setData) {
    const earth = await WorldState('pc', 'earthCycle')
    const cetus = await WorldState('pc', 'cetusCycle')
    const vallis = await WorldState('pc', 'vallisCycle')
    const cambion = await WorldState('pc', 'cambionCycle')
    Promise.all([earth, cetus, vallis, cambion]).then(() => {
        setData({earth,cetus,vallis,cambion})
    })
}
async function getData(setData, loc) {
    const location = await WorldState('pc', `${loc}Cycle`)
    Promise.all([location]).then(() => {
        setData(location)
    })
}
export {
    WorldState,
    getAllData,
    getData,
}