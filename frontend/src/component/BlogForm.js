import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { NavBar } from "./NavBar"


export function BlogForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [myBlogs, setMyBlogs] = useState([])


  async function createBlog(e) {
    e.preventDefault()
    try {
      const data = { title, content }
      const response = await axios.post("http://127.0.0.1:8000/blogapp/new_blog",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      )
      console.log(response.data)
      alert("blog created successfully")

      navigate("/internships/blogs")


    } catch (err) {
      console.error(err)
    }

  }


  return (
    <>
      <NavBar />
      <h2 align="center"> Share Your Thoughts</h2>

      <div
        className="row justify-content-center mt-5"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form
          onSubmit={createBlog}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "2rem",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px"
          }}
        >
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              onChange={e => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter blog title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Content
            </label>
            <textarea
              onChange={e => setContent(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="6"
              placeholder="Write your blog content..."
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Create
            </button>
          </div>
        </form>
      </div>

    </>
  )
}