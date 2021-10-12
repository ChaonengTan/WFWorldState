export default class WorldState {
    constructor(platform, location) {
        this.path = `https://api.warframestat.us/${this.platform}/${this.location}`
        this.platform = platform
        this.location = location
    }
    async start() {
        return await fetch(this.path).then(res => res.json)
    }
}