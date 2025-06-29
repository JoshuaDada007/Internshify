import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FaLinkedinIn } from "react-icons/fa";
import "../App.css"

export function Login() {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const ref = useRef()

  useEffect(() => {
    const titleRef = ref.current
    if (titleRef) {
      titleRef.classList.remove("typing")
      void titleRef.offsetWidth
      titleRef.classList.add("typing")
    }
  }, [])

  async function signIn(e) {
    e.preventDefault()

    try {
      const response = await axios.post(" http://10.0.0.205:8000/token/", { username, password })
      localStorage.setItem("accessToken", response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh)
      console.log(response.data)
      console.log("Signed in", username, password)
      navigate("/internships")
    } catch (e) {
      console.error(e)
      alert("Wrong Information please try again")
    }
  }

  return (
    <>
      <form onSubmit={signIn} className="row g-3 w-100 m-0" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        <h3 ref={ref} align="center">
          <span style={{ fontFamily: "monospace", width: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }}>
            <FaLinkedinIn /> 👨🏾‍💻
          </span>
        </h3>

        <div className="col-8 col-sm-8 col-md-6 col-lg-4">
          <label htmlFor="inputEmail4" className="form-label">Username</label>
          <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="inputEmail4" />
        </div>

        <div className="col-8 col-sm-8 col-md-6 col-lg-4">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="inputPassword4" />
        </div>

        <div className="col-4 col-sm-4 col-md-3 col-lg-2 text-center">
          <button type="submit" className="btn btn-primary w-100">Sign in</button>
          <p className="mt-2">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </>
  )
}