import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

import Taxes from './Taxes';
import CategoriesAndSubCategories from './CategoriesAndSubCategories';
import Options from './Options';

export default function Items(props)
{
    let items = props.items;
    // console.log(JSON.stringify(items));
    
    const columns = [
        { key: 'id', name: 'Id', frozen:true, resizable: true, sortable: true, width:100 },
        { key: 'title', name: 'Title', frozen:true, resizable: true, sortable: true, width:200 },
        { key: "pos_item_id", name:"Pos Id", resizable: true, sortable: true, width:100 },
        { key: "price", name: "Price", frozen:true, resizable: true, sortable: true, width:50 },
        { key: "assoc", name: "Categories/ SubCategories", resizable: true, sortable: false, width: 400 },
        { key: "options", name: "Options", resizable: true, sortable: false, width:700 },
        { key: "tax_data", name: "Taxes", resizable: true, sortable: false, width:300 },
    ];
        
    const rows = items.map((product)=>{
        return {...product, 
                tax_data:<Taxes tax_data={product.tax_data} />,
                assoc: <CategoriesAndSubCategories assoc={product.assoc} />,
                options: <Options optionsObjs={product.options} />
            };
    });
    
    function getOptionValuesCount(item)
    {
        if(item.options && item.options.length>0)
        {
            const sum = item.options.reduce((acc,curr)=>{
                curr.values? acc+=curr.values.length+1:acc+=0;
                return acc;
            },0);
            // console.log(sum);
            return sum + item.options.length*2;
        }
        return 0;
    }

    function rowHeight(params)
    {
        // console.log(params);
        let id = params.row.id;
        for(let i=0;i<items.length;i++)
        {
            if(id === items[i].id)
            {
                const item = items[i];
                return 35 * Math.max(item.tax_data?item.tax_data.length:1,item.assoc?item.assoc.length:1,getOptionValuesCount(item));
            }
        }
        return 30;
    }

    const cellRenderer = ({ cell }) => (
        <div className="cell-content">{cell.value}</div>
    );

    return <DataGrid 
            columns={columns} 
            rows={rows} 
            rowHeight={rowHeight}
            rowKeyGetter={(row) => row.id}
            defaultCellRenderer={cellRenderer}
            className='fill-grid'
            />;
}