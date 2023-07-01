import React from "react";

export default function DeletedItems(props)
{
    let items = props.items;
    const [allSelected, setAllSelected] = React.useState(true);

    function handleOnChange(pos_item_id,val)
    {
        props.checkOne(pos_item_id, !val);
    }

    function handleCheckUncheckAllNewItems(event)
    {
        setAllSelected((oldVal)=>
        {
            return !oldVal;
        });
        props.checkAll(allSelected);
    }

    // for(let i=0;i<items.length;i++)
    // {
    //     console.log(`${items[i].title}: ${items[i].toBeDeleted}`);
    // }
    
    let rows = items.map((item,index)=>
    {
        return (
        <tr className="deletedItemRow" key={"deletedItemRow"+index}>
            <td>
                <input type='checkbox'
                    key={`deletedItemsCheckbox${index}`} 
                    checked={item.toBeDeleted} 
                    onChange={()=>handleOnChange(item.pos_item_id,item.toBeDeleted)} 
                />
            </td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.pos_item_id}</td>
            <td>
                {
                    item.tax_data.length>0 && 
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Value</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.tax_data.map((tax)=>{
                                return <tr>
                                    <td>{tax.title}</td>
                                    <td>{tax.value}</td>
                                    <td>{tax.type}</td>
                                </tr>;
                            })}
                        </tbody>
                    </table>
                }
            </td>
            <td>
                {
                    item.assoc.length>0 && item.assoc[0].categoryObj &&
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Menu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{item.assoc[0].category}</td>
                                <td>{item.assoc[0].categoryObj.title}</td>
                                <td>{item.assoc[0].categoryObj.menuObj? item.assoc[0].categoryObj.menuObj.title: "Base Menu"}</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </td>
            <td>
                {
                    item.options.length>0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>Parent Option Name</th>
                                <th>Option Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.options.map((option)=>{
                                    return <>
                                    <tr>
                                        <td>{option.title}</td>
                                        <td>{option.type}</td>
                                    </tr>
                                    {option.values && option.values.length>0 &&
                                        <tr>
                                            <td colSpan={2}>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Option Name</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {option.values.map((optionsItem)=>{
                                                            return <tr>
                                                                <td>{optionsItem.title}</td>
                                                                <td>{optionsItem.price}</td>
                                                            </tr>;
                                                        })}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    }
                                    </>;
                                })
                            }
                        </tbody>
                    </table>
                }
            </td>
        </tr>
        );
    });

    let table = <table id="deletedItemsTable">
        <thead>
            <tr>
                <th>
                    <input 
                        type='checkbox' 
                        key="checkAllNewItems" 
                        checked={allSelected} 
                        onChange={handleCheckUncheckAllNewItems} 
                    />
                </th>
                <th>Title</th>
                <th>Price</th>
                <th>Pos Id</th>
                <th>Tax</th>
                <th>Category</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
    return table;
}