import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

import Taxes from './Taxes';
import CategoriesAndSubCategories from './CategoriesAndSubCategories';

export default function Items(props)
{
    let items = props.items;
    console.log(items);
    
    const columns = [
        { key: 'id', name: 'Id' },
        { key: 'title', name: 'Title' },
        { key: "pos_item_id", name:"Pos Id" },
        { key: "price", name: "Price" },
        { key: "assoc", name: "Categories/ SubCategories" },
        { key: "tax_data", name: "Taxes"}
    ];
        
    const rows = items.map((product)=>{
        return {...product, 
                tax_data:<Taxes tax_data={product.tax_data} />,
                assoc: <CategoriesAndSubCategories assoc={product.assoc} />
            };
    });

    

    function rowHeight(event)
    {
        // console.log(event);
        return 200;
    }

    return <DataGrid columns={columns} rows={rows} rowHeight={rowHeight} />;
}