import { useState } from "react";
import React from "react";

function LinkGenerator() {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const generateLink = () => {
        if (!name.trim()) {
            alert("Please enter a name!");
            return;
        }

        const url = `${window.location.origin}/wish?name=${encodeURIComponent(name.trim())}`;

        setLink(url);
    };

   
    
const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(link);
        alert("Link copied!");
    } catch (error) {
        alert("Unable to copy the link. Please copy it manually.");
    }
};


    return (
        <>
         <style>
        {`
          input::placeholder {
            color: rgba(237, 81, 109, 0.5);
            opacity: 1;
          }
        `}
      </style>

        



        <div style={{ textAlign: "center", marginTop: "150px" , color:"red", fontSize:"2rem", fontWeight:"bold"}}>
            <h1>🎂 Birthday Wish Generator ❤️</h1>

            <input
                type="text"
                placeholder="Enter her/his name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ fontSize: "1.5rem", fontWeight: "bold", borderRadius: "10px", padding: "10px", border:"3px solid pink" , opacity:"0.9",filter:"drop-shadow(0px 0px 20px #ff6b9a)"}}
            />
            <br></br>
            <br></br>   

            <button
             onClick={generateLink}
             style={{ fontSize: "1.5rem",marginTop:"20px",  borderRadius: "9px", padding: "4px", border:"3px solid pink" , opacity:"1",filter:"drop-shadow(0px 0px 20px #d10c3aff)", cursor:"pointer" , color:"#d6345dff"}}
            >
                Generate Link
            </button>

            {link && (
                <div style={{ marginTop: "20px" }}>
                    <p>Your birthday link:</p>

                    <a href={link}>{link}</a>

                    <br /><br />

                    <button onClick={copyLink}
                    style={{ fontSize: "1.5rem",marginTop:"20px",  borderRadius: "9px", padding: "4px", border:"3px solid pink" , opacity:"1",filter:"drop-shadow(0px 10px 8px #d10c3aff)", cursor:"pointer" , color:"#d6345dff"}}>
                        Copy Link
                    </button>
                </div>
            )}
        </div>



</>
    );
}

export default LinkGenerator;