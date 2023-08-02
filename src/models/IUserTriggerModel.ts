import { IPropertyType } from "../domain/IPropertyType";
import { IRegion } from "../domain/IRegion";
import { ITransactionType } from "../domain/ITransactionType";
import { ITrigger } from "../domain/ITrigger";

export interface IUserTriggerModel {
    Triggers: ITrigger[]
    Counties: IRegion[]
    PropertyTypes: IPropertyType[]
    TransactionTypes: ITransactionType[]
}