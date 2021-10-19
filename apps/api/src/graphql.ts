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

export interface Store {
    id: string;
    name: string;
    imageUrl?: Nullable<string>;
    address: string;
    phone: string;
    description?: Nullable<string>;
    holidays?: Nullable<Nullable<Holiday>[]>;
}

export interface IQuery {
    stores(): Nullable<Nullable<Store>[]> | Promise<Nullable<Nullable<Store>[]>>;
    store(id: string): Nullable<Store> | Promise<Nullable<Store>>;
}

type Nullable<T> = T | null;
