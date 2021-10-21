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
  name: string
  price: number
  description: string
  imageUrl: string
  isLunch: boolean
  isDinner: boolean
}
