import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Internship } from "../component/Internship"
import { Login } from "../component/Login"
import { Register } from "../component/Register"
import { Blog } from "../component/Blog"
import { BlogForm } from "../component/BlogForm"
import { MyBlog } from "../component/MyBlog"

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} ></Route>
            <Route path="/register" element={<Register />} ></Route>
            <Route path="/internships" element={<Internship />} ></Route>
            <Route path="/internships/blogs" element= {<Blog/>}></Route>
            <Route path="/internships/createBlog" element= {<BlogForm/>}></Route>
            <Route path="/internships/myBlog" element= {<MyBlog/>}></Route>


        </Routes>
    )

}