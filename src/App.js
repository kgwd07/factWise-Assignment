import React, { useState } from 'react';
// import data from './data';
import celebrityData from './celebrityData';
import Celebrity from './Celebrity';
function App() {
  const [celebInfoList, setCelebInfoList] = useState(celebrityData);
  const [currentId, setCurrentId] = useState(null)
  const [disableToggleBtn, setDisableToggleBtn] = useState(false)

  const showInfo = id => {
    setCurrentId(currentId !== id ? id : null)
  }

  const removeCelebFromList = (id) => {
    let newCelebList = celebInfoList.filter(item => item.id !== id)
    setCelebInfoList(newCelebList)
  }

  const editSingleCeleb = (id, updatedData) => {

    let updatedcelebDetail = celebInfoList.map(item => {
      if (item.id === id) {
        const { age, gender, country, description } = updatedData
        return { ...item, dob: age, country, gender, description }
      }
      return item
    })
    setCelebInfoList(updatedcelebDetail)
  }

  return (
    <main>
      <div className='container'>
        <h3>most famous celebrities</h3>
        <section className='info'>
          {celebInfoList.map((singleCeleb) => {
            return (
              <Celebrity
                key={singleCeleb.id}
                open={currentId === singleCeleb.id}
                toggle={showInfo}
                disableToggleBtn={disableToggleBtn}
                setDisableToggleBtn={setDisableToggleBtn}
                removeCelebFromList={removeCelebFromList}
                editSingleCeleb={editSingleCeleb}
                {...singleCeleb}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
