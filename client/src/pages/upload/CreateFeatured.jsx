import React,{ useEffect, useState} from 'react'
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';
import ContentTitle from '../../components/containers/ContentTitle';
import Dropdown from '../../components/dropdown/Dropdown';

function CreateFeatured() {
    const [collectionsInSystem, setCollectionsInSystem] = useState(null);
    // const [collectionNames, setCollectionNames] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    let collectionNames = [];
    useEffect(() => {
        // http://localhost:3000/profile
        const fetchCollections = async () => {
          const collectionsResponse = await fetch(`http://localhost:5000/api/collection/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          })
          const collectionsJson = await collectionsResponse.json()
          if (collectionsResponse.ok) {
            setCollectionsInSystem(collectionsJson);
            // console.log(collectionsJson);
          } else {
            // setDone(false);
          }
        }
    
        fetchCollections()
     }, []);
     useEffect(()=>{
        if(collectionsInSystem){
            if(collectionsInSystem.length != 0){
                for(let i = 0; i < collectionsInSystem.length; i++ ){
                    collectionNames.push(collectionsInSystem[i]._id);
                }
            }
        }
     },[collectionsInSystem])

     

  const handleOptionSelected = (option) => {
    // Do something with the selected option in the parent component
    setSelectedOption(option);
  };
    return (
    <AppContentWrapper>
      <PageContainer>
        <PageTitle><h2>Create Featured</h2></PageTitle>
        <p>Selected Option: {selectedOption}</p>
        <Dropdown options={collectionNames} onOptionSelected={handleOptionSelected}/>
        
        </PageContainer>
    </AppContentWrapper>
  )
}

export default CreateFeatured