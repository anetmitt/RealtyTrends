import { useState } from "react";
import { ITrigger } from "../../domain/ITrigger";

interface IProps {
    triggers?: ITrigger[];
    onDeleteTrigger: (id: string, event: React.MouseEvent) => Promise<void>;
    onEditTrigger: (id: string, newPpu: number, event: React.MouseEvent) => Promise<void>;
}

const TriggersView = (props: IProps) => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedTriggerId, setSelectedTriggerId] = useState("");
    const [ppu, setPpu] = useState(0);

    const handlePpuValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPpu(Number(event.target.value));
    };

    const handleEditPPU = (triggerId: string) => {
        setShowFormModal(true);
        setSelectedTriggerId(triggerId);
    };

    const handleSubmitFormModal = () => {
        // Handle form submission logic here
        setShowFormModal(false); // Hide the form modal after submission
    };

    if (!props.triggers) return (<div className="user-triggers"></div>);
    return (
        <>

            <div className="user-triggers">
                {props.triggers.map(item => (
                    <div className="trigger-body user-trigger-box w-50" id={`wrap-${item.Id}`} key={item.Id}>
                        <div className="quote-box page-font">
                            <div className="trigger-box-data">
                                <form method="post" className="delete-user-trigger" id={item.Id} data-trigger-id={item.Id}>
                                    <button type="submit" className="deleteButton btn-close custom-close-btn" aria-label="Close" onClick={(event) => props.onDeleteTrigger(item.Id!, event)}></button>
                                </form>
                                <h1 className="card-title">{item.Name}</h1>
                                <span>Ideal PPU: {item.UserSquareMeterPrice} €</span>
                                <br />
                                <span>Current PPU: {item.BeginningSquareMeterPrice} €</span>
                            </div>
                            <hr />
                            <h5>Filters: </h5>
                            <div className="filter-tags-box">
                                {item.TriggerFilters.map(filter => (
                                    <div className="filter-tag" key={filter.Id}>
                                        {filter.Filter.FilterType!.Name === "County" && filter.Filter.Region && <span className="card-text">{filter.Filter.Region.Name}</span>}
                                        {filter.Filter.FilterType!.Name === "Parish" && filter.Filter.Region && <span className="card-text">{filter.Filter.Region.Name}</span>}
                                        {filter.Filter.FilterType!.Name === "City" && filter.Filter.Region && <span className="card-text">{filter.Filter.Region.Name}</span>}
                                        {filter.Filter.FilterType!.Name === "Street" && filter.Filter.Region && <span className="card-text">{filter.Filter.Region.Name}</span>}
                                        {filter.Filter.FilterType!.Name === "TransactionType" && filter.Filter.TransactionType && <span className="card-text">{filter.Filter.TransactionType.Name}</span>}
                                        {filter.Filter.FilterType!.Name === "PropertyType" && filter.Filter.PropertyType && <span className="card-text">{filter.Filter.PropertyType.Name}</span>}
                                        {filter.Filter.FilterType!.Name === "RoomsCountMin" && filter.Filter.Value && <span className="card-text">Min Rooms: {filter.Filter.Value}</span>}
                                        {filter.Filter.FilterType!.Name === "RoomsCountMax" && filter.Filter.Value && <span className="card-text">Max Rooms: {filter.Filter.Value}</span>}
                                        {filter.Filter.FilterType!.Name === "AreaMin" && filter.Filter.Value && <span className="card-text">Min Area: {filter.Filter.Value}</span>}
                                        {filter.Filter.FilterType!.Name === "AreaMax" && filter.Filter.Value && <span className="card-text">Max Area: {filter.Filter.Value}</span>}
                                    </div>
                                ))}
                            </div>
                            <br></br>
                            <button
                                type="submit"
                                className="big-button"
                                aria-label="Close"
                                onClick={() => handleEditPPU(item.Id!)}
                            >
                                Edit PPU
                            </button>

                        </div>
                    </div>
                ))}
            </div>
            {showFormModal && (
                <div className="container">
                    <div className="cookiesContent" id="cookiesPopup">
                        <button className="close">✖</button>
                        <form onSubmit={handleSubmitFormModal}>
                            <div className="one-filter-box">
                                <label htmlFor="TriggerPricePerUnit" className="form-label">Ideal Price/Unit: </label>
                                <input type="number" id="TriggerPricePerUnit" name="TriggerPricePerUnit" className="filter-inputs" value={ppu} onChange={handlePpuValueChange} required />
                            </div>
                            <button type="submit" className="big-button" onClick={(event) => props.onEditTrigger(selectedTriggerId, ppu, event)}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TriggersView;

