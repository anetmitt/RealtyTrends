import { IBaseEntity } from "./IBaseEntity";

export interface IRegion extends IBaseEntity{
    Name: string
    ParentId: string
}