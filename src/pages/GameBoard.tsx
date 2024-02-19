import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../assets/styles.scss";

export default function GameBoard() {
  const [highscore, setHighScore] = useState(0);
  const [currectAnswer, setCurrectAnswer] = useState("?");
  const [numberToGuess, setNumberToGuess] = useState<null | number>(null);
  const [score, setScore] = useState(20);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Start guessing...");
  const [isSuccess, setIsSuccess] = useState(false);

  const generaterundomNum = useCallback(() => {
    const randomNum = Math.trunc(Math.random() * 20 + 1);
    setNumberToGuess(randomNum);
  }, []);

  useEffect(() => {
    generaterundomNum();
  }, []);

  const onCheckSubmit = useCallback(() => {
    if (numberToGuess === Number(inputValue)) {
      setCurrectAnswer(inputValue);
      setMessage("🎉 Correct number!");
      setIsSuccess(true);
      setHighScore((prev) => {
        if (prev > score) {
          return prev;
        }
        return score;
      });
      return;
    }
    if (!inputValue) {
      setMessage("⛔ No Number!");
      return;
    }
    if (score === 0) {
      return;
    }
    setScore((prev) => (prev -= 1));
    if (score <= 1) {
      setMessage("💥 You lost the game!");
      return;
    }
    if (numberToGuess && numberToGuess < Number(inputValue)) {
      setMessage("📈 Too high!");
      return;
    }
    if (numberToGuess && numberToGuess > Number(inputValue)) {
      setMessage("📉 Too low!");
      return;
    }
  }, [numberToGuess, inputValue, score]);

  const onInputChange = useCallback((e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  }, []);

  const againBtnHandler = useCallback(() => {
    const resetGame = () => {
      setCurrectAnswer("?");
      setMessage("Start guessing...");
      setInputValue("");
      generaterundomNum();
      setScore(20);
      setIsSuccess(false);
    };
    resetGame();
  }, []);

  return (
    <div className={isSuccess ? "success" : ""}>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={againBtnHandler}>
          Again!
        </button>
        <div className="number">{currectAnswer}</div>
      </header>
      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            onChange={onInputChange}
            value={inputValue}
          />
          <button className="btn check" onClick={onCheckSubmit}>
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">
            💯 Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{highscore}</span>
          </p>
        </section>
      </main>
    </div>
  );
}
