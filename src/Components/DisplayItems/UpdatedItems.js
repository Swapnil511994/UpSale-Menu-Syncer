import React from "react";
// import Items from "./Items";

export default function UpdatedItems(props)
{
    let items = props.items;

    function updateValues(pos_item_id,property,value)
    {
        props.handleChange(pos_item_id,property,value);
    }
    
    let rows = items.map((item,index)=>
    {
        // console.log(item);
        // console.log(JSON.stringify(item.tax_data) === JSON.stringify(item.updatedTax));
        return (
        <tr className="updatedItemRow" key={"updatedItemRow"+index}>
            <td>{item.title}</td>
            <td className={(item.isTitleChanged === true)?"deletedItemRow":""}>{item.updatedTitle}</td>
            <td>
                <input type="checkbox" 
                    checked={item.acceptTitleChange} 
                    onChange={(event)=>updateValues(item.pos_item_id,"acceptTitleChange",event.target.checked)}
                />
            </td>
            <td>{item.price}</td>
            <td className={(item.isPriceChanged === true)?"deletedItemRow":""}>{item.updatedPrice}</td>
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
            <td className={item.isTaxChanged === true? "deletedItemRow":""}>
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
                                <th>Parent Name</th>
                                <th>Option Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.options.map((option)=>{
                                    return <>
                                    <tr>
                                        <th>{option.title}</th>
                                        <th>{(option.type==="multiple")?"Add-On":"Variation"}</th>
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
            <td className={item.isOptionsChanged === true? "deletedItemRow":""}>
                {
                    item.updatedOptions.length>0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>Parent Name</th>
                                <th>Option Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.updatedOptions.map((option)=>{
                                    return <>
                                    <tr>
                                        <th>{option.title}</th>
                                        <th>{(option.type === "multiple")?"Add-On":"Variation"}</th>
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
                <th>Pet Pooja Title (Updated)</th>
                <th>Accept Title Change</th>
                <th>Price</th>
                <th>Pet Pooja Price</th>
                <th>Accept Price Change</th>
                <th>Pos Id</th>
                <th>Tax</th>
                <th>Pet Pooja Tax (Updated)</th>
                <th>Accept Tax Change</th>
                <th>Category</th>
                <th>Existing Options</th>
                <th>Pet Pooja Options (Updated)</th>
                <th>Accept Option Change</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
    return table;
}