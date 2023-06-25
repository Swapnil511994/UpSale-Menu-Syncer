import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

export default function OptionValues(props)
{
    let optionItems = props.optionItems;
    if(!optionItems || optionItems.length <= 0) return null;

    const columns = [
        { key: "id", name: "Id", resizable:true, sortable: true },
        { key: "title", name: "Title", resizable:true, sortable: true },
        { key: "pos_option_value_id", name: "Pos Id", resizable:true, sortable: true },
        { key: "price", name: "Price", resizable:true, sortable: true }
    ];

    const rows = optionItems;

    return <DataGrid columns={columns} rows={rows} />;
}