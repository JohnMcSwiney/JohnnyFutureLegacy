import React, { useState, useEffect } from 'react'
import CollectionCard from '../../components/cards/home/CollectionCard'
import './collectionStyle.css'
import {
  StyledContainer,
  StyledTitleContainer,
  StyledTitle,
  StyledTitle2,
  StyledSubTitle,
  StyledSubTitle2,
  StyledContentContainer,
  Avatar,
  StyledButton,
  ButtonGroup
} from '../../components/Styles'
import { BsViewStacked, BsGrid } from 'react-icons/bs';

function Browse_Collections() {

  const fillerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus lobortis libero at volutpat. Pellentesque non mi augue. Etiam semper porttitor rhoncus. Etiam tempus ipsum id ante egestas, in tincidunt nulla fermentum. Vivamus eros ante, ultrices a vulputate et, lobortis ullamcorper diam. Maecenas bibendum eu felis ac imperdiet. Vestibulum ut lorem mauris. Pellentesque a tortor mi. Sed laoreet nibh venenatis volutpat pretium. Proin venenatis erat efficitur vehicula rutrum. Cras nec velit sed turpis sagittis imperdiet sed vel tortor. Aliquam erat volutpat. Sed a sem tristique arcu elementum consectetur. Nullam eget sodales justo, eget dapibus ipsum. Integer lacinia finibus est, non iaculis nunc accumsan bibendum. Nullam tincidunt tortor sit amet neque blandit laoreet sed in lorem. Aliquam fermentum laoreet nisi vitae pellentesque. Donec eu dui metus. Suspendisse porttitor vestibulum sem, non blandit leo imperdiet sed. Maecenas sem turpis, varius vitae pharetra eget, bibendum ac velit. Nullam tincidunt consectetur tempus. Praesent feugiat sollicitudin feugiat. Nullam venenatis interdum nisi at dictum. Vestibulum aliquet mauris quis tempor ullamcorper. In interdum felis sit amet sapien gravida finibus. Ut efficitur, nisl sit amet elementum venenatis, nibh magna tempor dolor, sit amet egestas diam elit commodo lacus. Vestibulum suscipit convallis ex, sit amet commodo ante euismod lacinia. Nulla et felis ut erat elementum placerat eget a lacus. Etiam varius egestas lorem, eget molestie nibh iaculis quis. Ut vitae nisl et urna rutrum ullamcorper. Duis dictum justo id orci tristique, sed aliquam mi tristique. Phasellus commodo eros quis ipsum lacinia, id interdum purus varius. Suspendisse velit erat, maximus id nisl vitae, bibendum pulvinar felis. Phasellus magna libero, ultrices eget viverra lacinia, lobortis a tortor. Nam porttitor orci ac urna consectetur sollicitudin. Proin viverra est quam, ut dictum diam rutrum vel. Nulla lectus lacus, dictum vitae elit ac, sagittis tempus nunc. Vestibulum at pellentesque urna. Sed nisi nibh, mollis eget lacus euismod, hendrerit suscipit tortor. Sed sed tincidunt lorem. Donec justo nulla, suscipit id sem non, lacinia semper velit. Integer auctor aliquam ante. Etiam sed arcu nec magna mattis auctor. Nunc est arcu, porttitor vel pretium sit amet, congue nec lacus. Duis quis odio leo. Vestibulum finibus fringilla sollicitudin. Nam consectetur accumsan justo sed interdum. Mauris vel tristique risus, sed sodales ipsum. Nullam auctor id velit vel sollicitudin. Praesent tempus dolor id turpis tristique, in pharetra est feugiat. Cras semper aliquam felis, eu vehicula purus porttitor ut. Etiam enim neque, tincidunt eu elit quis, rutrum convallis lorem. Vivamus et ipsum vel dui sollicitudin laoreet. Morbi cursus ante sit amet lorem condimentum, vel congue neque sollicitudin. Fusce maximus accumsan vestibulum. Etiam sollicitudin tincidunt nisi, nec gravida risus sagittis vel. Integer at eros nunc. Pellentesque porttitor neque enim, id varius velit sollicitudin vel. Donec erat quam, condimentum elementum dignissim at, posuere vel urna. Donec metus est, dictum eget justo quis, accumsan ultrices lorem. In accumsan velit nec magna faucibus sagittis. Aenean pretium mollis turpis, a mattis turpis pretium in. Nunc augue nunc, rutrum a lacinia ac, lacinia at ipsum. Morbi tempus fringilla nisi, quis varius diam fringilla in. Mauris imperdiet laoreet laoreet. Donec tortor nibh, pellentesque in porttitor at, feugiat sed ipsum. Proin pellentesque purus et lectus luctus, sit amet feugiat enim elementum. Vivamus volutpat maximus mollis. Quisque convallis metus eu condimentum lobortis. Mauris suscipit vestibulum erat condimentum vestibulum. Quisque mattis venenatis quam vel imperdiet. Etiam mattis venenatis dui sit amet aliquam. Mauris a felis dui. Aenean in neque in nulla bibendum viverra in nec magna. Maecenas non dignissim dolor. Phasellus dapibus eu mauris non pharetra. Nulla sit amet odio libero. Quisque mollis urna quis nulla fringilla mollis. Donec a mauris ac lectus suscipit finibus. Sed blandit metus vitae massa rhoncus iaculis. Sed rutrum lobortis augue, at vestibulum massa hendrerit vitae. Vestibulum consequat orci id velit pharetra tincidunt. Praesent eget posuere sapien. Morbi volutpat placerat odio vel fermentum. Vivamus sit amet mollis felis. Donec sagittis ante sed mauris pulvinar fermentum. Nam aliquam, massa varius dictum commodo, eros justo lacinia nibh, eu efficitur lorem velit non massa. Praesent eget euismod ipsum. Duis ut tempus arcu. Vivamus pretium a erat sed lobortis. Curabitur auctor nibh volutpat pulvinar consectetur. Nam lobortis odio in magna tincidunt sollicitudin. Vestibulum ac neque dictum, scelerisque justo vitae, tempor tortor. Sed ultricies diam nisl, et accumsan lacus laoreet a. Curabitur tincidunt elit nec laoreet fringilla. Aliquam ut odio ut mauris viverra condimentum. Nunc congue semper dolor a eleifend. Integer tempus libero interdum ligula condimentum, vitae rutrum odio euismod. Nam ac semper ex. Ut vestibulum dolor purus, ut aliquet neque cursus at. Proin tincidunt maximus pulvinar. Vivamus consectetur porttitor egestas. Donec non ultricies nibh. Nam ac varius mi, ac vulputate diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam urna nisi, vehicula eu ornare id, maximus id nisi. Duis convallis dapibus nisl, at gravida leo feugiat in. Phasellus feugiat sed risus volutpat eleifend. Aliquam sollicitudin libero eu dolor sollicitudin, eget sagittis purus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis erat ut tellus viverra vestibulum. Nam at mauris turpis. In in facilisis nibh. Proin tincidunt pulvinar ex dignissim dapibus. Donec egestas elit diam, at aliquet leo lacinia ac. Nam suscipit quam enim, sed varius orci consectetur ac. Mauris consectetur mi eu leo dictum ornare. Donec facilisis ut eros venenatis fermentum. Duis nunc ipsum, eleifend sit amet gravida ac, vulputate quis metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam suscipit leo et arcu ultrices, at tempor augue semper. Suspendisse pretium, nisl vel tristique luctus, quam lacus hendrerit est, dignissim porttitor eros quam vitae enim. Cras mattis aliquet ipsum, ut pulvinar lorem rutrum ac. Duis diam lacus, sodales sed mollis nec, pharetra ultrices dui. Pellentesque fringilla arcu lorem. Etiam vehicula dolor eget erat ultricies, viverra ornare arcu interdum. Integer sed molestie diam. Donec varius magna porta odio viverra fringilla. Morbi feugiat nulla est, ultricies ornare urna maximus ultricies. Phasellus porttitor diam a orci condimentum, id malesuada erat rhoncus. Pellentesque dui ante, egestas nec aliquam sit amet, pulvinar maximus purus. Quisque mi tortor, interdum sit amet vehicula sed, tempor non magna. Duis at iaculis arcu. Ut congue ante pretium felis dapibus, nec aliquam purus rutrum. Mauris et diam interdum, egestas tortor et, tempor nisl. Pellentesque congue, ex vel consectetur blandit, nisi turpis lacinia ipsum, at tincidunt ipsum neque vitae lorem. Donec porta vulputate nulla. Pellentesque porta vestibulum risus, eget imperdiet dolor elementum non. Phasellus luctus efficitur lectus ut interdum. Praesent vestibulum lacus ut sem faucibus, sed suscipit sem mattis. Phasellus in erat id elit laoreet consectetur sed a ligula. Etiam fermentum non tortor quis finibus. Etiam volutpat, libero a convallis tempus, elit felis molestie sapien, non facilisis felis sapien et sapien. Quisque vel lacus at ex efficitur ultricies quis vitae sem. Mauris elementum suscipit ipsum sed semper. Donec tristique vestibulum neque eu euismod. Phasellus placerat tellus velit, sed tincidunt mauris aliquam vel. Suspendisse tristique ac quam vel bibendum. In id tincidunt nisi, at feugiat lorem. Maecenas mollis tellus a purus gravida laoreet. Fusce pretium id elit in malesuada. Vivamus porta, nulla ac fringilla bibendum, leo mauris consequat erat, vitae malesuada dolor risus nec elit. Donec turpis enim, molestie non sodales sed, pretium et magna. Etiam eu dui dapibus, vestibulum enim sit amet, venenatis sapien. Cras vulputate metus eget massa laoreet, vitae varius magna imperdiet. Sed gravida condimentum ex sit amet ultricies. Cras eget ante pharetra, mollis libero et, cursus nibh. Integer scelerisque ullamcorper nisl vitae mattis. Maecenas imperdiet maximus ex, eget egestas odio porta in. Phasellus augue ante, consequat eget nulla in, tempus egestas sapien. Nulla at leo aliquet, pretium dui et, laoreet ante. Sed suscipit aliquam ultrices. Cras arcu felis, euismod eget justo luctus, gravida sagittis augue. In vitae accumsan est. Nunc tincidunt dolor orci, a lacinia leo dapibus at. Nam rutrum felis sed orci varius rhoncus vitae eget nisi."

  const [toggleView, setToggleView] = useState(false);
  useEffect(() => {
    // localStorage.setItem('collectionView', toggleView)
  }, [toggleView])

  const [collectionsData, setCollectionsData] = useState(null);
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
        setCollectionsData(collectionsJson);
        // console.log(collectionsJson);
      } else {
        // setDone(false);
      }
    }

    fetchCollections()

  }, []);


  return (
    <StyledContainer>

      <StyledTitleContainer>
        <StyledTitle2 size={35}>
          <div>collections</div>
        </StyledTitle2>
      </StyledTitleContainer>

      <StyledContentContainer>
        <StyledSubTitle2>
          Clients
        </StyledSubTitle2>
        <div className='view--toggle--cont'>
          <p>View</p>
          <button className="view--trigger--button" onClick={() => setToggleView(!toggleView)}>
            {toggleView ? <BsViewStacked /> : <BsGrid />}
          </button>
        </div>
        {collectionsData ? 

        
        <div className={toggleView ? 'content--cont row' : 'content--cont grid'}>
          {collectionsData.map((collection) => (
            <CollectionCard
              key={collection._id} // Provide a unique key for each component
              toggleView={toggleView}
              collectionIn={collection} // Use the appropriate property from your data
              // collectionImg={collection.imageUrl} // Use the appropriate property from your data
            />
          ))} 

        </div>: <div>
          No Collections Grabbed
        </div>
        } 
      </StyledContentContainer>

    </StyledContainer>
  )
}

export default Browse_Collections