import React from 'react';
import './Checkbox.css';
import { FaCheck } from 'react-icons/fa';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleCheckboxChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { checked } = this.state;
  
    return (
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={this.handleCheckboxChange}
        />
        <span className="checkmark">
          {checked && <FaCheck />}
        </span>
        {this.props.label}
      </label>
    );
  }
  
  
}

export default Checkbox;