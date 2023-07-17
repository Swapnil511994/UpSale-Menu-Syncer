import React from 'react';

//api call
import apiCalls from "../Utils/apiCalls";

//components
import DisplayNewItems from './DisplayItems/NewItems';
import DisplayDeletedItems from "./DisplayItems/DeletedItems";
import DisplayUpdatedItems from "./DisplayItems/UpdatedItems";

export default function Body(props)
{
    const selectedStore = props.selectedStore;
    const processing = props.processingFlag;
    const [newItems, setNewItems] = React.useState([]);
    const [updatedItems, setUpdatedItems] = React.useState([]);
    const [deletedItems, setDeletedItems] = React.useState([]);
    const [triggerHistory, setTriggerHistory] = React.useState([]);
    
    const [mode, setMode] = React.useState("");

    //#region State Manipulation
        function checkUncheckNewItems(value)
        {
            let newItemsArr = newItems.map((item)=>{
                return{
                    ...item,
                    isNewItem: value
                };
            }); 
           
            setNewItems(newItemsArr);
        }

        function checkUncheckNewItem(posItemId, val)
        {
            setNewItems((oldItems)=>{
                return oldItems.map((item)=>{
                    return (item.pos_item_id === posItemId) ? {...item, isNewItem:val}:item;
                });
            });
        }

        function checkUncheckDeletedItems(value)
        {
            let deletedItemsArr = deletedItems.map((item)=>{
                return{
                    ...item,
                    toBeDeleted: value
                };
            }); 
           
            setDeletedItems(deletedItemsArr);
        }

        function checkUncheckDeletedItem(posItemId, val)
        {
            setDeletedItems((oldItems)=>{
                return oldItems.map((item)=>{
                    return (item.pos_item_id === posItemId) ? {...item, toBeDeleted:val}:item;
                });
            });
        }

        function changeUpdatedItemProperty(pos_item_id,property,value)
        {
            setUpdatedItems((oldItems)=>
            {
                return oldItems.map((item)=>{
                    return (item.pos_item_id === pos_item_id) ? {...item, [property]:value}: item;
                });
            });
        }
    //#endregion
    
    //#region Pet Pooja
        //#region Load dineIn Data
            async function loadDineData()
            {
                if(processing)
                {
                    alert("Please Wait for current operation to complete");
                    return;
                }
                updateProcessing(true);
                setMode("pickup");
                try 
                {
                    setTriggerHistory([]);
                    let pickupResponse = await apiCalls.loadDineInData(selectedStore.id);
                    if(pickupResponse)
                    {
                        console.log(pickupResponse);
                        // debugger;
                        if(pickupResponse.status === true)
                        {
                            console.log("Load Takeaway Menu API Called");
                            try 
                            {
                                displayTakeawayData(pickupResponse.data);    
                            } 
                            catch (error) 
                            {
                                console.error(error);    
                            }
                        }
                        else
                        {
                            if(pickupResponse.message)
                            {
                                alert(pickupResponse.message);
                            }
                        }
                    }
                    else
                    {
                        alert("Unable To Load Data");
                    }
                } 
                catch (error) 
                {
                    console.log(error);    
                }
                updateProcessing(false);
            }
        //#endregion

        //#region Load Takeaway Menu

            function compareTax(original, updated)
            {
                //if tax are same true will be returned
                //else false will be returned
                //by default false will be returned
                try 
                {
                    return (JSON.stringify(original) === JSON.stringify(updated));
                } 
                catch (error) 
                {
                    return false;    
                }
            }

            function compareOptions(original, updated)
            {
                //if options are same false will be returned
                //else true will be returned
                //by default false will be returned
                if(!original && !updated) return false;
                else if((!updated && original) || (!original && updated)) return false;

                if(original.length === updated.length)
                {
                    //options length is same, let's compare internal 
                    for(let i=0;i<original.length;i++)
                    {
                        if(original[i].values && updated[i].values && original[i].values.length === updated[i].values.length)
                        {
                            for(let j=0;j<original[i].values.length;j++)
                            {
                                let originalOption = original[i].values[j];
                                let updatedOption = updated[i].values[j];

                                if(originalOption.pos_option_value_id !== updatedOption.pos_option_value_id || originalOption.title !== updatedOption.title)
                                {
                                    // console.log("here");
                                    return false;
                                }

                                if(parseFloat(originalOption.price) !== parseFloat(updatedOption.price))
                                {
                                    // console.log("price here"+`${originalOption.price} ${updatedOption.price}`);
                                    return false;
                                }
                            }
                        }
                        else return false;
                    }
                }
                else
                {
                    return false;
                }

                return true;
            }

            function displayTakeawayData(datum)
            {
                // datum = null;
                if(!datum)
                {
                    return;
                }

                let newItemsArr = [];
                let updatedItemsArr = [];
                let deletedItemsArr = [];

                for (let i = 0; i < datum.length; i++) 
                {
                    let prod = datum[i];
                    if(!prod.pos_item_id)
                    {
                        continue;
                    }

                    if(!prod.updatedPrice && prod.updatedPrice!==0 && prod.pos_item_id && prod.pos_item_id>0)
                    {
                        prod.toBeDeleted = true;
                    }
                    else prod.toBeDeleted = false;

                    if(prod.price!==prod.updatedPrice || JSON.stringify(prod.tax_data) !== JSON.stringify(prod.updatedTax))
                    {
                        prod.isDirty = true;
                        prod.acceptTitleChange = false;
                        prod.isTitleChanged = !(prod.title === prod.updatedTitle);
                        prod.acceptPriceChange = (parseFloat(prod.price)!==parseFloat(prod.updatedPrice))? true: false;
                        prod.isPriceChanged = prod.acceptPriceChange;
                        if(!prod.updatedTax) prod.updatedTax = [];
                        prod.acceptTaxChange = true;
                        prod.isTaxChanged = !compareTax(prod.tax_data,prod.updatedTax);
                        prod.acceptOptionChange = true;
                        prod.isOptionsChanged = !compareOptions(prod.options,prod.updatedOptions);
                        // console.log(prod.isOptionsChanged);
                    }
                    else prod.isDirty = false;

                    if(!prod.id)
                    {
                        prod.isNewItem = true;
                    }
                    else prod.isNewItem = false;
                    
                    if(prod.isNewItem === true)
                    {
                        newItemsArr.push(prod);
                    }
                    else if(prod.toBeDeleted === true)
                    {
                        deletedItemsArr.push(prod);
                    }
                    else if(prod.isDirty === true)
                    {
                        if(prod.isTitleChanged || prod.isPriceChanged || prod.isTaxChanged || prod.isOptionsChanged)
                        {
                            updatedItemsArr.push(prod);
                        }
                    }
                }

                // console.log(deletedItemsArr);

                setNewItems(newItemsArr);
                setUpdatedItems(updatedItemsArr);
                setDeletedItems(deletedItemsArr);
            }
        //#endregion

        //#region Load Trigger History
            async function loadTriggerHistory()
            {
                if(processing)
                {
                    alert("Please Wait for current operation to complete");
                    return;
                }
                updateProcessing(true);
                try 
                {
                    setTriggerHistory([]);
                    setNewItems([]);
                    setDeletedItems([]);
                    setUpdatedItems([]);
                    let triggerData = await apiCalls.loadTriggerHistory(selectedStore.id);
                    if(triggerData.data && triggerData.data.length >0)
                    {
                        setTriggerHistory(triggerData.data);
                    }
                } 
                catch (error) 
                {
                    console.log(error);    
                }
                updateProcessing(false);
            }

            async function fetchTriggerData(triggerId)
            {
                if(processing)
                {
                    alert("Please Wait for current operation to complete");
                    return;
                }
                updateProcessing(true);
                setMode("pickup");
                try 
                {
                    setTriggerHistory([]);
                    let pickupResponse = await apiCalls.loadTriggerHistoryData(triggerId);
                    // console.log(pickupResponse.data);
                    if(pickupResponse)
                    {
                        if(pickupResponse.status === true)
                        {
                            console.log("Load Takeaway Menu API Called");
                            try 
                            {
                                displayTakeawayData(pickupResponse.data);    
                            } 
                            catch (error) 
                            {
                                console.error(error);    
                            }
                        }
                        else
                        {
                            if(pickupResponse.message)
                            {
                                alert(pickupResponse.message);
                            }
                        }
                    }
                    else
                    {
                        alert("Unable To Load Data");
                    }
                } 
                catch (error) 
                {
                    console.log(error);    
                }
                updateProcessing(false);
            }
        //#endregion
    //#endregion

    //#region TmBill
            //#region Load Dine-In Data
                async function loadTMBillDineInMenu()
                {
                    if(processing)
                    {
                        alert("Please Wait for current operation to complete");
                        return;
                    }
                    updateProcessing(true);
                    setMode("dine_in");
                    let tmbillResponse = await apiCalls.tmbill_loadDineInMenu(selectedStore.id);
                    // console.log(tmbillResponse);
                    if(tmbillResponse)
                    {
                        if(tmbillResponse.status && tmbillResponse.status == true)
                        {
                            //do something here
                            displayTakeawayData(tmbillResponse.data);
                        }
                        else
                        {
                            if(tmbillResponse.message) alert(tmbillResponse.message);
                            else alert("Unknow Error, Check Network tab for details");
                        }
                    }
                    else
                    {
                        alert("Unable To Load Response from API")
                        console.error("Error Calling TMBill API");
                    }
                    updateProcessing(false);
                }
            //#endregion

            //#region Load Takeaway Data
                async function loadTMBillPickupMenu()
                {
                    if(processing)
                    {
                        alert("Please Wait for current operation to complete");
                        return;
                    }
                    updateProcessing(true);
                    setMode("pickup");
                    let tmbillResponse = await apiCalls.tmbill_loadTakeawayMenu(selectedStore.id);
                    // console.log(tmbillResponse);
                    if(tmbillResponse)
                    {
                        if(tmbillResponse.status && tmbillResponse.status == true)
                        {
                            //do something here
                            displayTakeawayData(tmbillResponse.data);
                        }
                        else
                        {
                            if(tmbillResponse.message) alert(tmbillResponse.message);
                            else alert("Unknow Error, Check Network tab for details");
                        }
                    }
                    else
                    {
                        alert("Unable To Load Response from API")
                        console.error("Error Calling TMBill API");
                    }
                    
                    updateProcessing(false);
                }
            //#endregion
    //#endregion
    //#region Save Menu
        async function saveUpdates()
        {
            if(processing)
            {
                alert("Please Wait for current operation to complete");
                return;
            }
            let resp = window.confirm("Are You Sure? This action cannot be undone.");
            if(!resp) return;

            let items = {};
            items.newItems = newItems;
            items.updatedItems = updatedItems;
            items.deletedItems = deletedItems;

            console.log(mode);
            
            updateProcessing(true);
            try 
            {
                setTriggerHistory([]);
                let savePickupResponse = await apiCalls.saveTakeawayMenu(selectedStore.id, items);    
                if(savePickupResponse.status)
                {

                }
                else
                {
                    alert("Unable To Save Data, Please Try Again Later");
                }
                setDeletedItems([]);
                setNewItems([]);
                setUpdatedItems([]);
            } 
            catch (error) 
            {
                alert("Unable To Save Data, Please try again Later");
            }
            finally
            {

            }
            updateProcessing(false);
        }
    //#endregion

    
    
    //#region Other Functions
        function goToViolation(id)
        {
            const violation = document.getElementById(id); 
            window.scrollTo({
                top:violation.offsetTop-50,
                behavior:"smooth"
            });
        };

        function updateProcessing(val)
        {
            props.handleProcessingChange(val);
        }
    //#endregion
    

    return(
        <>
            <div className="bodyContainer">
                <div className="toolbar__container">
                    <h2>Operations: </h2>
                    {
                        (props.integrationData.type === "pet_pooja" || props.integrationData.type === "pet_pooja_dinein") &&
                        <div className="bodyToolbar">
                            <button className="toolbar__button" onClick={loadTriggerHistory}>Show Trigger History</button>
                            <button className="toolbar__button" onClick={loadDineData}>Load Dine-In Menu</button>
                        </div>
                    }

                    {
                        props.integrationData.type === "tmbill" &&
                        <div className="bodyToolbar">
                            <button className="toolbar__button" onClick={loadTMBillPickupMenu}>Load Menu</button>
                            <button className="toolbar__button" onClick={loadTMBillDineInMenu}>Load Dine-In Menu</button>
                        </div>
                    }
                    
                </div>

                {
                    triggerHistory && triggerHistory.length>0 &&
                    <div className="toolbar__container">
                        <h2>Trigger History: </h2>
                        <div className="bodyToolbar">
                            {
                                triggerHistory.map((history)=>{
                                    return <button className='toolbar__button' onClick={()=>fetchTriggerData(history.id)}>{`${history.id} (${history.doc})`}</button>
                                })
                            }
                        </div>
                    </div>
                }

                <div id='summaryContainer'>
                    <div className="toolbar__container">
                        <div className="bodyToolbar">
                            <button 
                                className='toolbar__button__big newItemRow'
                                onClick={()=>{goToViolation("newItemsTable")}}
                            >
                                    New Items ({newItems.length})
                            </button>
                            <button 
                                className='toolbar__button__big deletedItemRow'
                                onClick={()=>{goToViolation("deletedItemsTable")}}
                            >
                                Deleted Items ({deletedItems.length})
                            </button>
                            <button 
                                className='toolbar__button__big updatedItemRow'
                                onClick={()=>{goToViolation("updatedItemsTable")}}
                            >
                                Updated Items ({updatedItems.length})
                            </button>
                            {
                                (updatedItems.length>0 || newItems.length>0 || deletedItems.length>0) &&
                                <button type='button' className='toolbar__button__big' onClick={saveUpdates}>Save Changes</button>
                            }
                        </div>
                    </div>
                </div>
                <div className='table__container'>
                    <div>
                        <h1 id="newItemsTable">New Items</h1>
                        { newItems.length>0?
                            <DisplayNewItems items={newItems} 
                                checkAll={checkUncheckNewItems}
                                checkOne={checkUncheckNewItem} 
                            /> : <h2>No New Items</h2>
                        }

                        <br />
                        <br />

                        <h1 id="deletedItemsTable">Deleted Items</h1>
                        {
                            deletedItems.length>0?
                            <DisplayDeletedItems items={deletedItems} 
                                checkAll={checkUncheckDeletedItems} 
                                checkOne={checkUncheckDeletedItem}
                            /> : <h2>No Items For Deletion</h2>
                        }

                        <br />
                        <br />
                        <h1 id="updatedItemsTable">Updated Items</h1>
                        {
                            updatedItems.length>0?
                            <DisplayUpdatedItems 
                                items={updatedItems} 
                                handleChange={changeUpdatedItemProperty}
                            />: <h2>No Items For Update</h2>
                        }
                        
                        <br />
                        <br />

                        
                    </div>
                </div>
            </div>
        </>
    );
}