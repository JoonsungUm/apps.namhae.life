import { gql } from '@apollo/client'

export const MENU_QUERY = gql`
  query Menu($id: ID!) {
    menu(id: $id) {
      id
      name
      price
      imageUrl
      description
      isLunch
      isDinner
      store {
        id
        name
      }
    }
  }
`
