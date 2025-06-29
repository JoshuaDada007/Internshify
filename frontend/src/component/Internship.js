import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { Tips } from './Tips';
import ReactMarkdown from 'react-markdown';
import { GiFairyWand } from "react-icons/gi";


export function Internship() {
    const [internships, setInternships] = useState([]);
    const [responsibility, setResponsibility] = useState([]);
    const [requirement, setRequirement] = useState([]);
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState('');
    const [season, setSeason] = useState('');
    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState("");
    const [mobileView, setMobileView] = useState("list"); // list | details | tips
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

    useEffect(() => {
        getInternships();
        const handleResize = () => setIsMobile(window.innerWidth < 992);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    async function getInternships() {
        try {
            const response = await axios.get("http://10.0.0.205:8000/blogapp/all_internships");
            const data = response.data.reverse();
            setInternships(data);
            if (data[0]) {
                setRequirement(data[0].requirement || []);
                setResponsibility(data[0].responsibility || []);
                setSkills(data[0].skill || []);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function jobDetails(id) {
        const internship = internships.find(intern => intern.id === id);
        if (internship) {
            setResponsibility(internship.responsibility);
            setRequirement(internship.requirement);
            setName(internship.name);
            setSeason(internship.season);
            setSkills(internship.skill);
            if (isMobile) setMobileView("details");
        }
    }

    async function getTips(id) {
        setLoading(true);
        const internship = internships.find(intern => intern.id === id);
        if (!internship) return;
        const AIPrompt = `name: ${internship.name} \n requirement: ${internship.requirement.join(",")} \n responsibility: ${internship.responsibility.join(",")}, rolePrompt: ${internship.role}`;
        const response = await Tips(AIPrompt);
        setTips(response);
        setLoading(false);
        if (isMobile) setMobileView("tips");
    }

    return (
        <>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            {(!isMobile || mobileView === "list") && (
              <div
                className="col-lg-6 col-12"
                style={{ height: "100vh", borderRight: "1px solid #ccc", overflowY: "auto" }}
              >
                <div className="row">
                  {internships.map((internship) => (
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-4" key={internship.id}>
                      <div
                        onClick={() => jobDetails(internship.id)}
                        style={{
                          height: "100%",
                          padding: "20px",
                          border: "1px solid black",
                          borderRadius: "10px",
                          backgroundColor: "#252422",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                          }}
                          className="card-body"
                        >
                          <h5 className="card-title">{internship.name}</h5> <br />
                          <p className="card-text">{internship.role}</p>
                          <small>
                            <i>{internship.location}</i>
                          </small>
                          <br />
                          <small>
                            <b>
                              <i>
                                {internship.date_posted} ago – {internship.season}
                              </i>
                            </b>
                          </small>
                          <br />
                          <br />
                          <div className="d-flex justify-content-around">
                            <a
                              href={internship.link}
                              className="btn btn-sm btn-outline-light"
                            >
                              Apply
                            </a>
                            <button
                              onClick={() => {
                                jobDetails(internship.id);
                                getTips(internship.id);
                                if (isMobile) setMobileView("tips");
                              }}
                              className="btn btn-sm btn-danger"
                            >
                              AI Tips <GiFairyWand />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
      
            {(!isMobile || mobileView !== "list") && (
              <div
                className="col-lg-6 col-12"
                style={{ height: "100vh", position: "relative", overflowY: "auto" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1rem",
                    overflowY: "auto",
                  }}
                >
                  {loading ? (
                    <div
                      style={{
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="text-center"
                    >
                      <span className="loader"></span>
                      <p>Generating AI Tips...</p>
                    </div>
                  ) : isMobile ? (
                    mobileView === "tips" ? (
                      <div className="p-3 mb-2 bg-dark text-white">
                        <ReactMarkdown>{tips}</ReactMarkdown>
                        <button
                          className="btn btn-secondary mt-2"
                          onClick={() => setMobileView("details")}
                        >
                          Back to Internship
                        </button>
                      </div>
                    ) : mobileView === "details" ? (
                      <>
                      <div className='bg-dark' style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "70%", overflow: "scroll"}}>

                      
                        <h5 className="text-center">Requirement</h5>
                        {requirement.length > 0 ? (
                          <ul>
                            {requirement.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>Check website for requirements</p>
                        )}
                        <hr />
                        <h5 className="text-center">Responsibility</h5>
                        {responsibility.length > 0 ? (
                          <ul>
                            {responsibility.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>Check website for responsibilities</p>
                        )}
                        <hr />
                        <h5 className="text-center">Required Skills</h5>
                        {skills.length > 0 ? (
                          <ul>
                            {skills.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>Check website for required skills</p>
                        )}
                        
                        </div>
                        <button
                          id="listing"
                          className="btn btn-secondary mt-3"
                          onClick={() => setMobileView("list")}
                        >
                          Back to Listings
                        </button>
                      </>
                    ) : null
                  ) : tips ? (
                    <div>
                      <ReactMarkdown className="p-3 mb-2 bg-dark text-white">
                        {tips}
                      </ReactMarkdown>
                      <button
                        className="btn btn-secondary mt-2"
                        onClick={() => setTips("")}
                      >
                        Back to Internship
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 mb-2 bg-dark text-white">
                      <h5 className="text-center">Requirement</h5>
                      {requirement.length > 0 ? (
                        <ul>
                          {requirement.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Check website for requirements</p>
                      )}
                      <h5 className="text-center">Responsibility</h5>
                      {responsibility.length > 0 ? (
                        <ul>
                          {responsibility.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Check website for responsibilities</p>
                      )}
                      <h5 className="text-center">Required Skills</h5>
                      {skills.length > 0 ? (
                        <ul>
                          {skills.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Check website for required skills</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
}