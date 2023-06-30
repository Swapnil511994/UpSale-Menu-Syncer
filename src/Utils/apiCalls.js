import axios from "axios";
async function loadStoreMenu(id)
{
    let data = JSON.stringify({
        store: id
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.wcom.shop/api/getStoreData',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try 
    {
        const response = await axios.request(config);
        return response.data.data;
    } 
    catch (error) 
    {
        console.log(error);
        return null;
    }
}

async function loadTakeawayMenu(id)
{
    let data = JSON.stringify({
        store: id
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.wcom.shop/api/petpooja/loadPickupMenu',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try 
    {
        const response = await axios.request(config);
        return response.data;
    } 
    catch (error) 
    {
        console.log(error);
        return null;
    }
}

async function saveTakeawayMenu(id, requestData)
{
    let data = JSON.stringify({
        store: id,
        items: requestData
    });

    // console.log(JSON.stringify(data));

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.wcom.shop/api/petpooja/savePickupMenu',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    try 
    {
        const response = await axios.request(config);
        return response.data;
    } 
    catch (error) 
    {
        console.log(error);
        return null;
    }
}
export default {loadStoreMenu,loadTakeawayMenu,saveTakeawayMenu};
