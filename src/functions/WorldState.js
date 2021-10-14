async function WorldState(platform, location) {
    const path = `https://api.warframestat.us/${platform}/${location}`
    const res = await fetch(path)
    const json = await res.json()
    return json.error ? {cod:json.code, message:json.error} : await json
}
async function getAllData(setData) {
    const earth = await WorldState('pc', 'earthCycle')
    const cetus = await WorldState('pc', 'cetusCycle')
    const vallis = await WorldState('pc', 'vallisCycle')
    const cambion = await WorldState('pc', 'cambionCycle')
    Promise.all([earth, cetus, vallis, cambion]).then(() => {
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
async function getData(setData, loc) {
    const location = await WorldState('pc', `${loc}Cycle`)
    Promise(location).then(() => {
        // Manually calculates time left from expiryTime-currentTime
        const currentTime = new Date()
        const expTime = new Date(location.expiry)
        location.timeLeft = (expTime-currentTime)/1000
    }).then(() => {
        // Capitalizes states ie. day, warm, fass
        if (location.state) {
            location.state = location.state.charAt(0).toUpperCase() + location.state.slice(1)
        } else {
            location.active = location.active.charAt(0).toUpperCase() + location.active.slice(1)
        }
    }).then(() => {
        setData(location)
    })
}
export {
    WorldState,
    getAllData,
    getData,
}