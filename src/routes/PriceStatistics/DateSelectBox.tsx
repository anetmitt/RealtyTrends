import React from 'react';

interface ISelectBoxProps {
    options: number[];
    label: string;
    id: string;
    value?: number;
    name: string
    onChange?: (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => void;
}

const SelectBox: React.FC<ISelectBoxProps> = ({options, label, id, onChange, name}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) onChange(event.target);
    };
    
    return (
        <div className="one-filter-box">
            <label htmlFor={id} className="form-label">{label}</label>
            <select id={id} className="form-select select-auto-width filter-inputs" onChange={handleChange} name={name}>
                <option value=""></option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectBox;
