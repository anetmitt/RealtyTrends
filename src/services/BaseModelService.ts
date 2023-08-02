import { BaseService } from "./BaseService";

export abstract class BaseModelService<TModel> extends BaseService{

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getAll(jwt: string): Promise<TModel | undefined> {

        try{
            const response = await this.axios.get<TModel>('',
            {
                headers: {
                    Authorization: 'Bearer ' + jwt
                }
            });

            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return;
        }
    }
}