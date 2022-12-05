import React, { useState } from 'react';

import moment from 'moment/moment';

import { BsChevronUp, BsChevronDown, BsTrash } from 'react-icons/bs'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import Modal from './Modal'



const NUMBER_REGEX = /^[0-9\b]+$/;
const CHARACTER_REGEX = /^[a-zA-Z \b]+$/;
const genderOptionList = ["male", "female", "transgender", "rather not say", "other"]

const Celebrity = ({ id, first, dob, gender, country, description, open, toggle, picture, disableToggleBtn, setDisableToggleBtn, removeCelebFromList, editSingleCeleb }) => {

  let age = moment().diff(dob, 'years')

  const [celebDetails, setCelebDetails] = useState({ "age": age, "gender": gender, "country": country, "description": description })
  const [showEdit, setShowEdit] = useState(true)
  const [isFieldDisabled, setIsFieldDisabled] = useState(true)
  const [errorObj, setErrorObj] = useState({ "age": false, "gender": false, "country": false, "description": false }
  )
  const [isModalOpen, setIsModalOpen] = useState(true)



  const handleInputChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case "age":
        if (!NUMBER_REGEX.test(value.slice(-1)) && value.length > 0) return
        break;

      case "country":
        if (!CHARACTER_REGEX.test(value.slice(-1)) && value.length > 0) return
        break;

      default:
        break;
    }

    setCelebDetails({ ...celebDetails, [name]: value })

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const emptyDetails = {}

    for (const property in celebDetails) {
      if (!celebDetails[property]) emptyDetails[property] = true
    }

    if (Object.keys(emptyDetails).length > 0) {
      setErrorObj({ ...errorObj, ...emptyDetails })
      return
    } else {
      setErrorObj({ "age": false, "gender": false, "country": false, "description": false })
    }

    editSingleCeleb(id, celebDetails)
    toggleEdit(e)
  }

  const toggleEdit = (e) => {
    e.preventDefault()
    setShowEdit(!showEdit)
    setIsFieldDisabled(!isFieldDisabled)
    setDisableToggleBtn(!disableToggleBtn)
  }

  const deleteCelebFunc = (e, id) => {

    if (window.confirm('Are you sure you want to Delete?')) {
      // Delete it!
      removeCelebFromList(id)
    } else {
      e.preventDefault()
    }

  }

  return (
    <>
      <article className='celebrity'>
        <header>
          <div className="title-container">
            <img src={picture} alt={first} className="person-img" />
            <h4 className='title'>{first}</h4>
          </div>
          <button disabled={disableToggleBtn} className='btn' onClick={() => toggle(id)}>
            {open ? <BsChevronDown /> : <BsChevronUp />}
          </button>
        </header>

        {open && <form>
          <div className="celeb-details-container">
            <div className='form-control'>
              <span className='input-label'>Age</span>
              <input
                type='text'
                className={isFieldDisabled ? 'input-field disabled-bg' : 'input-field'}
                disabled={isFieldDisabled}
                placeholder='Age'
                value={celebDetails.age}
                name="age"
                onChange={(e) => handleInputChange(e)}
              />
              {errorObj["age"] ? <span className='error-msg'>this field is mandatory</span> : null}
            </div>

            <div className='form-control'>
              <span className='input-label'>Gender</span>
              <select
                name='gender'
                value={celebDetails.gender}
                onChange={(e) => handleInputChange(e)}
                className={isFieldDisabled ? 'input-field disabled-bg select-disabled' : 'input-field'}
                disabled={isFieldDisabled}
              >
                <option defaultValue>{celebDetails.gender}</option>
                {genderOptionList.filter(item => item !== gender).map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div className='form-control'>
              <span className='input-label'>Country</span>
              <input
                type='text'
                className={isFieldDisabled ? 'input-field disabled-bg' : 'input-field'}
                disabled={isFieldDisabled}
                placeholder='country'
                name="country"
                value={celebDetails.country}
                onChange={(e) => handleInputChange(e)}
              />
              {errorObj.country ? <span className='error-msg'>this field is mandatory</span> : null}
            </div>
          </div>

          <div className='form-control textarea'>
            <span className='input-label'>Description</span>
            <textarea
              className={isFieldDisabled ? 'input-field disabled-bg text-area-disabled' : 'input-field'}
              disabled={isFieldDisabled}
              name="description"
              rows="7" cols="50"
              value={celebDetails.description}
              onChange={(e) => handleInputChange(e)}
            />
            {errorObj.description ? <span className='error-msg'>this field is mandatory</span> : null}
          </div>

          {showEdit ?
            <div className="btn-container">
              <button className='btn' onClick={toggleEdit}>
                <BiPencil className='btn-danger' />
              </button>
              <button className='btn' type='submit' onClick={(e) => deleteCelebFunc(e, id)}>
                <BsTrash className='btn-success' />
              </button>
            </div>
            :
            <div className="btn-container">
              <button className='btn' onClick={handleSubmit}>
                <AiOutlineCheckCircle className='btn-success' />
              </button>
              <button className='btn'>
                <AiOutlineCloseCircle className='btn-danger' onClick={toggleEdit} />
              </button>
            </div>

          }
        </form>}
      </article>

      {/* <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </>
  );
};

export default Celebrity;
