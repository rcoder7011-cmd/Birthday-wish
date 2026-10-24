import React from "react";
import { useState } from "react";
import "../styles/WishPage1.css";
import { useNavigate } from "react-router-dom";

function WishPage1() {
    const [show ,setShow]=useState(false);
    const Navigate=useNavigate();

    const yesHandle = () => {
       setShow(true);
       Navigate("/purposePage2");
    }


    const noHandle = () => {
        alert("Thank you for saying no!");
        // navigate("/wish2");
    }
    return (
        <>





            <section className="container">
                <div className="YesNo">
                    <img src="./images/crybaby.gif" />
                </div>

                <div className="Wish1Container">
                   <h2 style={{textAlign:"center",marginTop:"250px"}}> <pre>If you love me click on yes <br></br>
               else <br></br>
         click No    
                    </pre> 
                    </h2>

                    
                    
                </div>

                <div className="btns">
                <button  className="yesBtn"  onClick={yesHandle} style={{fontSize:"20px",fontWeight:"bold",borderRadius:"50px",padding:"10px",cursor:"pointer",border:"2px solid pink",filter:"drop-shadow(0px 0px 10px #ff6b9a)"}}>Yes</button>
                <button className="noBtn"  style={{fontSize:"20px",fontWeight:"bold",borderRadius:"50px",padding:"10px",cursor:"pointer",border:"2px solid pink",filter:"drop-shadow(0px 0px 10px #ff6b9a)"}}  >No</button>
                </div>

            </section>




        </>
    );
}

export default WishPage1;