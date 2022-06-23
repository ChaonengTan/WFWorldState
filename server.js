// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const cors = require('cors')
const path = require('path')
require('dotenv').config()

// schema
const schema = buildSchema(`
    scalar JSON
    type Worldstate {
        activation: String!
        expiry: String!
        id: String!
        state: String!
        timeLeft: Float!
    }
    enum WFLocation {
        cetusCycle
        earthCycle
        vallisCycle
        cambionCycle
    }
    type Query {
        getWorldstate(location: WFLocation!): Worldstate!
    }
`)

// resolvers
const root = {
    getWorldstate: async (location) => {
        // fetch
        const url = (location) => `https://api.warframestat.us/pc/${location.location}`
        const res = await fetch(url(location))
        const json = await res.json()

        // standard returns
        const activation = json.activation
        const expiry = json.expiry
        const id = json.id
        const state = json.state ? json.state : json.active

        // timeLeft
        const currentTime = new Date()
        const expTime = new Date(expiry)
        const timeLeft = (expTime-currentTime)/1000
        return { activation, expiry, id, state, timeLeft }
    }
}

// app
const app = express()
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors())
// route
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

// start
const port = process.env.PORT || 4000 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})
app.listen(port, () => {
    console.log('Running on port:'+port)
    console.log(`http://localhost:${port}/graphql`)
})