
import React from "react";

function Heart() {
    return (
        <div className="heart-box">
            <svg viewBox="0 0 100 99" className="heart">
                <defs>
                    <clipPath id="heartClip">
                        <path
                            d="M50 82 C40 70 5 47 5 27
                               C5 4 34 0 50 22
                               C66 0 95 4 95 27
                               C95 47 60 70 50 82Z"
                        />
                    </clipPath>
                </defs>

                <image
                    href="/hug-milk.gif"
                    x="10"
                    y="-2"
                    width="80"
                    height="74"
                    preserveAspectRatio="xMidYMid meet"
                    clipPath="url(#heartClip)"
                />

                <path
                    d="M50 82 C40 70 5 47 5 27
                       C5 4 34 0 50 22
                       C66 0 95 4 95 27
                       C95 47 60 70 50 82Z"
                    fill="none"
                    stroke="#ff6b9a"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
}

export default Heart;
