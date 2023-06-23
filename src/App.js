import React from 'react';
import './App.css';
import Header from './Components/Header';
import Body from './Components/Body';
import axios from 'axios';

function App() {
  //#region Store Selection States, and Methods
    const [stores,setStores] = React.useState([]);
    const [selectedStore, setSelectedStore] = React.useState({});

    function selectStore(storeVal)
    {
      let storesToSelect = stores.filter((store)=>{
        return store.id === storeVal;
      });
      if(storesToSelect.length>0)
      {
        setSelectedStore(storesToSelect[0]);
      }
      else
      {
        console.error("Selection Error Bois");
      }
      
      console.log(`Store Selected: ${JSON.stringify(selectedStore)}`);
    }

    React.useEffect(()=>
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
            console.log("Api Called");
            setStores(response.data.data);
        })
        .catch((error) => 
        {
            console.error("Unable To Load UpSale Stores");
            console.error(error);
        });
        
    },[]);
  //#endregion

  return (
    <div className='container'>
      <Header handleStoreChange={selectStore} allStores={stores} selectedStore={selectedStore} />
      {selectedStore.id && <Body selectedStore={selectedStore} />}
    </div>
  );
}

export default App;
