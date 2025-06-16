import { useEffect, useState } from "react";
import zlogo from "../images/zlogo.jpeg"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";




export function NavBar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    getBlogs()
  }, [])
  async function getBlogs() {
    try {

      const userData = await axios.get("http://127.0.0.1:8000/blogapp/get_user",
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
  return (
    <>
    <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            {/* <img style={{ borderRadius: "50%" }} src={zlogo} alt="Logo" width="60" height="60" class="d-inline-block align-text-top" /> */}
            <FaLinkedinIn/>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="/internships">Internships</a>
              <a class="nav-link" href="/internships/blogs">Blogs</a>
              <a class="nav-link" href="/internships/createBlog">Create</a>
              {/* <a class="nav-link disabled" aria-disabled="true">Disabled</a> */}
            </div>
            <div class="col-9" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link style={{ cursor: "pointer" }} to="/">logout</Link>
            </div>

          </div>
        </div>
      </nav>
      <br></br>
     <i><h6  align="center">Hi {user} 👋</h6></i> <br></br>
    </div>
      
    </>


  );
}

