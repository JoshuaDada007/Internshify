import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';


export function Internship() {
    const [internships, setInternships] = useState([]);
    const [responsibility, setResponsibility] = useState([]);
    const [requirement, setRequirement] = useState([]);
    const [category, setCategory] = useState([]);
    const [skills, setSkills] = useState([]);
    const [season, setSeason] = useState('')



    useEffect(() => {
        getInternships();
        console.log("This is requirement")
        console.log(requirement)

    }, []);

    function jobDetails(id) {
        for (let internship of internships) {
            if (internship.id === id) {
                setResponsibility(internship.responsibility);

                setRequirement(internship.requirement)
                

                setSeason(internship.season)
                console.log(season);

                setSkills(internship.skill)
                console.log(skills);

                setCategory(internship.category)
                console.log(category);
            }

        }
    }


    async function getInternships() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/blogapp/all_internships")
            console.log("These are all the listings", response.data)
            let data = response.data
            data = data.reverse()
            
            setInternships(data);
            console.log(`This is the length: ${internships.length}`)
            



        } catch (err) {
            console.error(err)
        }

    }




    return (

        <>
            <NavBar />
            <div style={{overflow: "scroll"}} className="container-fluid">
                <div className="row">
                    <div style={{overflow: "scroll", display: "flex", flexWrap: "wrap", height: "100vh" }} class="col">

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
                            }}>

                                <div className="card-body">
                                    <h5 className="card-title">{internship.name}</h5> <br></br>
                                    <p className="card-text">{internship.role}</p>
                                    <small className="card-text"><i>{internship.location}</i></small> <br></br>
                                    <b><small className="card-text"><i>{internship.date_posted} ago {internship.season} </i></small> <br></br> <br></br></b>
                                    <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                                        <a href={internship.link}>Apply</a>
                                    </button>
                                    <button style={{ background: "none", border: "none" }}>AI Tips</button>
                                   
                                </div>
                                {/* </div> */}


                            </div>
                        ))}


                        <div>
                        </div>

                    </div>
                    <div className="col">
                      <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                       { requirement.length > 0 ? <h5 align= "center">Requirement</h5>: <h5 align= "center">Check Website for requirement</h5> }
                      <ul>
                        {requirement.map(item =>{
                            return <li>{item}</li>
                           
                            
                        })}
                      </ul>
                      {responsibility.length > 0 ? <h5 align= "center">Responsibility</h5> : <h5 align= "center">Check Website for responsibility</h5>}  
                      <ul>
                      {responsibility.map(item =>{
                            return <li>{item}</li>  
                        })}
                      </ul>
                      {skills.length > 0 ?<h5 align= "center">Required Skills</h5>: <h5 align= "center">Check Website for required skills</h5>}
                      <ul>
                      {skills.map(item =>{
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
