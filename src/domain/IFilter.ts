import { IBaseEntity } from "./IBaseEntity";
import { IFilterType } from "./IFilterType";
import { IPropertyType } from "./IPropertyType";
import { IRegion } from "./IRegion";
import { ITransactionType } from "./ITransactionType";

export interface IFilter extends IBaseEntity {
    Value: number | null;
    Region: IRegion | null;
    TransactionType: ITransactionType | null;
    PropertyType: IPropertyType | null;
    FilterType: IFilterType | null;
}