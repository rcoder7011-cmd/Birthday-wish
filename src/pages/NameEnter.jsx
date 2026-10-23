
import React from "react";
import "../styles/NameEnter.css";
import Heart from "./Heart";
import { useNavigate } from "react-router-dom";

function NameEnter() {
    
    const navigate = useNavigate();
    return (
        <section className="container">
            <div className="NameEnterContainer">

                
                <Heart />

                <button className="nameEnterBtn" onClick={() => navigate("/generateLink") }>Let's Impress her/him</button>

                <h2 className="starting-btn">
                    Click on the heart to enter in her Dil
                </h2>
            </div>
        </section>
    );
}

export default NameEnter;
