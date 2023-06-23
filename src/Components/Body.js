import axios from 'axios';
import React from 'react';

export default function Body(props)
{
    const selectedStore = props.selectedStore;

    const [data,setData] = React.useState({});
    const [displayTable, setDisplayTable] = React.useState();

    function showMenuBuilder()
    {
        console.log(data);
        let display = null;
        let products = data.products;
        let categories = data.categories;
        let subcategories = data.subcategories;
        let menus = data.menutypes;
        let associations = data.associations;

        let productsDisplay = null;
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const association = associations.filter((assoc)=>{
                return assoc.item == product.id;
            });

            product.subCats = [];
            product.cats = [];
            for (let i = 0; i < association.length; i++) {
                const assoc = association[i];
                if(assoc.subcategory)
                {
                    for(let j=0;j<subcategories.length;j++)
                    {
                        if(subcategories[j].id == assoc.subcategory)
                        {
                            product.subCats.push(subcategories[j]);
                        }
                    }
                }

                if(assoc.category)
                {
                    for (let j = 0; j < categories.length; j++) 
                    {
                        if(categories[j].id == assoc.category)
                        {
                            product.cats.push(categories[j]);
                        }
                    }
                }   
            }
        }

        

        console.log(products);

        display=
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Pos Item Id</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>Tax</th>
                </tr>    
            </thead>   
            <tbody>
                {productsDisplay}
            </tbody>
            
        </table>;

        return display;
    }

    function showMenuHandler()
    {
        //call api to display all the data
        let data = JSON.stringify({
            store: selectedStore
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.wcom.shop/api/getStoreData',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config).then((response) => {
            setData(response.data.data);
            const displayStr = showMenuBuilder();
            setDisplayTable(displayStr);
        })
        .catch((error) => 
        {
            console.log(error);
        });

        
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