import React from 'react';
import apiCalls from "../Utils/apiCalls";

import Items from './DisplayItems/Items';
import DisplayNewItems from './DisplayItems/NewItems';
import DisplayDeletedItems from "./DisplayItems/DeletedItems";
import DisplayUpdatedItems from "./DisplayItems/UpdatedItems";

export default function Body(props)
{
    const selectedStore = props.selectedStore;

    const [newItems, setNewItems] = React.useState([]);
    const [updatedItems, setUpdatedItems] = React.useState([]);
    const [deletedItems, setDeletedItems] = React.useState([]);

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
                    return (item.pos_item_id == pos_item_id) ? {...item, [property]:value}: item;
                });
            });
        }
    //#endregion

    const [displayTable, setDisplayTable] = React.useState();
    const [processing, setProcessing] = React.useState(false);
    const [mode, setMode] = React.useState("");

    //#region Show Menu
        function displayProducts(data)
        {
            // console.log(data);
            let categories = data.categories;
            let subcategories = data.subcategories;
            let products = data.products;
            let menus = data.menutypes;
            let associations = data.associations;
            let options = data.options;
            let optionvalues = data.options_values;

            //products to process
            let prods = [];
            for (let i = 0; i < products.length; i++) 
            {
                let prod_item = {};
                const product = products[i];
                prod_item = {...product};

                //associations, subcategories and categories
                prod_item.assoc = associations.filter((assoc)=>{
                    return assoc.item === product.id;
                });
                if(prod_item.assoc.length>0)
                {
                    for (let j = 0; j < prod_item.assoc.length; j++) {
                        let assoc = prod_item.assoc[j];
                        if(assoc.subcategory)
                        {
                            for(let k=0;k<subcategories.length;k++)
                            {
                                if(subcategories[k].id===assoc.subcategory)
                                {
                                    assoc.subcategoryObj = subcategories[k];
                                    break;
                                }
                            }
                        }
                        if(assoc.category)
                        {
                            for(let k=0;k<categories.length;k++)
                            {
                                if(categories[k].id===assoc.category)
                                {
                                    assoc.categoryObj = categories[k];
                                    if(assoc.categoryObj.menu_id && assoc.categoryObj.menu_id>0)
                                    {
                                        for(let l=0;l<menus.length;l++)
                                        {
                                            if(menus[l].id === assoc.categoryObj.menu_id)
                                            {
                                                assoc.categoryObj.menuObj = menus[l];
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }

                //options and options_values
                prod_item.options = options.filter((option)=>{
                    return option.item === product.id;
                });
                if(prod_item.options && prod_item.options.length>0)
                {
                    //optionvalues
                    for(let j=0;j<prod_item.options.length;j++)
                    {
                        let option = prod_item.options[j];
                        option.values = optionvalues.filter((optionvalue)=>{
                            return option.id === optionvalue.option_id;
                        });
                    }
                }

                prods.push(prod_item);
            }
            let displayStr = null;
            displayStr = <Items items={prods} />;
            setDisplayTable(displayStr);
            
        }

        async function showMenuHandler()
        {
            if(processing)
            {
                alert("Please Wait for current operation to complete");
                return;
            }
            
            setMode("");
            setProcessing(true);
            let data = await apiCalls.loadStoreMenu(selectedStore.id);
            if(data)
            {
                console.log("Fetch Menu API Called");
                displayProducts(data); 
            }
            else
            {
                alert("Unable To Load Data");
            }
            setProcessing(false);
        }
    //#endregion
    
    //#region Load Takeaway Menu
        function displayTakeawayData(datum)
        {
            // datum = null;
            if(!datum)
            {
                setDisplayTable(<h1>Error while loading data</h1>);
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

                if(prod.price!==prod.updatedPrice || prod.tax_data !== prod.updatedTax)
                {
                    prod.isDirty = true;
                    prod.acceptTitleChange = false;
                    prod.acceptPriceChange = (prod.price!=prod.updatedPrice)? true: false;
                    prod.acceptTaxChange = true;
                    prod.acceptOptionChange = true;
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

            setNewItems((oldItems)=>{
                return newItemsArr;
            });
            setUpdatedItems(updatedItemsArr);
            setDeletedItems(deletedItemsArr);
        }

        async function loadTakeawayHandler()
        {
            if(processing)
            {
                alert("Please Wait for current operation to complete");
                return;
            }
            setMode("pickup");
            setProcessing(true);
            let pickupResponse = await apiCalls.loadTakeawayMenu(selectedStore.id);
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
            setProcessing(false);
        }
    //#endregion

    //#region Save Menu
        async function saveUpdates()
        {
            let resp = window.confirm("Are You Sure? This action cannot be undone.");
            if(!resp) return;

            let items = {};
            items.newItems = newItems;
            items.updatedItems = updatedItems;
            items.deletedItems = deletedItems;

            console.log(mode);
            // console.log(items);

            switch (mode) {
                case "pickup":
                    console.log(items);
                    let savePickupResponse = await apiCalls.saveTakeawayMenu(selectedStore.id, items);
                    console.log(savePickupResponse);
                break;
            
                default:
                    //do nothing
                break;
            }
        }
    //#endregion

    return(
        <div className="bodyContainer">
            <div className="toolbar__container">
                <h2>Operations: </h2>
                <div className="bodyToolbar">
                    <button className="toolbar__button" onClick={showMenuHandler}>Show Menu</button>
                    <button className="toolbar__button" onClick={loadTakeawayHandler}>Load Takeaway Menu</button>
                    <button className="toolbar__button">Show Trigger History</button>
                    <button className="toolbar__button">Load Dine-In Menu</button>
                </div>
            </div>

            <div className="table__container">
                {displayTable}
            </div>

            <div className='table__container'>
            <div>
                <h1>New Items</h1>
                { newItems.length>0?
                    <DisplayNewItems items={newItems} 
                        checkAll={checkUncheckNewItems}
                        checkOne={checkUncheckNewItem} 
                    /> : <h2>No New Items</h2>
                }

                <br />
                <br />

                <h1>Deleted Items</h1>
                {
                    deletedItems.length>0?
                    <DisplayDeletedItems items={deletedItems} 
                        checkAll={checkUncheckDeletedItems} 
                        checkOne={checkUncheckDeletedItem}
                    /> : <h2>No Items For Deletion</h2>
                }

                <br />
                <br />
                <h1>Updated Items</h1>
                {
                    updatedItems.length>0?
                    <DisplayUpdatedItems 
                        items={updatedItems} 
                        handleChange={changeUpdatedItemProperty}
                    />: <h2>No Items For Update</h2>
                }
                
                <br />
                <br />

                {
                    (updatedItems.length>0 || newItems.length>0 || deletedItems.length>0) &&
                    <button type='button' className='toolbar__button__big' onClick={saveUpdates}>Save Changes</button>
                }
            </div>
            </div>
        </div>
    );
}