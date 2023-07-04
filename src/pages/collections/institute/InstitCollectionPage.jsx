import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import institutionsData from '../tempAssets/tempInstit.json';
import ImageContainer from '../../../components/containers/ImageContainer';
import InstHomeColl_ImageContainer from './InstColl_ImageContainer';
import './style.css';

function InstitCollectionPage() {
  const { param1, param2 } = useParams();

  if (param2) {
    // Render content when param2 is defined
    return <div>Param1: {param1}, Param2: {param2}</div>;
  } else {
    // Render content when param2 is not defined
    return <div>Param1: {param1}</div>;
  }
}


export default InstitCollectionPage;



// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import institutionsData from '../tempAssets/tempInstit.json';
// import ImageContainer from '../../../components/containers/ImageContainer';
// import InstHomeColl_ImageContainer from './InstColl_ImageContainer';
// import './style.css';

// function InstitCollectionPage() {
//   const { id, collectionId } = useParams();
//   const [institutions, setInstitutions] = useState(institutionsData.institutions);

//   return (
//     <div className='instit--collhomepage--main--cont'>
//       {institutions.map((institution) => {
//         if (institution.id === id) {
//           if (collectionId) {
//             // Render content for a specific collection
//             const collection = institution.collections.find(
//               (coll) => coll.id === collectionId
//             );
//             if (id && collectionId) {
//               return (
//                 <div className='instit--collhomepage--cont' key={institution.id}>
//                   <div className='instit--collhomepage--title--cont'>
//                     <div className='instit--collhomepage--title--img'>
//                       <ImageContainer
//                         imageUrl={institution.imgurl}
//                         aspectRatio={3 / 3}
//                       />
//                     </div>
//                     {institution.name}
//                   </div>
//                   <div className='instit--collhomepage--content--cont'>
//                     {collectionId}
//                     {/* <div
//                       className='browse--instit--collection--card--1'
//                       key={collection.id}
//                     >
//                       <InstHomeColl_ImageContainer
//                         imageUrl={collection.imgurl}
//                         collName={collection.name}
//                         parentid={institution.id}
//                         collectionid={collection.id}
//                       />
//                     </div>
//                     {collection.description} */}
//                   </div>
//                 </div>
//               );
//             } else {
//               // Handle case when collectionId is not found
//               return (
//                 <div className='instit--collhomepage--cont' key={institution.id}>
//                   <div className='instit--collhomepage--title--cont'>
//                     <div className='instit--collhomepage--title--img'>
//                       <ImageContainer
//                         imageUrl={institution.imgurl}
//                         aspectRatio={3 / 3}
//                       />
//                     </div>
//                     {institution.name}
//                   </div>
//                   <div className='instit--collhomepage--content--cont'>
//                     Collection not found.
//                   </div>
//                 </div>
//               );
//             }
//           } else {
//             // Render content for the institute's home page
//             return (
//               <div className='instit--collhomepage--cont' key={institution.id}>
//                 <div className='instit--collhomepage--title--cont'>
//                   <div className='instit--collhomepage--title--img'>
//                     <ImageContainer
//                       imageUrl={institution.imgurl}
//                       aspectRatio={3 / 3}
//                     />
//                   </div>
//                   {institution.name}
//                 </div>
//                 <div className='instit--collhomepage--content--cont'>

//                   {institution.collections.map(collection => (
//                   <div
//                     className='browse--instit--collection--card--1'
//                     key={collection.id}
//                   >
//                     <InstHomeColl_ImageContainer
//                       imageUrl={collection.imgurl}
//                       collName={collection.name}
//                       parentid={institution.id}
//                       collectionid={collection.id}
//                     />
//                   </div>
//                 ))}
//                 {institution.description}
                    

//                 </div>
//               </div>
//             );
//           }
//         }
//         return null;
//       })}
//     </div>
//   );
// }

// export default InstitCollectionPage;










// {institution.collections.map(collection => (
//   <div
//     className='browse--instit--collection--card--1'
//     key={collection.id}
//   >
//     <InstHomeColl_ImageContainer
//       imageUrl={collection.imgurl}
//       collName={collection.name}
//       parentid={institution.id}
//       collectionid={collection.id}
//     />
//   </div>
// ))}
// {institution.description}
//   </div>