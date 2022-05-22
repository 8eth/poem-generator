import React, { useState }  from 'react'
import Response from './Response.js'

function Prompt() {

  const [poems, setPoems] = useState([])

  const [formData, setFormData] = useState({
    prompt: "Write a poem about ",
    temperature: 50,
    max_tokens: 300,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })

  const initialFormState = {
    prompt: "Write a poem about ",
    temperature: 50
  }
    
  function onCreatePoem(newPoem) {
    setPoems([...poems, {
      prompt: formData.prompt,
      response: newPoem.choices[0].text,
    }])
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPoem = {
      prompt: formData.prompt,
      temperature: (formData.temperature)/100.0,
      max_tokens: 300,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
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

  const poemList = poems.map((poem, index) => 
    <Response 
      key= {index}
      prompt = {poem.prompt}
      poems = {poem.response}
    />
  ).reverse()

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

            <label htmlFor="taste">Randomness: {formData.temperature/100.0}</label>
            <br/>
            <input
              name='temperature'
              type='range'
              min='0'
              max='99'
              id={FormData.temperature}
              value={formData.temperature}
              onChange={(e) => handleChange(e)}
            />

            <br/>
            <br/>

            <button className="ui button center" type="submit">Submit</button>
          </form>
        </div>
      </div>   

      <p className='divider'></p>
      <h2> Responses </h2>
      <p className='divider'></p>      
      <br/>

      <div className="ui one column grid">
        <div className="ui center aligned ten wide row grid container">{poemList}</div>
        <br/>
      </div>

    </div>
  )
}

export default Prompt