import React from 'react';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

export default function Header(props)
{
    
    let options = props.allStores.map(x=>{
        return {
            name: `${x.account_id} | ${x.title}`,
            value: x.id
        };
    });

    return (
        <div className="header">
            <h2>Select Store</h2>
            <SelectSearch search={true} options={options} value={props.selectedStore.id}
            placeholder="Choose Store" onChange={(value)=>props.handleStoreChange(value)} />
        </div>
    );
}