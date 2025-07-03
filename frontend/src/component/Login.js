import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { PiStudentFill } from "react-icons/pi";
import "../App.css"

export function Login() {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [badLogin, setBadLogin] = useState(false)
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
        setLoading(true)
      
      const response = await axios.post("https://internshify.onrender.com/token/", { username, password })
      localStorage.setItem("accessToken", response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh)
      if(response){
       
        setTimeout(()=>{
          navigate("/internships")
          
        }, 3000)
      } 

    } catch (e) {
      if(e.status === 401){
       setBadLogin(true)
      }
      setLoading(false)

    }
  }
  

  return (
    <>
      <form onSubmit={signIn} className="row g-3 w-100 m-0" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        <h3 ref={ref} align="center">
          <span style={{ fontFamily: "monospace", width: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }}>
           Internships4U<PiStudentFill className="flicker-1 " color="white" size={35}/>
          </span>
        </h3>

        <div className="col-8 col-sm-8 col-md-6 col-lg-4">
         { badLogin && <p style={{color: "red"}}>incorrect info</p>}
          <label htmlFor="inputEmail4" className="form-label">Username</label>
          <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="inputEmail4" />
        </div>

        <div className="col-8 col-sm-8 col-md-6 col-lg-4">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="inputPassword4" />
        </div>

        <div className="col-4 col-sm-4 col-md-3 col-lg-2 text-center">
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "20px"}}>
         { loading ? <div className="loader"></div> : <button style={{padding: "7px", borderRadius: "10px"}}  type="submit">sign in</button>}

          </div>
        { !loading &&  <p className="mt-2">create <Link to="/register">account?</Link></p>   }
        
          {/* <a href="/forgotPassword">forgot password?</a> */}
        </div>
      </form>
    </>
  )
}