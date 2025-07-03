import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";







export function NavBar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    getBlogs()
  }, [])
  async function getBlogs() {
    try {

      const userData = await axios.get("https://internshify.onrender.com/blogapp/get_user",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        }
      )
      if (userData) {
        setUser(userData.data.username)
        console.log(userData.data)
      }

    } catch (err) {
      console.log(err)
      navigate("/")

    }

  }
  function logOut(){
    localStorage.clear()
  }
  return (
    <>
    <div> 
    <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/internships">
            <PiStudentFill size={40}/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/internships">Internships</a>
              <a className="nav-link" href="/internships/blogs">Blogs</a>
              <a className="nav-link" href="/internships/createBlog">Create</a>
              {/* <a class="nav-link disabled" aria-disabled="true">Disabled</a> */}
            </div>
            <div className="col-9" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link style={{ cursor: "pointer" }} to="/"> <button onClick = {logOut}>logout</button>logout</Link>
            </div>

          </div>
        </div>
      </nav>
]      <br></br> <br></br> <br></br>
    </div>

    <i><h6 className="bounce-in-top" align="center">Hi {user} 👋</h6></i> 
    <br></br>
   

    
      
    </>


  );
}

