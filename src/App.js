import React from 'react';
import './App.css';
import Header from './Components/Header';
import Body from './Components/Body';
import apiCalls from './Utils/apiCalls';
import axios from 'axios';

//loader
import {Dna} from "react-loader-spinner";

function App() {
  //#region Store Selection States, and Methods
    const [stores,setStores] = React.useState([]);
    const [selectedStore, setSelectedStore] = React.useState({});
    const [storeIntegration, setStoreIntegration] = React.useState({});
    const [processing, setProcessing] = React.useState(true);

    async function selectStore(storeVal)
    {
      let storesToSelect = stores.filter((store)=>{
        return store.id === storeVal;
      });
      if(storesToSelect.length>0)
      {
        let myStore = storesToSelect[0];
        setSelectedStore(myStore);
        try 
        {
          let integrationResponse = await apiCalls.loadStoreIntegration(myStore.id);
          console.log(integrationResponse);
          if(integrationResponse.status === true)
          {
            setStoreIntegration(integrationResponse.data);
          }
          else
          {
            setStoreIntegration({});
          }
        } 
        catch (error) 
        {
          console.log(error);  
        }
      }
      else
      {
        console.error("Selection Error Bois");
      }
      
      // console.log(`Store Selected: ${JSON.stringify(selectedStore)}`);
    }

    React.useEffect(()=>
    {
      let data = '';
      let config = 
      {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.wcom.shop/api/getStoresList',
        headers: { },
        data : data
      };

      axios.request(config).then((response) => {
        // console.log("Api Called");
        setStores(response.data.data);
        updateProcessing(false);
      })
      .catch((error) => 
      {
        console.error("Unable To Load UpSale Stores");
        console.error(error);
      });
    },[]);

    function updateProcessing(val)
    {
      setProcessing(val);
    }
  //#endregion

  return (
    <>
      <div className='container'>
        <Header handleStoreChange={selectStore} allStores={stores} selectedStore={selectedStore} />
        {
          (storeIntegration.title && storeIntegration.title.length>0) ? 
          <Body 
            selectedStore={selectedStore} 
            integrationData={storeIntegration} 
            processingFlag={processing} 
            handleProcessingChange={updateProcessing} 
          />
          :
          <div>
            <h1>No Integration Found</h1>
            <p>SetUp store for PetPooja/ TMBill Integration,
              Once done the Load Menu options will appear based on the integration type.
            </p>
          </div>
        }
      </div>
      <div className={processing===true?"overlay":"overlay__hidden"}>
        <Dna
          visible={true}
          height="150"
          width="150"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </>
  );
}

export default App;
