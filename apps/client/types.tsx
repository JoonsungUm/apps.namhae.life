export interface Store {
  id: string
  name: string
  image: string
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
  image: string
  isLunch: boolean
  isDinner: boolean
}
