import { useState } from 'react'
import './App.css'

function App() {

  const [emailText, setEmailText] = useState("")
  const [loading, setLoading] = useState(false)
  const [improvedText, setImprovedText] = useState("")
  const handleChange = (e) => {setEmailText(e.target.value)}
  const handleSubmit = async () => {
        if (!emailText.trim()) return

    setLoading(true)
    try {
      const response = await fetch("http://localhost:8000/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailText })
      })

      if (!response.ok) {
        throw new Error("Server error")
      }

      const data = await response.json()
      setImprovedText(data.improved) 
    } catch (err) {
      console.error(err)
      setImprovedText("Something went wrong. Check the backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    
  
    <div className="title-text">
      <h1>AI Email Improver</h1>  
    </div>

    <div>
      <h2> Please enter your email in the box below for improvements</h2>
    </div>
    
    <div className="text-input">
      <textarea
      value = {emailText}
      onChange={(e) => setEmailText(e.target.value)}
      rows = {3}
      placeholder = "Typing..."
      />
    </div>

    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Working on it..." : "Improve Email"}
      </button>
    </div>

    </>
  )
}

export default App;
