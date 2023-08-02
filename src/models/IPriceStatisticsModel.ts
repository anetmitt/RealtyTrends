import { IPropertyType } from "../domain/IPropertyType";
import { IRegion } from "../domain/IRegion";
import { ITransactionType } from "../domain/ITransactionType";

export interface IPriceStatisticsModel {
    Counties: IRegion[];
    PropertyTypes: IPropertyType[];
    TransactionTypes: ITransactionType[];
    Years: number[];
}