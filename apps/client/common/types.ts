export interface Store {
  id: string
  name: string
  imageUrl: string
  address: string
  phone: string
  description: string
  holidays: string[]
}

export interface Menu {
  id: string
  storeId: string
  name: string
  price: number
  description: string
  imageUrl: string
  isLunch: boolean
  isDinner: boolean
}

export interface Order {
  id: string
  storeId: string
  menuId: string
  description: string
  isInCart: boolean
  isPaid: boolean
  menu: Menu
}
