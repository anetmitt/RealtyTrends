import { useEffect, useState } from "react";
import { IStatisticFiltersData } from "../../dto/IStatisticFiltersData";
import { IJwtResponse } from "../../dto/IJwtResponse";
import { IRegion } from "../../domain/IRegion";
import SelectBox from "../userTriggers/FormSelectBox";
import { IPriceStatisticsModel } from "../../models/IPriceStatisticsModel";
import DateSelectBox from "./DateSelectBox";
import { PriceStatisticsService } from "../../services/PriceStatisticsService";
import { Console } from "console";

interface IProps {
    values: IStatisticFiltersData;
    data: IPriceStatisticsModel;

    validationErrors: string[];

    handleChange: (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => void;

    onSubmit: (event: React.FormEvent) => void;

    priceStatisticsService: PriceStatisticsService;

    jwtToken: IJwtResponse | null


}

const StatisticFormView = (props: IProps) => {


    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedParish, setSelectedParish] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [parishes, setParishes] = useState([] as IRegion[]);
    const [cities, setCities] = useState([] as IRegion[]);
    const [streets, setStreets] = useState([] as IRegion[]);

    const [selectedFromYear, setSelectedFromYear] = useState(0);
    const [selectedFromMonths, setSelectedFromMonths] = useState(0);
    const [SelectedFromDays, setSelectedFromDays] = useState(0);
    const [selectedToYear, setSelectedToYear] = useState(0);
    const [selectedToMonths, setSelectedToMonths] = useState(0);
    const [selectedToDays, setSelectedToDays] = useState(0);

    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');

    const [fromMonths, setFromMonths] = useState([] as number[]);
    const [fromDays, setFromDays] = useState([] as number[]);
    const [ToMonths, setToMonths] = useState([] as number[]);
    const [ToDays, setToDays] = useState([] as number[]);

    useEffect(() => {
        if (selectedCounty) {
            props.priceStatisticsService.fetchChildRegions(selectedCounty).then(setParishes);
        }
    }, [selectedCounty]);

    useEffect(() => {
        if (selectedParish) {
            props.priceStatisticsService.fetchChildRegions(selectedParish).then(setCities);
        }
    }, [selectedParish]);

    useEffect(() => {
        if (selectedCity) {
            props.priceStatisticsService.fetchChildRegions(selectedCity).then(setStreets);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedFromYear) {
            props.priceStatisticsService.fetchYearMonths(selectedFromYear)
                .then(setFromMonths);
        }
    }, [selectedFromYear]);

    useEffect(() => {
        if (selectedFromMonths) {
            props.priceStatisticsService.fetchMonthDays(selectedFromYear, selectedFromMonths)
                .then(setFromDays);
        }
    }, [selectedFromMonths]);

    useEffect(() => {
       if (selectedToYear) {
            props.priceStatisticsService.fetchYearMonths(selectedToYear)
                .then(setToMonths);
        }
    }, [selectedToYear]);

    useEffect(() => {
        if (selectedToMonths) {
             props.priceStatisticsService.fetchMonthDays(selectedToYear, selectedToMonths)
                 .then(setToDays);
         }
     }, [selectedToMonths]);

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

    const handleFromYearChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedFromYear(parseInt(target.value));
        props.handleChange(target);
    };

    const handleFromMonthChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedFromMonths(parseInt(target.value));
        props.handleChange(target);
    };

    const handleFromDayChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedFromDays(parseInt(target.value));
        props.handleChange(target);
      };

    const handleToYearChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedToYear(parseInt(target.value));
        props.handleChange(target);
    };

    const handleToMonthChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedToMonths(parseInt(target.value));
        props.handleChange(target);
    };

    const handleToDayChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
        setSelectedToDays(parseInt(target.value));
        props.handleChange(target);
      };
      
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formattedFromYear = selectedFromYear.toString().padStart(4, '0');
        const formattedFromMonth = selectedFromMonths.toString().padStart(2, '0');
        const formattedFromDay = SelectedFromDays.toString().padStart(2, '0');
      
        const startDate = `${formattedFromYear}/${formattedFromMonth}/${formattedFromDay}`;
        props.values.StartDate = startDate;
        
        if (selectedToYear === 0) {
            const currentDate = new Date();
            const year = currentDate.getFullYear().toString();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}/${month}/${day}`;
            props.values.EndDate = formattedDate;
        } else {
            const endYear = selectedToYear.toString().padStart(2, '0');
            const endMonth = selectedToMonths.toString().padStart(2, '0');
            const endDay = selectedToDays.toString().padStart(2, '0');
            const endDate = `${endYear}/${endMonth}/${endDay}`;
            props.values.EndDate = endDate;
        }
      
        // Submit the form
        props.onSubmit(event);
      };
      


    return (
        <form id="user-trigger-form" className="filter-form">

            <SelectBox options={props.data.Counties} label="County:" id="countySelect" onChange={handleCountyChange} name="CountySelect" value={props.values.CountySelect || undefined} />
            <SelectBox options={parishes} label="Parish:" id="parishSelect" onChange={handleParishChange} name="ParishSelect" value={props.values.ParishSelect || undefined} />
            <SelectBox options={cities} label="City:" id="citySelect" onChange={handleCityChange} name="CitySelect" value={props.values.CitySelect || undefined} />
            <SelectBox options={streets} label="Street:" id="streetSelect" name="StreetSelect" onChange={props.handleChange} value={props.values.StreetSelect || undefined} />
            <SelectBox options={props.data.TransactionTypes} label="Transaction Type:" id="transactionType" name="TransactionType" onChange={props.handleChange} value={props.values.TransactionType || undefined} />
            <SelectBox options={props.data.PropertyTypes} label="Property Type:" id="propertyType" name="PropertyType" onChange={props.handleChange} value={props.values.PropertyType || undefined} />
            
            <DateSelectBox options={props.data.Years} label="From Year:" id="startYear"name="startYear" onChange={handleFromYearChange} value={selectedFromYear}/>
            <DateSelectBox options={fromMonths} label="From Month:" id="startMonth" name="startMonth" onChange={handleFromMonthChange} value={selectedFromMonths}/>
            <DateSelectBox options={fromDays} label="From Day:" id="startDay" name="startDay" onChange={handleFromDayChange} value={SelectedFromDays} />

            <DateSelectBox options={props.data.Years} label="To Year:" id="endYear"name="endYear" onChange={handleToYearChange} value={selectedToYear}/>
            <DateSelectBox options={fromMonths} label="To Month:" id="endMonth" name="endMonth"onChange={handleToMonthChange} value={selectedToMonths}/>
            <DateSelectBox options={fromDays} label="To Day:" id="endDay" name="endDay" onChange={handleToDayChange} value={selectedToDays} />

            <fieldset>
                <legend>Rooms:</legend>
                <label htmlFor="MinRoomsCount" className="form-label">Min: </label>
                <input type="number" id="MinRoomsCount" className="filter-inputs" name="RoomsCountMin" value={props.values.RoomsCountMin || undefined} onChange={(e) => props.handleChange(e.target)} />
                <span> - </span>
                <label htmlFor="MaxRoomsCount" className="form-label">Max: </label>
                <input type="number" id="MaxRoomsCount" className="filter-inputs" name="RoomsCountMax" value={props.values.RoomsCountMax || undefined} onChange={(e) => props.handleChange(e.target)} />
            </fieldset>

            <fieldset>
                <legend>Area:</legend>
                <label htmlFor="MinArea" className="form-label">Min: </label>
                <input type="number" id="MinArea" className="filter-inputs" name="AreaMin" value={props.values.AreaMin || undefined} onChange={(e) => props.handleChange(e.target)} />
                <span> - </span>
                <label htmlFor="MaxArea" className="form-label">Max: </label>
                <input type="number" id="MaxArea" className="filter-inputs" name="AreaMax" value={props.values.AreaMax || undefined} onChange={(e) => props.handleChange(e.target)} />
            </fieldset>

            <fieldset>
                <legend>Price Per Unit:</legend>
                <label htmlFor="MinPricePerUnit" className="form-label">Min: </label>
                <input type="number" id="MinPricePerUnit" className="filter-inputs" />
                <span> - </span>
                <label htmlFor="MaxPricePerUnit" className="form-label">Max: </label>
                <input type="number" id="MaxPricePerUnit" className="filter-inputs" />
            </fieldset>

            <div className="form-group">
                <button id="submitButton" onClick={onSubmit} type="submit" className="big-button">Get Stats</button>
            </div>
        </form>
    );
}

export default StatisticFormView;