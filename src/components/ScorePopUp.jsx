import { useEffect, useState } from "react";
import "../styles/ScorePopUp.css";


export default function ScorePopup({ score, level }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (score > 0) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    visible && (
      <div className="score-popup">
        {(score === level)?("You Won!"):(score)}
      </div>
    )
  );
}
