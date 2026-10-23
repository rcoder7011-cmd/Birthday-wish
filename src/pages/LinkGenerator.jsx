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
        await navigator.clipboard.writeText(link);
        alert("Link copied!");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>🎂 Birthday Wish Generator ❤️</h1>

            <input
                type="text"
                placeholder="Enter her name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button onClick={generateLink}>
                Generate Link
            </button>

            {link && (
                <div style={{ marginTop: "20px" }}>
                    <p>Your birthday link:</p>

                    <a href={link}>{link}</a>

                    <br /><br />

                    <button onClick={copyLink}>
                        Copy Link
                    </button>
                </div>
            )}
        </div>
    );
}

export default LinkGenerator;