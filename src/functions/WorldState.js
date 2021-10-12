export default async function WorldState(platform, location) {
    const path = `https://api.warframestat.us/${platform}/${location}`
    const res = await fetch(path)
    const json = await res.json()
    return json.cod!==200 ? {cod:json.cod, message:json.message} : await json
    
}