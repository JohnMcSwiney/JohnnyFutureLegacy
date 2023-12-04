import React, { useState } from 'react';
import SingleFileInput from './upload_Components/SingleFileInput';
import ConfirmationPopup from './ConfirmationPopup';

function UserBannerUpload() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleFileSubmit = (file, uploadResponse) => {
    // Handle the file and uploadResponse, e.g., display in the UI, send to the server, etc.
    console.log('response:', file);
    // console.log('Upload Response:', uploadResponse);

    // Additional logic can be added here, such as displaying the file or sending it to the server
  };

  return (
    <div>
      {isPopupVisible && (
        <ConfirmationPopup
          message="Confirm the uploading of this Banner?"
          onConfirm={() => setPopupVisible(false)}
          onCancel={() => setPopupVisible(false)}
        />
      )}

      {/* Render the SingleFileInput component */}
      <SingleFileInput onSubmit={handleFileSubmit} />

      {/* You can add more UI elements or buttons as needed */}
      <button onClick={() => setPopupVisible(true)}>Show Confirmation Popup</button>
    </div>
  );
}

export default UserBannerUpload;
