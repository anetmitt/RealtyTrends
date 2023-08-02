export interface IStatisticFiltersData {
    TriggerName: string | null;
    CountySelect: string | null;
    ParishSelect: string | null;
    CitySelect: string | null;
    StreetSelect: string | null;
    TransactionType: string | null;
    PropertyType: string | null;
    RoomsCountMin: number | null;
    RoomsCountMax: number | null;
    PricePerUnitMax: number | null;
    PricePerUnitMin: number | null;
    AreaMin: number | null;
    AreaMax: number | null;
    TriggerPricePerUnit: number | null;
    StartDate: string | null;
    EndDate: string | null;
}
