import { gql } from '@apollo/client'

export const STORE_QUERY = gql`
  query Store($id: ID!) {
    store(id: $id) {
      id
      name
      description
      imageUrl
      address
      phone
      menus {
        id
        storeId
        name
        price
        imageUrl
        description
        isLunch
        isDinner
      }
    }
  }
`
