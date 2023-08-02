import { useContext, useEffect, useState } from "react";
import { JwtContext } from "../Root";
import { UserTriggerService } from "../../services/UserTriggerService";
import { IUserTriggerModel } from "../../models/IUserTriggerModel";
import TriggerFiltersFormView from "./TriggerFiltersFormView";
import { IStatisticFiltersData } from "../../dto/IStatisticFiltersData";
import TriggersView from "./TriggersView";

const UserTriggers = () => {
    const userTriggerService = new UserTriggerService();
    const [validationErrors, setValidationErrors] = useState([] as string[]);
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    const [formData, setFormData] = useState({
        TriggerName: "",
        CountySelect: "",
        ParishSelect: null,
        CitySelect: null,
        StreetSelect: null,
        TransactionType: "",
        PropertyType: "",
        RoomsCountMin: null,
        RoomsCountMax: null,
        PricePerUnitMax: null,
        PricePerUnitMin: null,
        AreaMin: null,
        AreaMax: null,
        TriggerPricePerUnit: null,
        StartDate: formattedDate,
        EndDate: formattedDate
    } as IStatisticFiltersData);

    const handleChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setFormData(prevData => ({
          ...prevData,
          [target.name]: target.value,
        }));
      };
      
    //const history = useHistory();

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!jwtResponse) {//history.push('/login');
            return;}

        await userTriggerService.createTrigger(formData, jwtResponse.token);

        userTriggerService.getAll(jwtResponse.token).then(
            response => {
                if (response) {
                    setData(response as IUserTriggerModel);
                } else {
                    setData({} as IUserTriggerModel);
                }
            }
        )
    };

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);
    const [data, setData] = useState({} as IUserTriggerModel);

    const onDeleteTrigger = async (id: string, event: React.MouseEvent) => {
        event.preventDefault(); 

        if (!jwtResponse) {//history.push('/login');
        return;}

        await userTriggerService.deleteTrigger(id, jwtResponse.token);
        setData(prevData => {
            return {
                ...prevData,
                Triggers: prevData.Triggers.filter(trigger => trigger.Id !== id)
            };
        });
    };

    const onEditTrigger = async (id: string, newPpu: number, event: React.MouseEvent) => {
        event.preventDefault(); 

        if (!jwtResponse) {//history.push('/login');
        return;}

        await userTriggerService.updateTrigger(id, newPpu, jwtResponse.token);
    };

    useEffect(() => {
        if (!jwtResponse) {//history.push('/login');
        return;}

        
        userTriggerService.getAll(jwtResponse.token).then(
            response => {

                if (response) {
                    setData(response as IUserTriggerModel);
                } else {
                    setData({} as IUserTriggerModel);
                }
            }
        )
        
    }, [jwtResponse]);

    return (
        <>
        <h1 className="stat-header">Your Real Estate Price Statistic triggers</h1>
        <div className="trigger-filter-box">
            <div className="filters_container">
                <TriggerFiltersFormView values={formData} data={data} handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors} userTriggerService={userTriggerService}
                jwtToken={jwtResponse}/>
            </div>
        </div>
        <TriggersView triggers={data.Triggers} onDeleteTrigger={onDeleteTrigger} onEditTrigger={onEditTrigger}/>
        </>
    );
}

export default UserTriggers;