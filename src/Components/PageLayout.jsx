import { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mapbox } from "./Mapbox";
import { Information } from "./Information";

export function PageLayout() {
    const [activeTab, setActiveTab] = useState("info");
    const [response, setResponse] = useState([])


    const loadAiportData = async (airportSelection) => {

        const url = `http://navcanada-dashboard-env.eba-62bgn4j5.us-east-1.elasticbeanstalk.com/data/weather?airport=${airportSelection}`
        const dataFromServer = await axios.get(url);
        setResponse(dataFromServer.data);
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="container-fluid my-5 px-5 data-container">
                <h1>Sample Dashboard created from NavCanada data</h1><br />
                {/* Tabs */}
                <ul className="nav nav-pills mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "info" ? "active" : ""}`}
                            onClick={() => setActiveTab("info")}
                        >
                            Info
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "map" ? "active" : ""}`}
                            onClick={() => {
                                setActiveTab("map");
                            }}
                        >
                            Map
                        </button>
                    </li>
                </ul>


                <div className="tab-content">


                    {activeTab === "info" && (
                        <div className="tab-pane active p-3" style={{ minHeight: "80vh", backgroundColor: "#f8f9fa" }}>
                            <h5>How to use the Dashboard</h5>
                            <p>
                                <ul>
                                    <li>Click on the Map tab</li>
                                    <li>Click on any Canadian airport as shown on the map</li>
                                    <li>The NOTAM data is pulled from the server and shown in the section on the right</li>
                                    <li>Click on any other airport to fetch new data</li>
                                </ul>
                            </p>
                            <hr class="border border-primary border-3 opacity-75"></hr>
                            <h5>Information about the Dashboard</h5>
                            <p>
                                This dashboard has been created temporarily, as part of my job application for the Junior Software Developer job on your website
                                ( <a href="https://navcanada.wd10.myworkdayjobs.com/en-US/NAV_Careers/job/Junior-Software-Developer--2-permanent-positions-_JR-7239" target="_blank">Navcanada Careers</a> ) page.<br /><br />

                                The data has been pulled one-time from this <a href="https://plan.navcanada.ca/wxrecall/" target="_blank">page</a> and stored into a JSON file.
                                I reviewed the network tab and was able to see the <a href="https://plan.navcanada.ca/weather/api/alpha/?site=CYYC&site=CYEG&site=CYHZ&site=CYUL&site=CYOW&site=CYQB&site=CYYZ&site=CYVR&site=CYYJ&site=CYWG&site=CYYT&site=CYXY&site=CYFB&alpha=notam" target="_blank">api end-point</a> that is being used.<br /><br />
                                The sole purpose of this dashboard is to showcase my developer skills, in order to get an interview for the job. Once that process is over, this code and data will be deleted.<br /><br />

                                As I did not have a lot of time to prepare, the code is perhaps not up to the best standards yet. However I will be updating it over the next couple of days and will be posted to Github ( Code is hosted on Github <a href="https://github.com/sartajsinghgill/navcanada-backend" target="_blank">Backend</a> , <a href="https://github.com/sartajsinghgill/navcanada-frontend" target="_blank">Frontend</a>. )<br /><br />

                                There are a couple of components to this dashboard:
                            </p>
                            <div class="card my-4">
                                <div class="card-header">
                                    <b>Backend : Code is hosted on Github <a href="https://github.com/sartajsinghgill/navcanada-backend" target="_blank">here</a>.</b>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">
                                        <ul>
                                            <li>The backend is built using Java Spring Boot</li>
                                            <li>It is hosted on AWS ElasticBeanStalk <a href="http://navcanada-dashboard-env.eba-62bgn4j5.us-east-1.elasticbeanstalk.com/" target="_blank">AWS Server Domain</a>
                                                <ul>
                                                    <li>The domain currently does not respond to HTTP requests and I have not added an error page yet(will add soon)</li>
                                                    <li>There is an <a href="http://navcanada-dashboard-env.eba-62bgn4j5.us-east-1.elasticbeanstalk.com/data/weather?airport=CYOW" target="_blank">end-point</a> that can be used to see the JSON file that is on the server</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                            <div class="card my-4">
                                <div class="card-header">
                                    <b>Frontend : Code is hosted on Github <a href="https://github.com/sartajsinghgill/navcanada-frontend" target="_blank">here</a>.</b>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">
                                        <ul>
                                            <li>The frontend is built using React and is styled using Bootstrap</li>
                                            <li>The map that is shown is built by integrating <a href="https://www.mapbox.com/" target="_blank">Mapbox</a></li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                            <p>I can be reached via email if you have any questions <a href="mailto:sartajsinghgill@gmail.com">sartajsinghgill@gmail.com</a></p>
                        </div>
                    )}

                    {activeTab === "map" && (
                        <div className="tab-pane active">
                            <div className="row g-3">
                                {/* Left: Map 60% on md+ screens, full width on small screens */}
                                <div className="col-12 col-md-6 d-flex p-0" style={{ height: "100%" }}>
                                    <div style={{ flex: 1, minHeight: 0 }}>
                                        <Mapbox
                                            loadAiportData={loadAiportData}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 p-3" style={{ backgroundColor: "#f8f9fa", overflowY: "auto" }}>
                                    <Information
                                        response={response}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
