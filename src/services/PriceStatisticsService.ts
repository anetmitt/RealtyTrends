import { IRegion } from "../domain/IRegion";
import { IStatisticFiltersData } from "../dto/IStatisticFiltersData";
import { IPriceStatisticsModel } from "../models/IPriceStatisticsModel";
import { BaseModelService } from "./BaseModelService";

export class PriceStatisticsService extends BaseModelService<IPriceStatisticsModel>{

    constructor() {
        super("v1/PriceStatistics/");
    }

    async fetchAll(): Promise<IPriceStatisticsModel | undefined> {

        try{
            const response = await this.axios.get<IPriceStatisticsModel>('GetBaseStatisticsFilters',);

            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return;
        }
    }

    async fetchChildRegions(RegionId:string): Promise<IRegion[] | []> {

        try{
            const response = await this.axios.get<IRegion[]>('GetParentRegion/' + RegionId);

            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return [];
        }
    }

    async fetchYearMonths(year: number): Promise<number[] | []> {

        try{
            const response = await this.axios.get<number[]>('GetSelectedYearMonths/' + year.toString());

            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return [];
        }
    }

    async fetchMonthDays(year: number, month: number): Promise<number[] | []> {

        try{
            const response = await this.axios.get<number[]>('GetSelectedMonthDays/' + year.toString() + '/' + month.toString());

            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (e) {

            console.log('error: ', (e as Error).message);
            return [];
        }
    }

    async GetStats(data: IStatisticFiltersData) {

        try{
            const response = await this.axios.post('GetPriceStatistics/',
            data);

            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (e) {
            console.log('error: ', (e as Error));
            console.log('error: ', (e as Error).message);
            return;
        }
    }
}