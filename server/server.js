// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const cors = require('cors')

// schema
const schema = buildSchema(`
    scalar JSON
    type WorldState {
        earth: JSON
        cetus: JSON
        cambion: JSON
        vallis: JSON
    }
    type Query {
        getWF: WorldState!
    }
`)

// resolvers
const root = {
    getWF: async () => {
        const url = place => `https://api.warframestat.us/pc/${place}`
        const earthUrl = url('earthCycle'), cetusUrl = url('vallisCycle'), cambionUrl = url('cambionCycle'), vallisUrl = url('vallisCycle')
        const earthRes = await fetch(earthUrl), cetusRes = await fetch(cetusUrl), cambionRes = await fetch(cambionUrl), vallisRes = await fetch(vallisUrl)
        const earth = await earthRes.json(), cetus = await cetusRes.json(), cambion = await cambionRes.json(), vallis = await vallisRes.json()
        // console.log(json)
        return { earth, cetus, cambion, vallis }
    }
}

// app
const app = express()

app.use(cors())
// route
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

// start
const port = 4000
app.listen(port, () => {
    console.log('Running on port:'+port)
    console.log(`http://localhost:${port}/graphql`)
})