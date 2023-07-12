import axios from "axios";
//#region Store API Calls
    async function loadStores()
    {
        let data = '';
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.wcom.shop/api/getStoresList',
            headers: { },
            data : data
        };

        axios.request(config).then((response) => {
            // console.log("Api Called");
            // setStores(response.data.data);
            return response.data.data;
        })
        .catch((error) => 
        {
            console.error("Unable To Load UpSale Stores");
            console.error(error);
        });
    }

    async function loadStoreIntegration(id)
    {
        let data = JSON.stringify({
            store: id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.wcom.shop/api/getStoreIntegration',
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
//#endregion

//#region Pet Pooja
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

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.wcom.shop/api/saveData',
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

    async function loadTriggerHistory(id)
    {
        let data = JSON.stringify({
            store: id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.wcom.shop/api/petpooja/loadTriggerHistory',
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

    async function loadTriggerHistoryData(id)
    {
        let data = JSON.stringify({
            triggerId: id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.wcom.shop/api/petpooja/loadTriggerData',
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

    async function loadDineInData(id)
    {
        let data = JSON.stringify({
            store: id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.wcom.shop/api/petpooja/loadDineData',
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

//#endregion

export default {
                    loadStores,
                    loadStoreIntegration,
                    loadStoreMenu,
                    loadTakeawayMenu,
                    saveTakeawayMenu,
                    loadTriggerHistory,
                    loadTriggerHistoryData,
                    loadDineInData
                };
