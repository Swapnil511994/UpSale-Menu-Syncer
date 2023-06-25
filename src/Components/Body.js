import React from 'react';
import loadStoreMenu from "../Utils/apiCalls";

import Items from './Items';

export default function Body(props)
{
    const selectedStore = props.selectedStore;

    const [data,setData] = React.useState({});
    const [displayTable, setDisplayTable] = React.useState();

    function displayProducts()
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
        displayStr = <><h1>All Products</h1><Items items={prods} /></>;
        setDisplayTable(displayStr);
    }
    async function showMenuHandler()
    {
        //call api to display all the data
        await loadStoreMenu(selectedStore).then((data)=>{
            setData(data);
            displayProducts();
        });
        // let data = await loadStoreMenu(selectedStore.id);
        // if(data)
        // {
        //     setData(data);
        //     displayProducts(); 
        // }
        // else
        // {
        //     alert("Unable To Load Data");
        // }
    }
    
    return(
        <div className="bodyContainer">
            <div className="toolbar__container">
                <h2>Operations: </h2>
                <div className="bodyToolbar">
                    <button className="toolbar__button" onClick={showMenuHandler}>Show Menu</button>
                    <button className="toolbar__button">Load Takeaway Menu</button>
                    <button className="toolbar__button">Show Trigger History</button>
                    <button className="toolbar__button">Load Dine-In Menu</button>
                </div>
            </div>

            <div className="table__container">
                {displayTable}
            </div>
        </div>
    );
}