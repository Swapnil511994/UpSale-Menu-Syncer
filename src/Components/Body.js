export default function Body(props)
{
    const selectedStore = props.selectedStore;
    return(
        <div className="bodyContainer">
            <div className="toolbar__container">
                <h2>Takeaway: </h2>
                <div className="bodyToolbar">
                    <button className="toolbar__button">Load Takeaway Menu</button>
                    <button className="toolbar__button">Show Trigger History</button>
                </div>

                <h2>Dine-In: </h2>
                <div className="bodyToolbar">
                    <button className="toolbar__button">Load Dine-In Menu</button>
                </div>
            </div>
        </div>
    );
}