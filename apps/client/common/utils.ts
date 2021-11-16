import { subHours } from 'date-fns'
import { Order, Menu } from './types'
import { BREAK_TIME, RECENT_ORDER_THRESHOLD } from './const'

export const isMenuAvailable = (menu: Menu): boolean => {
  const currentTime = new Date().getHours()

  if (currentTime < BREAK_TIME) {
    return menu.isLunch
  } else {
    return menu.isDinner
  }
}

export const isRecentOrder = (order: Order): boolean => {
  return (
    subHours(new Date(), RECENT_ORDER_THRESHOLD) < new Date(order.createdAt)
  )
}

export const wait = (timeToDelay: number) => {
  new Promise((resolve) => setTimeout(resolve, timeToDelay))
}
