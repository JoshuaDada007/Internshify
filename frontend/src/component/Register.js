import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const navigate = useNavigate()
  async function register(e) {
    try {
      e.preventDefault()
      const data = { username, password, first_name, last_name, email }
      const response = await axios.post("http://127.0.0.1:8000/blogapp/register", data)

      const verifyUser = await axios.post("http://127.0.0.1:8000/token/", { username, password })

      localStorage.setItem("accessToken", verifyUser.data.access)
      localStorage.setItem("refreshToken", verifyUser.data.refresh)
      navigate("/internships")
      console.log(verifyUser.data)
      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>

      <form onSubmit={register}>
        <div class="row" style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div class="col-3">
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input onChange={e => setUsername(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input onChange={e => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="col-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input onChange={e => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="col-3">
            <label for="exampleInputEmail1" class="form-label">First Name</label>
            <input onChange={e => setFirstName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="col-3">
            <label for="exampleInputEmail1" class="form-label">Last Name</label>
            <input onChange={e => setLastName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="col-3">
            <button style={{ marginTop: "25px" }} type="submit">register</button>
            
            <p>Already have an account? <Link to="/">login</Link></p>


          </div> <br></br>
          </div>
          

        


      </form>
    </>


  )
}