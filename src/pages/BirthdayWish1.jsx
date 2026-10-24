
import { useState, useEffect } from "react";

function BirthdayWish1() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {show && (
                <div>
                    <div style={{
                        border: "1px solid red", marginTop: "50px", background: "#f3ebf3ff",
                        boxShadow: "1px 2px 12px 12px #e78be5ff",
                        // boxShadow:  "inset 0 0 10px #efcbeeff",
                        width: "fit-content",
                        height: "80px",
                        padding: "7px 12px 7px 12px"
                        , borderRadius: "10px",
                        margin: "auto",
                        marginTop: "150px"
                    }}>
                        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "0px", color: "red" }}>🎉 I want to tell you something..!! ❤️</h1>
                    </div>


                    <h1 style={{ textAlign: "center", fontSize: "40px" }}><pre>
                        Do Wait baby! 🎂</pre></h1>
                    <p style={{ textAlign: "center", fontSize: "20px" }}>I'm gathering the courage to say this. ❤️</p>




                    <div style={{
                        width: "399px",
                        height: "500px",
                        overflow: "hidden",
                        borderRadius: "15px",
                        border: "none ",
                        margin: "0 auto",

                    }}>
                        <video
                            src="/videos/waitFirstVideo.mp4"
                            autoPlay
                            controls
                            muted
                            playsInline
                            loop
                            style={{ width: "100%", height: "100%", objecctFit: "cover" }}
                        />
                    </div>
                </div>

            )}


        </div>
    );
}

export default BirthdayWish1;
