import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { PiStudentFill } from "react-icons/pi";

import "../App.css"

export function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function register(e) {
    try {
      e.preventDefault()
      setLoading(true)

      const data = { username, password, first_name, last_name, email }
      const response = await axios.post("https://internshify.onrender.com/blogapp/register", data)

      if (response) {
        const verifyUser = await axios.post("https://internshify.onrender.com/token/", { username, password })
        if (verifyUser) {
          localStorage.setItem("accessToken", verifyUser.data.access)
          localStorage.setItem("refreshToken", verifyUser.data.refresh)
        }
        setTimeout(() => {
          navigate("/internships")
        }, 3000)
      

 
   
    }

    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }


  return (
    <>

      <form onSubmit={register}>

        <div class="row" style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h3 class="typing" align="center">
            <span style={{ fontFamily: "monospace", width: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }}>
              Internships4U<PiStudentFill color="white" size={40} />
            </span>
          </h3> <br></br>
          <div class="row" style={{ display: "flex", justifyContent: "center" }}>
            <div class="col-4 col-sm-3 col-lg-2">
              <label for="exampleInputEmail1" class="form-label">First Name</label>
              <input onChange={e => setFirstName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> <br></br>
            </div>
            <div class="col-4 col-sm-3 col-lg-2">
              <label for="exampleInputEmail1" class="form-label">Last Name</label>
              <input onChange={e => setLastName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
          </div>
          <div class="col-8 col-sm-6 col-lg-4">
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input onChange={e => setUsername(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> <br></br>
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input onChange={e => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> <br></br>
          </div>
          <div class="col-8 col-sm-6 col-lg-4">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input onChange={e => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" /> <br></br>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60px" }}>
              <div className="loader"></div>
            </div>
          ) :
            <div className="col-4 col-sm-4 col-md-3 col-lg-2 text-center">
              <button style={{ padding: "7px", borderRadius: "10px" }}>Register </button>
              <p className="mt-2">Don't have an account? <Link to="/">login</Link></p>
            </div>}
        </div>





      </form>
    </>


  )
}