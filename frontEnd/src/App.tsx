import { useState } from 'react'
import './App.css'

interface ImproveEmailResponse {
  improved: string;
}

function App() {

  const [emailText, setEmailText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [improvedText, setImprovedText] = useState<string>("")



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

      const data: ImproveEmailResponse = await response.json()
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
      rows = {5}
      style={{width: "40%"}}
      placeholder = "Typing..."
      />
    </div>

    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Working on it..." : "Improve Email"}
      </button>
    </div>

    <div className="text-output">
      <p>{improvedText}</p>
    </div>

    </>
  )
}

export default App;
