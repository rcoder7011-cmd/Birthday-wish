import React from "react";
import "../styles/WishPage1.css";

function WishPage1() {

    const yesHandle = () => {
        alert("Thank you for saying yes!");
        // navigate("/wish2");
    }


    const noHandle = () => {
        alert("Thank you for saying no!");
        // navigate("/wish2");
    }
    return (
        <>





            <section className="container">

                <div className="Wish1Container">
                   <h2 style={{textAlign:"center"}}> <pre>If you love me click on yes <br></br>
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