import 'react-data-grid/lib/styles.css';
import DataGrid from "react-data-grid";

import OptionValues from "./OptionValues";
import React from 'react';

export default function Options(props)
{
    let optionsObjs = props.optionsObjs;
    if(!optionsObjs || optionsObjs.length<=0)
    {
        return null;
    }

    const columns = [
        { key: 'id', name: 'ID', resizable: true, width:80 },
        { key: 'title', name: 'Title', resizable: true, width:150 },
        { key: 'type', name: 'Type', resizable: true, width:80 },
        { key: 'pos_option_id', name: 'POS Option ID', resizable: true, width:80 },
        { key: "values", name:"Option Items", resizable: true, width:350 }
    ];

    const rows = optionsObjs.map((option)=>{
        return {
            ...option,
            values: <OptionValues optionItems={option.values} />
        };
    });

    function calculateRowHeight(params)
    {
        if(params.type === "ROW")
        {
            let id = params.row.id;
            for (let i = 0; i < optionsObjs.length; i++) {
                if(id === optionsObjs[i].id && optionsObjs[i].values)
                {
                    return 35 * (optionsObjs[i].values.length + 2);
                }
            }
        }
        return 30;
    }

    return <DataGrid columns={columns} rows={rows} rowHeight={calculateRowHeight} className='fill-grid' />;
}