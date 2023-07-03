import React from 'react';

//api call
import apiCalls from "../Utils/apiCalls";

//components
// import Items from './DisplayItems/Items';
import DisplayNewItems from './DisplayItems/NewItems';
import DisplayDeletedItems from "./DisplayItems/DeletedItems";
import DisplayUpdatedItems from "./DisplayItems/UpdatedItems";

//loader
import {Dna} from "react-loader-spinner";

export default function Body(props)
{
    const selectedStore = props.selectedStore;

    const [newItems, setNewItems] = React.useState([]);
    const [updatedItems, setUpdatedItems] = React.useState([]);
    const [deletedItems, setDeletedItems] = React.useState([]);
    const [triggerHistory, setTriggerHistory] = React.useState([]);

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

    // const [displayTable, setDisplayTable] = React.useState();
    const [processing, setProcessing] = React.useState(false);
    const [mode, setMode] = React.useState("");

    //#region Show Menu
        // function displayProducts(data)
        // {
        //     // console.log(data);
        //     let categories = data.categories;
        //     let subcategories = data.subcategories;
        //     let products = data.products;
        //     let menus = data.menutypes;
        //     let associations = data.associations;
        //     let options = data.options;
        //     let optionvalues = data.options_values;

        //     //products to process
        //     let prods = [];
        //     for (let i = 0; i < products.length; i++) 
        //     {
        //         let prod_item = {};
        //         const product = products[i];
        //         prod_item = {...product};

        //         //associations, subcategories and categories
        //         prod_item.assoc = associations.filter((assoc)=>{
        //             return assoc.item === product.id;
        //         });
        //         if(prod_item.assoc.length>0)
        //         {
        //             for (let j = 0; j < prod_item.assoc.length; j++) {
        //                 let assoc = prod_item.assoc[j];
        //                 if(assoc.subcategory)
        //                 {
        //                     for(let k=0;k<subcategories.length;k++)
        //                     {
        //                         if(subcategories[k].id===assoc.subcategory)
        //                         {
        //                             assoc.subcategoryObj = subcategories[k];
        //                             break;
        //                         }
        //                     }
        //                 }
        //                 if(assoc.category)
        //                 {
        //                     for(let k=0;k<categories.length;k++)
        //                     {
        //                         if(categories[k].id===assoc.category)
        //                         {
        //                             assoc.categoryObj = categories[k];
        //                             if(assoc.categoryObj.menu_id && assoc.categoryObj.menu_id>0)
        //                             {
        //                                 for(let l=0;l<menus.length;l++)
        //                                 {
        //                                     if(menus[l].id === assoc.categoryObj.menu_id)
        //                                     {
        //                                         assoc.categoryObj.menuObj = menus[l];
        //                                         break;
        //                                     }
        //                                 }
        //                             }
        //                             break;
        //                         }
        //                     }
        //                 }
        //             }
        //         }

        //         //options and options_values
        //         prod_item.options = options.filter((option)=>{
        //             return option.item === product.id;
        //         });
        //         if(prod_item.options && prod_item.options.length>0)
        //         {
        //             //optionvalues
        //             for(let j=0;j<prod_item.options.length;j++)
        //             {
        //                 let option = prod_item.options[j];
        //                 option.values = optionvalues.filter((optionvalue)=>{
        //                     return option.id === optionvalue.option_id;
        //                 });
        //             }
        //         }

        //         prods.push(prod_item);
        //     }
        //     let displayStr = null;
        //     displayStr = <Items items={prods} />;
        //     setDisplayTable(displayStr);
            
        // }

        // async function showMenuHandler()
        // {
        //     if(processing)
        //     {
        //         alert("Please Wait for current operation to complete");
        //         return;
        //     }
            
        //     setMode("");
        //     setProcessing(true);
        //     setTriggerHistory([]);
        //     let data = await apiCalls.loadStoreMenu(selectedStore.id);
        //     if(data)
        //     {
        //         console.log("Fetch Menu API Called");
        //         displayProducts(data); 
        //     }
        //     else
        //     {
        //         alert("Unable To Load Data");
        //     }
        //     setProcessing(false);
        // }
    //#endregion
    
    //#region Load dineIn Data
        async function loadDineData()
        {
            if(processing)
            {
                alert("Please Wait for current operation to complete");
                return;
            }
            setProcessing(true);
            setMode("pickup");
            try 
            {
                setTriggerHistory([]);
                let pickupResponse = await apiCalls.loadDineInData(selectedStore.id);
                if(pickupResponse)
                {
                    // console.log(pickupResponse);
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
            setProcessing(false);
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

                            if(originalOption.price !== updatedOption.price || 
                                originalOption.pos_option_value_id !== updatedOption.pos_option_value_id ||
                                originalOption.title !== updatedOption.title
                            )
                            {
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

                if(!prod.updatedPrice && prod.pos_item_id && prod.pos_item_id>0)
                {
                    prod.toBeDeleted = true;
                }
                else prod.toBeDeleted = false;

                if(prod.price!==prod.updatedPrice || JSON.stringify(prod.tax_data) !== JSON.stringify(prod.updatedTax))
                {
                    prod.isDirty = true;
                    prod.acceptTitleChange = false;
                    prod.isTitleChanged = !(prod.title === prod.updatedTitle);
                    prod.acceptPriceChange = (prod.price!==prod.updatedPrice)? true: false;
                    if(!prod.updatedTax) prod.updatedTax = [];
                    prod.acceptTaxChange = true;
                    prod.isTaxChanged = !compareTax(prod.tax_data,prod.updatedTax);
                    prod.acceptOptionChange = true;
                    prod.isOptionsChanged = !compareOptions(prod.options,prod.updatedOptions);
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
                    updatedItemsArr.push(prod);
                }
            }

            setNewItems(newItemsArr);
            setUpdatedItems(updatedItemsArr);
            setDeletedItems(deletedItemsArr);
        }

        // async function loadTakeawayHandler()
        // {
        //     if(processing)
        //     {
        //         alert("Please Wait for current operation to complete");
        //         return;
        //     }
        //     setMode("pickup");
        //     setProcessing(true);
        //     try {
        //         setTriggerHistory([]);
        //         let pickupResponse = await apiCalls.loadTakeawayMenu(selectedStore.id);
        //         if(pickupResponse)
        //         {
        //             // console.log(pickupResponse);
        //             if(pickupResponse.status === true)
        //             {
        //                 console.log("Load Takeaway Menu API Called");
        //                 try 
        //                 {
        //                     displayTakeawayData(pickupResponse.data);    
        //                 } 
        //                 catch (error) 
        //                 {
        //                     console.error(error);    
        //                 }
        //             }
        //             else
        //             {
        //                 if(pickupResponse.message)
        //                 {
        //                     alert(pickupResponse.message);
        //                 }
        //             }
        //         }
        //         else
        //         {
        //             alert("Unable To Load Data");
        //         }
        //     } 
        //     catch (error) 
        //     {
        //         console.log(error);    
        //     }
            
        //     setProcessing(false);
        // }
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
            // console.log(items);
            setProcessing(true);
            switch (mode) {
                case "pickup":
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
                    catch (error) {
                        alert("Unable To Save Data, Please try again Later");
                    }
                    
                break;
            
                default:
                    //do nothing
                break;
            }
            setProcessing(false);
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
            setProcessing(true);
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
            setProcessing(false);
        }

        async function fetchTriggerData(triggerId)
        {
            if(processing)
            {
                alert("Please Wait for current operation to complete");
                return;
            }
            setProcessing(true);
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
            setProcessing(false);
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
    //#endregion
    
    return(
        <>
            <div className="bodyContainer">
                <div className="toolbar__container">
                    <h2>Operations: </h2>
                    <div className="bodyToolbar">
                        {/* <button className="toolbar__button" onClick={showMenuHandler}>Show Menu</button> */}
                        {/* <button className="toolbar__button" onClick={loadTakeawayHandler}>Load Takeaway Menu</button> */}
                        <button className="toolbar__button" onClick={loadTriggerHistory}>Show Trigger History</button>
                        <button className="toolbar__button" onClick={loadDineData}>Load Dine-In Menu</button>
                    </div>
                </div>

                {
                    triggerHistory && triggerHistory.length>0 &&
                    <div className="toolbar__container">
                    <h2>Trigger History: </h2>
                    <div className="bodyToolbar">
                        {triggerHistory.map((history)=>{
                            return <button className='toolbar__button' onClick={()=>fetchTriggerData(history.id)}>{`${history.id} (${history.doc})`}</button>
                        })}
                    </div>
                </div>
                }

                {/* <div className="table__container">
                    {displayTable}
                </div> */}

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

                    </div>
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

            <div className={processing===true?"overlay":"overlay__hidden"}>
                <Dna
                    visible={true}
                    height="150"
                    width="150"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </>
    );
}