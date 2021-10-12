export default class WorldState {
    constructor(platform, location) {
        this.path = `https://api.warframestat.us/${platform}/${location}`
    }
    async start() {
        const res = await fetch(this.path)
        return await res.json()
    }
}