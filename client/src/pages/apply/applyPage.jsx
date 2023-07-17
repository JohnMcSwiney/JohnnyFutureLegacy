import React, { useState } from 'react'
import './applyPage.css';
import Checkbox from '../../components/checkbox/Checkbox';

export default function ApplyPage () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [image, setImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [socialMedia, setSocialMedia] = useState([]);
  const [expertiseTags, setExpertiseTags] = useState([]);
  const [involvementStatement, setInvolvementStatement] = useState('');
  
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  
  const handleDragEnter = e => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleDrop = e => {
    e.preventDefault()
    setIsDragging(false)

    const selectedImage = e.dataTransfer.files[0]
    setImage(selectedImage)
  }

  const handleImageChange = e => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Perform form validation
    const formErrors = {}

    if (!name.trim()) {
      formErrors.name = 'Name is required'
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
      formErrors.email = 'Invalid email format'
    }

    if (!message.trim()) {
      formErrors.message = 'Message is required'
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    // Form is valid, continue with form submission or data processing
    console.log('Form submitted:', { name, email, message })
    // Reset form fields and errors
    setName('')
    setEmail('')
    setMessage('')
    setErrors({})
    setImage(null)
  }

  const isValidEmail = email => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <div className='apply--page--cont'>
      <h2>APPLY</h2>
      <h4>
        Provide more information about your business in order to secure your
        place on Future Legacy.
      </h4>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            className={`apply--page--input ${errors.name && 'input--error'}`}
            placeholder='Full Name'
          />
          {errors.name && <span className='error'>{errors.name}</span>}
        </label>
        <br />
        <div className='imgdrop--title'>
          Profile Image:
          <div
            className={`dropzone ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label>
              {image ? (
                <img src={URL.createObjectURL(image)} alt='Selected' />
              ) : (
                <>
                  <span>Drag and drop an image here</span>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                </>
              )}
            </label>
          </div>
        </div>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter Your Email Address'
            className={`apply--page--input ${errors.email && 'input--error'}`}
          />
          {errors.email && <span className='error'>{errors.email}</span>}
        </label>
        <br />
        <label>
          Social Media:
          <input
            type='text'
            value={socialMedia}
            onChange={e => setSocialMedia(e.target.value)}
            placeholder='e.g. facebook.com/user, instagram.com/user'
            className={`apply--page--input ${errors.socialMedia && 'input--error'}`}
          />
          <h4 className='apply--input--note'>*note: use comma as separator if multiple socials</h4>
          {errors.email && <span className='error'>{errors.socialMedia}</span>}
        </label>
        <br/>
        <label>
          Your Area of Expertise:
          <input
            type='text'
            value={socialMedia}
            onChange={e => setSocialMedia(e.target.value)}
            placeholder='e.g. Night Photography, Wildlife, Portrait'
            className={`apply--page--input ${errors.expertiseTags && 'input--error'}`}
          />
          <h4 className='apply--input--note'>*note: use comma as separator if multiple</h4>
          {errors.expertiseTags && <span className='error'>{errors.expertiseTags}</span>}
        </label>
        <br/>
        <label>
          Provide link to your Portfolio <h4 className='apply--input--note' >(Optional) </h4>
          <input
            type='text'
            value={socialMedia}
            onChange={e => setSocialMedia(e.target.value)}
            placeholder='e.g. Night Photography, Wildlife, Portrait'
            className={`apply--page--input ${errors.expertiseTags && 'input--error'}`}
          />
          {errors.expertiseTags && <span className='error'>{errors.expertiseTags}</span>}
        </label>
        <label className='margin-top-15'>
          Project Involvement Statement:
          <textarea
            value={message}
            onChange={e => setInvolvementStatement(e.target.value)}
              className='apply--page--textarea'
            placeholder='Please describe your relevant experience and skills, as well as your motivation for wanting to be part of this project.'
          />
          {errors.message && <span className='error'>{errors.message}</span>}
        </label>
        
        <div className='statement--check--cont'>

        <input type="checkbox" id="statement" name="statement" value="I agree to these terms"/>
        <label for="statement"> I agree not to upload any content generated by artificial intelligence or machine learning algorithms. I acknowledge that such content may be subject to removal or legal action and that I am solely responsible for any content I upload.</label>  
        </div>
        <br />
        <button className='apply--submit' type='submit'>Submit</button>
      </form>
    </div>
  )
}
