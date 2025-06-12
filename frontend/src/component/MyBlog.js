import { Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { NavBar } from "./NavBar"

export function MyBlog() {
  const [myBlogs, setMyBlogs] = useState([])
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [showEdit, setShowEdit] = useState(null)


  useEffect(() => {
    showBlog()
  }, [])


  async function updateBlog(id) {

    try {
      setShowEdit(false)
      const data = { title, content }
      const response = await axios.put(`http://127.0.0.1:8000/blogapp/update_blog/${id}`,
        data,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
      console.log(response.data)
      showBlog()
      alert("updated successfully")

    } catch (err) {
      console.error(err)
    }
  }

  async function showBlog() {
    try {
      const user = await axios.get("http://127.0.0.1:8000/blogapp/get_user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
      console.log(user.data)
      const id = user.data.id
      const response = await axios.get("http://127.0.0.1:8000/blogapp/get_blogs",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
      console.log(`This is the  id: ${id}`)
      // console.log(response.data)
      const data = response.data
      const blogs = data.map(blogs => blogs).filter(blogs => blogs.author.id === id)


      console.log("This is my blogs!!!")

      console.log(blogs)
      setMyBlogs(blogs)

    } catch (err) {
      console.error(err)
    }

  }

  return (
    <>
      <NavBar />
      <div style={{ overflow: "scroll" }}>
        <div className="container-fluid">

          <br />

          <h6 align="center">My Blogs</h6>
          <div className="row" style={{ justifyContent: "center", alignItems: "center" }}>
            {myBlogs.map(blogs => {
              return (
                <div
                  className="col-3"
                  style={{
                    maxWidth: "400px",
                    height: "300px",
                    border: "1px solid black",
                    margin: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    borderRadius: "10%"
                  }}
                >
                  <h6 style={{ color: "#6c757d", textShadow: "3px 3px 6px black" }} align="center" >{blogs.title}</h6>
                  <hr></hr>
                  {showEdit ? (
                    <textarea
                      onClick={e => setTitle(blogs.title)}
                      onChange={e => setContent(e.target.value)}
                      style={{
                        height: "150px",
                        color: "white",
                        backgroundColor: "#252422",
                        overflow: "auto",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      {blogs.content}
                    </textarea>
                  ) : (
                    <div
                      onClick={e => setTitle(blogs.title)}
                      style={{
                        height: "150px",
                        color: "white",
                        backgroundColor: "#252422",
                        overflow: "auto",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      {blogs.content}
                    </div>
                  )}


                 {showEdit ? ( <button
                    style={{
                      width: "60px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      borderRadius: "10%",
                      border: "none",
                      background: "none"

                    }}
                    onClick={() => updateBlog(blogs.id)}
                  >
                    submit
                  </button>)

                  :(<button onClick={() => setShowEdit(true)} style={{
                    width: "60px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderRadius: "10%",
                    border: "none",
                    background: "none"

                  }}>edit</button>
                  )}





                  {blogs.author ? (
                    <small style={{ color: "#6c584c", textAlign: "right" }}>
                      <i>By {blogs.author.username}</i>
                    </small>
                  ) : (
                    <small style={{ color: "#6c584c", textAlign: "right" }}>
                      <i>By Anonymous</i>
                    </small>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </>

  )
}