import '../App.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Tips } from './Tips';
import "../App.css"
import ReactMarkdown from 'react-markdown';
import { FaRobot } from "react-icons/fa";




export function Internship() {
    const [internships, setInternships] = useState([]);
    const [responsibility, setResponsibility] = useState([]);
    const [requirement, setRequirement] = useState([]);
    const [category, setCategory] = useState([]);
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState('');

    const [season, setSeason] = useState('')
    const [loading, setLoading] = useState(false)
    const [tips, setTips] = useState("")



    useEffect(() => {
        getInternships();



    }, []);

    async function getTips(id) {
        setLoading(true)
        let namePrompt = ''
        let requirementPrompt = [] || ''
        let responsibilityPrompt = [] || ''
        let rolePrompt = ''

        internships.filter(intern => intern.id === id).map(intern => {
            
            namePrompt = intern.name
            responsibilityPrompt = intern.responsibility.join(",")
            requirementPrompt = intern.requirement.join(",")
            rolePrompt = intern.role
        })

        const AIPrompt = `name: ${namePrompt} \n requirement: ${requirementPrompt} \n responsibility: ${responsibilityPrompt}, rolePrompt: ${rolePrompt}`
        console.log(AIPrompt)
       

        const response = await Tips(AIPrompt)
        setTips(response)
        if (response) {
            console.log(response)
            setLoading(false)

        }

    }

    function jobDetails(id) {
        for (let internship of internships) {
            if (internship.id === id) {
                setResponsibility(internship.responsibility);

                setRequirement(internship.requirement)
                if (name) setName(internship.name)



                setSeason(internship.season)

                setSkills(internship.skill)

                setCategory(internship.category)
            }

        }
    }


    async function getInternships() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/blogapp/all_internships")
            console.log("These are all the listings", response.data)
            let data = response.data
            data = data.reverse()

            const firstRequirement = data[0].requirement || []

            const firstResponsibility = data[0].responsibility || []

            const firstSkill = data[0].skill || []

            setRequirement(firstRequirement)
            setResponsibility(firstResponsibility)
            setSkills(firstSkill)
            console.log(firstRequirement)
            setInternships(data);
            console.log(`This is the length: ${data.length}`)




        } catch (err) {
            console.error(err)
        }

    }




    return (

        <>
            <NavBar />
            <div style={{ overflow: "scroll" }} className="container-fluid">
                <div className="row">
                    <div style={{ overflow: "scroll", display: "flex", flexWrap: "wrap", height: "100vh" }} class="col">

                        {internships.map((internship) => (
                            <div onClick={() => jobDetails(internship.id)} style={{
                                flex: "1 1 300px",
                                height: "300px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "20px",
                                border: "1px solid black",
                                borderRadius: "10px",
                                backgroundColor: "#252422",
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                                cursor: "pointer"

                            }}>

                                <div className="card-body">
                                    <h5 className="card-title">{internship.name}</h5> <br></br>
                                    <p className="card-text">{internship.role}</p>
                                    <small className="card-text"><i>{internship.location}</i></small> <br></br>
                                    <b><small className="card-text"><i>{internship.date_posted} ago {internship.season} </i></small> <br></br> <br></br></b>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                                            <a href={internship.link}>Apply</a>
                                        </button>
                                        <button onClick={() => { jobDetails(internship.id); getTips(internship.id); }} style={{ background: "none", border: "none", color: "#d90429", cursor: "pointer" }}>AI Tips </button>
                                    </div>


                                </div>
                                {/* </div> */}


                            </div>
                        ))}


                        <div>
                        </div>

                    </div>
                    <div style={{ maxWidth: "80%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }} className="col">
                        {loading && <span class="loader"></span>}
                        {tips && (
                            <>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", height: "70%" }}>


                                    <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", width: "75%", padding: "1.5rem", gap: "20px", overflow: "scroll", maxHeight: "70%", border: "2px solid black", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", borderRadius: "10px" }}>
                                       
                                        <ReactMarkdown>{tips}</ReactMarkdown>
                                    </div>


                                    <small> Please do not overload with requests</small> <span><button onClick={() => setTips("")}>back to internships</button></span>
                                    

                                </div>
                            </>

                        )}

                        <div style={{ width: "100%", height: "100vh", display: (loading || tips) ? "none" : "flex", flexDirection: "column", justifyContent: "center" }}>


                           
                            {requirement.length > 0 ? <p align="center">Requirement</p> : <p align="center">Check Website for requirement</p>}
                            <ul>
                                {requirement.map(item => {
                                    return <li>{item}</li>


                                })}
                            </ul>
                            {responsibility.length > 0 ? <p align="center">Responsibility</p> : <p align="center">Check Website for responsibility</p>}
                            <ul>
                                {responsibility.map(item => {
                                    return <li>{item}</li>
                                })}
                            </ul>
                            {skills.length > 0 ? <p align="center">Required Skills</p> : <p align="center">Check Website for required skills</p>}
                            <ul>
                                {skills.map(item => {
                                    return <li>{item}</li>
                                })}
                            </ul>

                        </div>


                    </div>


                </div>
            </div>




        </>


    )

}
