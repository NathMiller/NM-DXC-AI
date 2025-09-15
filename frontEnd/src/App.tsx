import { useState } from 'react'
import './App.css'

interface ImproveEmailResponse {
  improved: string;
}

function App() {

  const [emailText, setEmailText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [improvedText, setImprovedText] = useState<string>("")
  const [error, setError] = useState<string| null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  const handleSubmit = async () => {
        if (!emailText.trim()) return

    setLoading(true)
    setError(null);
    setImprovedText("");

    try {
      const response = await fetch(`${BACKEND_URL}/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailText })
      })

      if (!response.ok) {
        throw new Error("Server error")
      }

      const data: ImproveEmailResponse = await response.json()
      setImprovedText(data.improved) 
    } catch (err: any) {
      console.error(err)
      setError("Something went wrong. Check the backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <h1>AI Email Improver</h1>  
    <h2> Please enter your email in the box below for improvements</h2>
 
    <div>
      <textarea
      className = "text-input"
      value = {emailText}
      onChange={(e) => setEmailText(e.target.value)}
      rows = {5}
      placeholder = "Typing..."
      />
    </div>

    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Working on it..." : "Improve Email"}
      </button>
    </div>

    <div className="text-output">
      {error ? <p>{error}</p> : <p>{improvedText}</p>}
    </div>

    </>
  )
}

export default App;
