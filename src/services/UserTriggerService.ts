import { IRegion } from "../domain/IRegion";
import { IStatisticFiltersData } from "../dto/IStatisticFiltersData";
import { IUserTriggerModel } from "../models/IUserTriggerModel";
import { BaseModelService } from "./BaseModelService";

export class UserTriggerService extends BaseModelService<IUserTriggerModel>{

    constructor() {
        super("v1/UserTriggers/");
    }

    async fetchChildRegions(RegionId:string, jwt: string): Promise<IRegion[] | []> {

        try{
            const response = await this.axios.get<IRegion[]>(RegionId,
            {
                headers: {
                    Authorization: 'Bearer ' + jwt
                }
            });

            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return [];
        }
    }

    async deleteTrigger(TriggerId:string, jwt: string) {

        try{
            const response = await this.axios.delete(TriggerId,
            {
                headers: {
                    Authorization: 'Bearer ' + jwt
                }
            });

            if (response.status === 200) {
                return;
            }
            return;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return;
        }
    }

    async updateTrigger(TriggerId:string, newPpu: number, jwt: string) {

        try{
            const response = await this.axios.put(TriggerId +"/" + newPpu,
            '',
            {
                headers: {
                    Authorization: 'Bearer ' + jwt
                }
            });

            if (response.status === 200) {
                return;
            }
            return;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return;
        }
    }

    async createTrigger(data: IStatisticFiltersData, jwt: string) {

        try{
            const response = await this.axios.post('',
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + jwt
                }
            });

            if (response.status === 200) {
                return;
            }
            return;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return;
        }
    }
}