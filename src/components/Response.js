import React from 'react'

function Response({prompt, poems}) {
  return (
    <div>

        <h2> Responses </h2>
        <p> Prompt: {prompt} </p>
        <p> Response: {poems} </p>



    </div>
  )
}

export default Response