import React from "react";

export default function UpdatedItems(props)
{
    let items = props.items;
    console.log(JSON.stringify(items));
    
    let rows = items.map((item,index)=>
    {
        return (
        <tr>
            <td>{item.title}</td>
            <td>{item.updatedTitle}</td>
            <td>{item.price}</td>
            <td>{item.updatedPrice}</td>
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
                    item.updatedTax.length>0 && 
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Value</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.updatedTax.map((tax)=>{
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
        </tr>
        );
    });

    let table = <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Updated Title</th>
                <th>Price</th>
                <th>Updated Price</th>
                <th>Pos Id</th>
                <th>Tax</th>
                <th>Updated Tax</th>
                <th>Category</th>
                <th>Options</th>
                <th>Updated Options</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
    return table;
}