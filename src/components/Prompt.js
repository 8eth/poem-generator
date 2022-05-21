import React, { useState }  from 'react'
import Response from './Response.js'

function Prompt() {

  const [poems, setPoems] = useState()

  const [formData, setFormData] = useState({
    prompt: "",
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    // "stop": [" Human:", " AI:"]
  })

  const initialFormState = {
    prompt: ""
  }
    
  function onCreatePoem(newPoem) {
    // setPoems([...poems, newPoem])
    setPoems(newPoem)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPoem = {
      prompt: formData.prompt,
    }

    fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
      },
      body: JSON.stringify(newPoem),
    })
    .then(response => response.json())
    .then((poems) => onCreatePoem(poems))
    .then(setFormData(initialFormState))
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <div className="center-content">
        <div className='form-border'>
          <form 
            className="ui form"
            onSubmit={(e) => handleSubmit(e)}
            >

            <label htmlFor="taste">Enter prompt </label>
            <br/>
            
            <textarea
              name="prompt"
              type="text"
              rows="4"
              cols="80"
              id={FormData.prompt}
              value={formData.prompt}
              onChange={(e) => handleChange(e)}
            />
            <br/>
            <br/>

            <button className="ui button center" type="submit">Submit</button>
          </form>
        </div>
      </div>   

      <p className='divider'></p>
      <br/>

      <Response 
        prompt = {formData.prompt}
        poems = {poems}
      />

    </div>
  )
}

export default Prompt