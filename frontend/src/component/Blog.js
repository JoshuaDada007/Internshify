import axios from "axios"
import { useEffect, useState } from "react"
import { BlogForm } from "./BlogForm"
import { Link } from "react-router-dom"
import { NavBar } from "./NavBar"
import { useNavigate } from "react-router-dom"
import { BiSolidLike } from "react-icons/bi";



export function Blog() {
    const [blogData, setBlogData] = useState([])
    const [myBlog, setMyBlog] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [count, setCount] = useState(null)
    const[myLikes, setMyLikes] = useState({})
    

    
    const navigate = useNavigate()


    useEffect(() => {
        getBlogs()
        console.log("This is title")
        console.log(title)

        console.log("This is the token")
        console.log(localStorage.getItem("accessToken"))
    }, [title, count])

    async function addLikes(id){
        try{
            
            const response = await axios.get(`http://127.0.0.1:8000/blogapp/get_blog/${id}`)
            const data = response.data
            setCount(data.likes)

            setMyLikes(prev =>({
                ...prev,
                [id]: true
            }))
            

            await axios.put(`http://127.0.0.1:8000/blogapp/update_likes/${id}`,
            {likes: (data.likes + 1), title: data.title})
           
            

            console.log("Like added")
             
        }catch(err){
            console.error(err)
            console.log("From adding likes")

        }
    }
    async function removeLikes(id){
        
        try{
            const response = await axios.get(`http://127.0.0.1:8000/blogapp/get_blog/${id}`)
            const data = response.data
            setCount(data.likes)
            setMyLikes(prev =>({
                ...prev,
                [id]: false
            }))


            const removeLikes = await axios.put(`http://127.0.0.1:8000/blogapp/update_likes/${id}`,
            {likes: (data.likes - 1), title: data.title})
            console.log("Like removed")

           

            console.log(myLikes)

             
        }catch(err){
            console.error(err)
            console.log("From removing likes")
        }
    }


    async function getBlogs() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/blogapp/all_blogs",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
            console.log(response.data)
            response.data.reverse()
            setBlogData(response.data)
            


        } catch (err) {
            console.log(err)
            navigate("/")

        }

    }






    return (
        <>
            <NavBar />

            <div className="container-fluid">
                <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                    <Link to={"/internships/createBlog"}><button style={{ borderRadius: "10px" }}>Create Blog +</button></Link>
                    <Link to={"/internships/myBlog"}><button style={{ borderRadius: "10px" }}>My Blog</button></Link>

                </div>
                <div className="row" style={{ justifyContent: "center", alignItems: "center" }}>
                    {blogData.map(blogs => {
                        return <div className="col-3" style={{ overflow: "scroll", padding: "20px", maxWidth: "400px", height: "400px", border: "1px solid black", margin: "20px", display: "flex", flexDirection: "column", justifyContent: "space-evenly", borderRadius: "10%" }}>
                            <h6 style={{ color: "#6c757d", textShadow: "3px 3px 6px black" }} align="center" >{blogs.title}</h6> <hr></hr> <br></br>

                            <div onClick={e => setTitle(blogs.title)} onChange={e => setContent(e.target.value)} style={{ height: "80%", color: "white", backgroundColor: "#252422", overflow: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2);", padding: "10px" }}>{blogs.content}</div>
                            <br></br>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {blogs.author ? <small style={{ color: "#6c584c" }}><i> By {blogs.author.username} </i></small> : <small style={{ color: "#6c584c" }}><i> By Anonymous </i></small>}

                                {myLikes[blogs.id]  ? (<button onClick={() => removeLikes(blogs.id)} style={{border: "none", background: "none"}}> <BiSolidLike color="red" />  </button>)

                               : (<button onClick={() => addLikes(blogs.id)} style={{border: "none", background: "none"}}> <BiSolidLike color="white" />  </button>)}


                            </div> <br></br>
                            <hr></hr>
                            <i><small><p align="center">{blogs.likes} users found this useful</p></small></i>
                        </div>
                    })
                    }
                </div>

            </div>
            {/* www.gstatic.com/mobilesdk/230918_mobilesdk/all_projects_right_image.png
        www.gstatic.com/mobilesdk/240501_mobilesdk/2024-05-01-all_projects_left_image.png */}

        </>
    )
}