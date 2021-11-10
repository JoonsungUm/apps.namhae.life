import { gql } from '@apollo/client'

export const STORES_AVAILABLE_QUERY = gql`
  query StoresAvailable {
    storesAvailable {
      id
      name
      imageUrl
      description
    }
  }
`
