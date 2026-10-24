
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/BirthdayWish3.css"
import { useNavigate } from "react-router-dom";

function BirthdayWish3() {
  const [count, setCount] = useState(0)
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const navigate = useNavigate();

  const messages = [
    `I Love You Forever ❤️ my sweety ${name}`,
    `I am very happy with you because you are my everything, ${name} ❤️`,
    `You make my world brighter just by being in it 💖`,
    `I wish I could make every moment special for you 🌸`,
    `You will always have a special place in my heart 💗`,
    `You are the most beautiful part of my life, ${name} 🥹❤️`,
    `Every moment with you feels like a beautiful dream ✨💖`,
    `Your smile is my favorite thing in this whole world 😊💕`,
    `No matter how many people I meet, you will always be special to me ❤️`,
    `If I could make one wish, I would wish for endless happiness for you 🌷💗`,
    `You make even my ordinary days feel magical, my love 🪄❤️`,
    `I wish I could give you all the happiness your heart deserves 🎀💖`,
    `You are my favorite reason to smile every single day 🥰💕`,
    `No words can explain how special you are to me, ${name} ❤️🌹`,
    `Today, tomorrow, and always, I will keep wishing the best for you 🎂💗`,
  ];

  const [mode, setMode] = useState("message");
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [running, setRunning] = useState(false);

  // Typewriter effect for romantic messages
  useEffect(() => {
    if (mode !== "message" || !running) return;

    const message = messages[index];
    let charIndex = 0;

    setText("");

    const timer = setInterval(() => {
      charIndex++;
      setText(message.slice(0, charIndex));

      if (charIndex >= message.length) {
        clearInterval(timer);
        setRunning(false);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [mode, index, running]);

  // Paragraph loop
  useEffect(() => {
    if (mode !== "paragraphs" || !running) return;

    let i = 0;

    const timer = setInterval(() => {
      if (i >= 143) {
        clearInterval(timer);
        setRunning(false);
        return;
      }

      setParagraphs((prev) => [
        ...prev,
        `${i + 1}. I Love You Forever ❤️ my sweety ${name}`,
      ]);

      i++;
    }, 50);

    return () => clearInterval(timer);
  }, [mode, running, name]);

  const handleAgain = () => {
    setCount(1)
    if (running) return;

    if (mode === "message") {
      // Next click starts the paragraph loop
      setParagraphs([]);
      setMode("paragraphs");
      setRunning(true);
    } else {
      // Next click starts the next romantic message
      setIndex((prev) => (prev + 1) % messages.length);
      setMode("message");
      setRunning(true);
    }
  };


  return (
    <main className="birthday-page">
      <div className="floating-heart heart-one">💗</div>
      <div className="floating-heart heart-two">💕</div>
      <div className="floating-heart heart-three">🌸</div>

      <section className="birthday-card">
        <span className="card-tag">♡ A SPECIAL MESSAGE FOR YOU ♡</span>

        <h1 className="birthday-title">
          Happy Birthday
          <span className="birthday-name">{name}! 🎂</span>
        </h1>

        <div className="message-box">
          {mode === "message" && (
            <p className="typed-message">
              {text}
              {running && <span className="typing-cursor">|</span>}
            </p>
          )}

          {mode === "paragraphs" && (
            <div className="paragraph-list">
              {paragraphs.map((para, index) => (
                <p className="love-paragraph" key={index}>
                  <span className="paragraph-number">
                    {index + 1}
                  </span>
                  {para.substring(para.indexOf(".") + 1)}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          className="again-button"
          onClick={handleAgain}
          disabled={running}
        >
          {running ? "Sending Love... 💌" : "Again, My Love ❤️"}
        </button>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        {count === 1 && (
          <button
            className="again-button"
            onClick={() => navigate("/purposePage")}
            disabled={running}
          >
            {running ? "Sending Love... 💌" : "I 🥹 want to ask u 👉 something ❤️"}
          </button>
        )}

        <p className="card-footer">Made with love ♡ just for you</p>
      </section>
    </main>
  );

}

export default BirthdayWish3;
