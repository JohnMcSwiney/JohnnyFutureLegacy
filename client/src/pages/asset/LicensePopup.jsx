import React, {useEffect, useState} from 'react'
import { AiOutlineInfoCircle } from "react-icons/ai";
const LicensePopup = ({ licenseType, onConfirm, onCancel }) => {
    const [popupText, setPopupText] = useState('no license type provided by parent component, attempt reloading, or submit a bug report');
    const [popupTitle, setPopupTitle] = useState('Error, please reload page...');
    const noteTitle = 'Please note that your licensed asset may only be used in the contexts outlined in the subscription tier you currently have, asset usage guidelines for more info (link here)';
    useEffect(()=>{
        if(licenseType){
            console.log('we have a type var,')
            if(licenseType === 'edu-use'){
                console.log('Educational Use');
                setPopupTitle('Educational');
                handleTextUpdate();
            }
            if(licenseType === 'edit-use'){
                console.log('Editorial Use');
                setPopupTitle('Editorial');
                handleTextUpdate();
            }
            if(licenseType === 'comm-use'){
                console.log('Commercial Use');
                setPopupTitle('Commercial');
                handleTextUpdate();
            }
        }
    },[])


    const handleTextUpdate = () =>{
        let temp = 'Package Price When you purchase a Package Price (PP) from Future Legacy, LLC, the license usage, duration, and print region are pre-packed by the seller and offered for one price. PP licenses sold by Future Legacy, LLC are Non-Exclusive, meaning that your purchase of a license does not provide you with the exclusive rights to use the content. '
        setPopupText(temp);
    }


    return (
      <div className="asset--popup-container">
        <div className="asset--popup">
          <a>LICENSING TERMS AND AGREEMENT</a>
          <h2>{popupTitle} ONLY</h2>
          
          <p className='popup--text'>{popupText}</p>
          <div className='asset--popup--bot'>
            <div className='asset--popup--note'>
            <div className='asset--popup--note--icon'><AiOutlineInfoCircle /></div>
            <p>{noteTitle}</p>
          </div>
          <div className='asset--popup--btns'>
          
            <button className='popup--btn btn--primary' onClick={onConfirm}>License Included With Credit Card</button>  
            
            <button className='popup--btn btn--secondary' onClick={onCancel}>Cancel</button>
          </div>
          </div>
          
         
        </div>
      </div>
    );
  };
export default LicensePopup