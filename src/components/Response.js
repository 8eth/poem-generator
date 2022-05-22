import React from 'react'

function Response({prompt, poems}) {
  return (
    <div>
    
        <p> Prompt: {prompt} </p>
        <p> Response: {poems} </p>
        <p className='divider'></p>
        <br/>

    </div>
  )
}

export default Response