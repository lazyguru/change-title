import { useState, useEffect } from 'react'

/**
 * This function takes in a new stream title, encodes it,
 * submits it to the server, and returns the new stream title
 * to be updated in the react component.
 *
 * @param {string} streamTitle
 * @returns {string}
 */
function updateStreamTitle(streamTitle) {
  streamTitle = encodeURIComponent(streamTitle)
  fetch(`/set-title?title=${streamTitle}`)
  return streamTitle
}

function App() {
  const [streamTitle, setStreamTitle] = useState("")
  /**
   * This function is called when the form is submitted.
   * It prevents the default behavior of the form, which
   * is to refresh the page. It then calls the updateStreamTitle
   * function to update the stream title.
   * @param {Event} event
   * @returns {void}
   * @see updateStreamTitle
   * @see https://reactjs.org/docs/events.html
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event
   */
  const formSubmitted = (event) => {
    event.preventDefault()
    setStreamTitle(updateStreamTitle(event.target.elements.title.value))
  }

  /**
   * Use effect is a react hook that is called when the component
   *  is mounted. It is used here to fetch the stream title from
   *  the server and set it in the react component.
   * @see https://reactjs.org/docs/hooks-effect.html
   */
  useEffect(() => {
    if (streamTitle == '') {
      fetch('/get-title').then((res) => res.text()).then((title) => setStreamTitle(title))
    }
  }, [streamTitle])

  return (
    <>
      <h1>Change Title</h1>
      <form onSubmit={formSubmitted}>
        <textarea name="title" defaultValue={streamTitle} onChange={(event) => setStreamTitle(event.target.value)}></textarea>
        <br/>
        <input type="submit" value="Save"/>
      </form>
    </>
  )
}

export default App
