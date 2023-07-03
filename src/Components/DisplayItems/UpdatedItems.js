import React from "react";
import Items from "./Items";

export default function UpdatedItems(props)
{
    let items = props.items;

    function updateValues(pos_item_id,property,value)
    {
        props.handleChange(pos_item_id,property,value);
    }
    
    let rows = items.map((item,index)=>
    {
        // console.log(item.assoc);
        return (
        <tr className="updatedItemRow" key={"updatedItemRow"+index}>
            <td>{item.title}</td>
            <td>{item.updatedTitle}</td>
            <td>
                <input type="checkbox" 
                    checked={item.acceptTitleChange} 
                    onChange={(event)=>updateValues(item.pos_item_id,"acceptTitleChange",event.target.checked)}
                />
            </td>
            <td>{item.price}</td>
            <td>{item.updatedPrice}</td>
            <td>
                <input type="checkbox" 
                    checked={item.acceptPriceChange} 
                    onChange={(event)=>updateValues(item.pos_item_id,"acceptPriceChange",event.target.checked)}
                />
            </td>
            <td>{item.pos_item_id}</td>
            <td>
                {
                    item.tax_data.length>0 && 
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            {item.tax_data.map((tax)=>{
                                return <>
                                <tr>
                                    <th>Title</th><td>{tax.title}</td>
                                </tr>
                                <tr>
                                    <th>Value</th><td>{tax.value}</td>
                                </tr>
                                <tr>
                                    <th>Type</th><td>{tax.type}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><br /></td>
                                </tr>
                                </>;
                            })}
                        </tbody>
                    </table>
                }
            </td>
            <td>
                {
                    item.updatedTax && item.updatedTax.length>0 && 
                    <table>
                        <thead>
                           
                        </thead>
                        <tbody>
                            {item.updatedTax.map((tax)=>{
                                return <>
                                <tr>
                                    <th>Title</th><td>{tax.title}</td>
                                </tr>
                                <tr>
                                    <th>Value</th><td>{tax.value}</td>
                                </tr>
                                <tr>
                                    <th>Type</th><td>{tax.type}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><br /></td>
                                </tr>
                                </>;
                            })}
                        </tbody>
                    </table>
                }
            </td>
            <td>
                <input type="checkbox" 
                    checked={item.acceptTaxChange} 
                    onChange={(event)=>updateValues(item.pos_item_id,"acceptTaxChange",event.target.checked)}
                />
            </td>
            <td>
                {
                    item.assoc && item.assoc.categoryObj &&
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
                                <td>{item.assoc.category}</td>
                                <td>{item.assoc.categoryObj.title}</td>
                                <td>{item.assoc.categoryObj.menuObj? item.assoc.categoryObj.menuObj.title: "Base Menu"}</td>
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
            <td>
                {
                    item.updatedOptions.length>0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>Parent Option Name</th>
                                <th>Option Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.updatedOptions.map((option)=>{
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
            <td>
                <input type="checkbox" 
                    checked={item.acceptOptionChange} 
                    onChange={(event)=>updateValues(item.pos_item_id,"acceptOptionChange",event.target.checked)}
                />
            </td>
        </tr>
        );
    });

    let table = <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Updated Title</th>
                <th>Title Change</th>
                <th>Price</th>
                <th>Updated Price</th>
                <th>Price Change</th>
                <th>Pos Id</th>
                <th>Tax</th>
                <th>Updated Tax</th>
                <th>Tax Change</th>
                <th>Category</th>
                <th>Options</th>
                <th>Updated Options</th>
                <th>Option Change</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
    return table;
}