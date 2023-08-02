import { IBaseEntity } from "./IBaseEntity";
import { IFilter } from "./IFilter";

export interface ITriggerFilter extends IBaseEntity {
    Filter: IFilter
}