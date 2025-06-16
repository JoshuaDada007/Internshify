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

        useEffect(() =>{
          const titleRef = ref.current
          if(titleRef){
              titleRef.classList.remove("typing")
              void titleRef.offsetWidth
              titleRef.classList.add("typing")
          }
        }, [])


        

         async function signIn(e){
        e.preventDefault()

        try{
        const response = await axios.post("http://127.0.0.1:8000/token/", {username, password},{ 
        })
        localStorage.setItem("accessToken", response.data.access)
        localStorage.setItem("refreshToken", response.data.refresh)
        console.log(response.data)

        console.log("Signed in", username, password)
    

            navigate("/internships")
        
        } catch(e){
            console.error(e)
            alert("Wrong Information please try again")
        }
     

    }

   
    return (

<>
{/* Bootstrap layout rules

col-md-6 defines half the screen so adding one more of that is for the full screen. You can use this to define your screen however you like */}
<form onSubmit={signIn} class="row g-3" style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px"}}>
  <h3 ref={ref} align = "center"><span style={{fontFamily: "monospace",width: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center", fontWeight: "bold"}}>Locked<FaLinkedinIn/>👨🏾‍💻</span></h3>
  <div class="col-3">
    <label for="inputEmail4" class="form-label">Username</label>
    <input onChange={e => setUsername(e.target.value)} type="text" class="form-control" id="inputEmail4"/>
  </div>
  <div class="col-3">
    <label for="inputPassword4" class="form-label">Password</label>
    <input onChange={e => setPassword(e.target.value)} type="password" class="form-control" id="inputPassword4"/>
  </div>

  <div class="col-3">
    <button type="submit" class="btn btn-primary">Sign in</button>
    <p>don't have an account? <Link to="/register">register</Link></p>
  </div>
</form>
</>
        
    )
      
}