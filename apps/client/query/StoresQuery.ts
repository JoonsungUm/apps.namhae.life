import { gql } from '@apollo/client'

export const STORES_QUERY = gql`
  query Stores {
    stores {
      id
      name
      imageUrl
      description
    }
  }
`
