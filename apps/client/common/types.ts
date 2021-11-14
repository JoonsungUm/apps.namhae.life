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
  store: Store
}

export const ORDER_STATUS = {
  SELECT_DONE: 'SELECT_DONE',
  ORDER_DONE: 'ORDER_DONE',
  ORDER_CANCEL: 'ORDER_CANCEL',
  COOK_DONE: 'COOK_DONE',
  DELIVERY_DONE: 'DELIVERY_DONE',
  PAYMENT_DONE: 'PAYMENT_DONE',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const
export type ORDER_STATUS = typeof ORDER_STATUS[keyof typeof ORDER_STATUS]

export interface Order {
  id: string
  storeId: string
  menuId: string
  description: string
  isInCart: boolean
  isPaid: boolean
  menu: Menu
  status: ORDER_STATUS
  createdAt: number
  updatedAt: number
}
