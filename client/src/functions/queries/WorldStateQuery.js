import { gql } from '@apollo/client'

export default gql`
query GetWorldState($location: String!) {
    getWorldstate(location: $location) {
        state
        expiry
    }
}`