import { gql } from '@apollo/client'

export default gql`
query GetWorldState($location: WFLocation!) {
    getWorldstate(location: $location) {
        state
        timeLeft
    }
}`