import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

export default function Taxes(props)
{
    let taxes = props.tax_data;
    // console.log(taxes);
    if(!taxes || taxes.length<=0) return null;

    const columns = [
        { key: 'title', name: 'Title' },
        { key: 'type', name: 'Type' },
        { key: 'value', name: 'Value' },    
    ];

    const rows = taxes;

    return <DataGrid columns={columns} rows={rows} />;

    // let tableRows = taxes.map((tax)=>{
    //     return <tr>
    //         <td>{tax.title}</td>
    //         <td>{tax.type}</td>
    //         <td>{tax.value}</td>
    //         </tr>;
    // });

    // console.log(taxes);
    // console.log(tableRows);
    // return <table border={1} className="tax__table">{tableRows}</table>;
}