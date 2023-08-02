import { IBaseEntity } from "./IBaseEntity";
import { ITriggerFilter } from "./ITriggerFilter";


export interface ITrigger extends IBaseEntity {

    Name: string;
    BeginningSquareMeterPrice: number;
    UserSquareMeterPrice: number;
    CurrentSquareMeterPrice: number;
    TriggerBirthDate: Date;
    TriggerFilters: ITriggerFilter[];
}