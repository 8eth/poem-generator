import React from 'react'

function Response({prompt, poems}) {
  return (
      <div className='center aligned cards'>
        <div className='ui card'>
            <br/>
            <h4> Prompt </h4>
            <p> {prompt} </p>
            <p className='divider'></p>      
            <h4>Response </h4>
            <p> {poems} </p>

            <br/>
        </div>
    </div>
  )
}

export default Response