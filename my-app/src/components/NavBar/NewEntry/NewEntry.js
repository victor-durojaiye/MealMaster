import React, { memo } from 'react'

const NewEntry = memo(() => {
  return (
    <div className = "main">
        <div className = "inputs">
            <input type = "text"
            placeholder='Name for Input'
            value = ''/>    
            <input type = "text"
            placeholder='Calories'
            value = ''/>

            <input type = "text"
            placeholder='Protein'
            value = ''/>
            <input type = "text"
            placeholder='Carbohdrates'
            value = ''/>
            <input type = "text"
            placeholder='Fat'
            value = ''/>
        </div>
    </div>

  )
})

export default NewEntry