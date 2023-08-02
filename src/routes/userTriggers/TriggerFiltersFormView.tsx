import { useEffect, useState } from "react";
import { IStatisticFiltersData } from "../../dto/IStatisticFiltersData";
import { IUserTriggerModel } from "../../models/IUserTriggerModel";
import SelectBox from "./FormSelectBox";
import { UserTriggerService } from "../../services/UserTriggerService";
import { IJwtResponse } from "../../dto/IJwtResponse";
import { IRegion } from "../../domain/IRegion";

interface IProps {
    values: IStatisticFiltersData;
    data: IUserTriggerModel;

    validationErrors: string[];

    handleChange: (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => void;

    onSubmit: (event: React.FormEvent) => void;

    userTriggerService: UserTriggerService;

    jwtToken: IJwtResponse | null
    

}

const TriggerFiltersFormView = (props: IProps) => {
    

    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedParish, setSelectedParish] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [parishes, setParishes] = useState([] as IRegion[]);
    const [cities, setCities] = useState([] as IRegion[]);
    const [streets, setStreets] = useState([] as IRegion[]);

    useEffect(() => {
        if (selectedCounty && props.jwtToken != null) {
            props.userTriggerService.fetchChildRegions(selectedCounty, props.jwtToken.token).then(setParishes);
        }
    }, [selectedCounty]);

    useEffect(() => {
        if (selectedParish && props.jwtToken != null) {
            props.userTriggerService.fetchChildRegions(selectedParish, props.jwtToken.token).then(setCities);
        }
    }, [selectedParish]);

    useEffect(() => {
        if (selectedCity && props.jwtToken != null) {
            props.userTriggerService.fetchChildRegions(selectedCity, props.jwtToken.token).then(setStreets);
        }
    }, [selectedCity]);

    if (!props.data.Counties || !props.data.PropertyTypes) {
        return <div>Loading...</div>;
    }

    const handleCountyChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedCounty(target.value);
        props.handleChange(target);
    };

    const handleParishChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedParish(target.value);
        props.handleChange(target);
    };

    const handleCityChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedCity(target.value);
        props.handleChange(target);
    };
    

    return (
    <form id="user-trigger-form" className="filter-form">

        <SelectBox options={props.data.Counties} label="County:" id="countySelect" onChange={handleCountyChange} name="CountySelect" value={props.values.CountySelect || undefined}/>
        <SelectBox options={parishes} label="Parish:" id="parishSelect" onChange={handleParishChange} name="ParishSelect" value={props.values.ParishSelect  || undefined}/>
        <SelectBox options={cities} label="City:" id="citySelect" onChange={handleCityChange} name="CitySelect" value={props.values.CitySelect  || undefined}/>
        <SelectBox options={streets} label="Street:" id="streetSelect" name="StreetSelect" onChange={props.handleChange} value={props.values.StreetSelect || undefined}/>
        <SelectBox options={props.data.TransactionTypes} label="Transaction Type:" id="transactionType" name="TransactionType" onChange={props.handleChange} value={props.values.TransactionType  || undefined}/>
        <SelectBox options={props.data.PropertyTypes} label="Property Type:" id="propertyType" name="PropertyType"  onChange={props.handleChange} value={props.values.PropertyType  || undefined}/>

        <fieldset>
            <legend>Rooms:</legend>
            <label htmlFor="MinRoomsCount" className="form-label">Min: </label>
            <input type="number" id="MinRoomsCount" className="filter-inputs" name="RoomsCountMin" value={props.values.RoomsCountMin || undefined} onChange={(e) => props.handleChange(e.target)}/>
            <span> - </span>
            <label htmlFor="MaxRoomsCount" className="form-label">Max: </label>
            <input type="number" id="MaxRoomsCount" className="filter-inputs" name="RoomsCountMax" value={props.values.RoomsCountMax || undefined} onChange={(e) => props.handleChange(e.target)}/>
        </fieldset>

        <fieldset>
            <legend>Area:</legend>
            <label htmlFor="MinArea" className="form-label">Min: </label>
            <input type="number" id="MinArea" className="filter-inputs" name="AreaMin" value={props.values.AreaMin || undefined} onChange={(e) => props.handleChange(e.target)}/>
            <span> - </span>
            <label htmlFor="MaxArea" className="form-label">Max: </label>
            <input type="number" id="MaxArea" className="filter-inputs" name="AreaMax" value={props.values.AreaMax || undefined} onChange={(e) => props.handleChange(e.target)}/>
        </fieldset>

        <div className="one-filter-box">
            <label htmlFor="TriggerPricePerUnit" className="form-label">Ideal Price/Unit: </label>
            <input type="number" id="TriggerPricePerUnit" name="TriggerPricePerUnit" className="filter-inputs" value={props.values.TriggerPricePerUnit || undefined} onChange={(e) => props.handleChange(e.target)} required/>
        </div>

        <div className="one-filter-box">
            <label htmlFor="TriggerName" className="form-label">Trigger Name: </label>
            <input id="TriggerName" name="TriggerName" className="filter-inputs" value={props.values.TriggerName || undefined} onChange={(e) => props.handleChange(e.target)} required/>
        </div>

        <div className="form-group">
            <button id="triggerButton" onClick={(e) => props.onSubmit(e)} type="submit" className="big-button">Add Trigger</button>
        </div>
    </form>
    );
}

export default TriggerFiltersFormView;