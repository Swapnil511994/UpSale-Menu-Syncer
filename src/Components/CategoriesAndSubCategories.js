import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

export default function CategoriesAndSubCategories(params) 
{
    let assocs = params.assoc;
    if(!assocs || assocs.length<=0) return null;

    let columns = [
        { key: 'id', name: 'Id' },
        { key: 'title', name: 'Title' },
        { key: "menu", name: "Menu" },
        { key: 'pos_category_id', name: 'Pos Category Id' },  
    ];

    let rows = [];
    for (let i = 0; i < assocs.length; i++) {
        const assoc = assocs[i];
        if(assoc.categoryObj)
        {
            let catSubObj = {}; 
            catSubObj.id = assoc.categoryObj.id;
            catSubObj.title = (assoc.subcategoryObj)? `${assoc.subcategoryObj.title} (${assoc.categoryObj.title})`:assoc.categoryObj.title;
            catSubObj.menu = (assoc.categoryObj.menuObj)? `${assoc.categoryObj.menuObj.title}`: null;
            catSubObj.pos_category_id = assoc.categoryObj.pos_category_id;
            rows.push(catSubObj);
        }
        else
        {
            //do nothing
        }
    }

    return <DataGrid columns={columns} rows={rows} />;
}