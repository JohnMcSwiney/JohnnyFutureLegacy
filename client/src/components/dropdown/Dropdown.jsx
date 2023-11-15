import React, { useState } from 'react';
import './style.css';

const Dropdown = ({ options, onOptionSelected }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(true); // Initially open
  const [isDropdownDisabled, setDropdownDisabled] = useState(false);

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setDropdownOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    // Pass the selected option back to the parent component
    onOptionSelected(option);
    // Close the dropdown and disable it
    setDropdownOpen(false);
    setDropdownDisabled(true);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} disabled={isDropdownDisabled}>
        Dropdown
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <a key={index} href="#" onClick={() => handleOptionClick(option)}>
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
