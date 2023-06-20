import React from 'react';
// import '../../app.css';
import './homePage.css';
import FL_splitter from '../../components/splitter/FL_splitter';
import CollectionCard from '../../components/cards/home/CollectionCard';
import FL_footer from '../../components/FL_Footer/FL_footer';

export default function Home() {
  // https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TempAssets%2Fimage%2028.png?alt=media&token=a86ebad3-fef1-4279-8361-f15639e62331
  // Temp assets
    
  return (
    <div className='mar-lr FL--home--cont '>
        <div className='FL--home--showcase--1'>

        </div>
        <FL_splitter/>
        <div className='FL--home--showcase--2'>
          <div className='FL--home--showcase--header'>
          <h3>Featured Collections</h3>
          </div>
         <CollectionCard/> 
         <CollectionCard/> 
         <CollectionCard/> 
         <CollectionCard/> 
         <CollectionCard/> 
         <CollectionCard/> 
         <CollectionCard/> 
         <CollectionCard/> 
        </div>
        <FL_splitter/>
        <FL_footer/>
    </div>
  )
}
