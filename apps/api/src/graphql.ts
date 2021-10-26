
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Holiday {
    SUN = "SUN",
    MON = "MON",
    TUE = "TUE",
    THU = "THU",
    FRI = "FRI",
    SAT = "SAT",
    UNKNOWN = "UNKNOWN"
}

export interface MenuCreateInput {
    storeId: string;
    name: string;
    price: number;
    description?: Nullable<string>;
    imageUrl?: Nullable<string>;
    isLunch: boolean;
    isDinner: boolean;
}

export interface MenuUpdateInput {
    id: string;
    storeId?: Nullable<string>;
    name?: Nullable<string>;
    price?: Nullable<number>;
    description?: Nullable<string>;
    imageUrl?: Nullable<string>;
    isLunch?: Nullable<boolean>;
    isDinner?: Nullable<boolean>;
}

export interface OrderCreateInput {
    storeId?: Nullable<string>;
    menuId: string;
    userId?: Nullable<string>;
    description?: Nullable<string>;
    isInCart: boolean;
    isPaid: boolean;
}

export interface OrderUpdateInput {
    id: string;
    storeId?: Nullable<string>;
    menuId?: Nullable<string>;
    userId?: Nullable<string>;
    description?: Nullable<string>;
    isInCart?: Nullable<boolean>;
    isPaid?: Nullable<boolean>;
}

export interface StoreCreateInput {
    name: string;
    imageUrl?: Nullable<string>;
    address: string;
    phone: string;
    description?: Nullable<string>;
    holidays?: Nullable<Nullable<Holiday>[]>;
    isVisible?: Nullable<boolean>;
}

export interface StoreUpdateInput {
    id: string;
    name?: Nullable<string>;
    imageUrl?: Nullable<string>;
    address?: Nullable<string>;
    phone?: Nullable<string>;
    description?: Nullable<string>;
    holidays?: Nullable<Nullable<Holiday>[]>;
    isVisible?: Nullable<boolean>;
}

export interface Menu {
    id: string;
    storeId: string;
    name: string;
    price: number;
    description?: Nullable<string>;
    imageUrl?: Nullable<string>;
    isLunch: boolean;
    isDinner: boolean;
}

export interface IQuery {
    menus(): Nullable<Nullable<Menu>[]> | Promise<Nullable<Nullable<Menu>[]>>;
    menusByStore(storeId: string): Nullable<Nullable<Menu>[]> | Promise<Nullable<Nullable<Menu>[]>>;
    menu(id: string): Nullable<Menu> | Promise<Nullable<Menu>>;
    orders(): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;
    ordersByStore(storeId: string): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;
    ordersByUser(userId: string): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;
    order(id: string): Nullable<Order> | Promise<Nullable<Order>>;
    stores(): Nullable<Nullable<Store>[]> | Promise<Nullable<Nullable<Store>[]>>;
    store(id: string): Nullable<Store> | Promise<Nullable<Store>>;
}

export interface IMutation {
    menuCreate(menuCreateInput: MenuCreateInput): Nullable<Menu> | Promise<Nullable<Menu>>;
    menuUpdate(menuUpdateInput: MenuUpdateInput): Nullable<Menu> | Promise<Nullable<Menu>>;
    menuDelete(id: string): Nullable<Menu> | Promise<Nullable<Menu>>;
    orderCreate(orderCreateInput: OrderCreateInput): Nullable<Order> | Promise<Nullable<Order>>;
    orderUpdate(orderUpdateInput: OrderUpdateInput): Nullable<Order> | Promise<Nullable<Order>>;
    orderDelete(id: string): Nullable<Order> | Promise<Nullable<Order>>;
    storeCreate(storeCreateInput: StoreCreateInput): Nullable<Store> | Promise<Nullable<Store>>;
    storeUpdate(storeUpdateInput: StoreUpdateInput): Nullable<Store> | Promise<Nullable<Store>>;
    storeDelete(id: string): Nullable<Store> | Promise<Nullable<Store>>;
}

export interface Order {
    id: string;
    storeId?: Nullable<string>;
    menuId: string;
    userId?: Nullable<string>;
    description?: Nullable<string>;
    isInCart: boolean;
    isPaid: boolean;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    menu?: Nullable<Menu>;
}

export interface Store {
    id: string;
    name: string;
    imageUrl?: Nullable<string>;
    address: string;
    phone: string;
    description?: Nullable<string>;
    holidays?: Nullable<Nullable<Holiday>[]>;
    isVisible: boolean;
    menus?: Nullable<Nullable<Menu>[]>;
}

type Nullable<T> = T | null;
