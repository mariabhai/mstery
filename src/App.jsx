import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [growth, setGrowth] = useState(0);
  const [minusBoost, setMinusBoost] = useState(0);
  const [growClicks, setGrowClicks] = useState(0);
  const [minusClicks, setMinusClicks] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [message, setMessage] = useState(null);
  const growthRef = useRef(0);
  const minusBoostRef = useRef(0);
  const minusClicksRef = useRef(0);
  const messageTimer = useRef(null);
  const pulseTimer = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(messageTimer.current);
      window.clearTimeout(pulseTimer.current);
    };
  }, []);

  function showTemporaryMessage(text, side) {
    setMessage({ text, side });
    window.clearTimeout(messageTimer.current);
    messageTimer.current = window.setTimeout(() => {
      setMessage(null);
    }, 1400);
  }

  function handleGrow() {
    if (growthRef.current >= 3) {
      return;
    }

    const nextGrowth = growthRef.current + 1;

    growthRef.current = nextGrowth;
    setGrowth(nextGrowth);
    setGrowClicks(nextGrowth);

    if (nextGrowth === 3) {
      showTemporaryMessage("still growing", "right");
    }
  }

  function handleShrink() {
    if (minusClicksRef.current >= 3) {
      return;
    }

    const nextMinusClicks = minusClicksRef.current + 1;

    minusClicksRef.current = nextMinusClicks;
    setMinusClicks(nextMinusClicks);
    setIsPulsing(true);
    window.clearTimeout(pulseTimer.current);

    pulseTimer.current = window.setTimeout(() => {
      const nextMinusBoost =
        minusBoostRef.current === 0 ? 3 : minusBoostRef.current * 2;

      minusBoostRef.current = nextMinusBoost;
      setMinusBoost(nextMinusBoost);
      setIsPulsing(false);
    }, 110);

    if (nextMinusClicks === 3) {
      showTemporaryMessage("impossible task", "left");
    }
  }

  return (
    <main>
      <h1
        className={isPulsing ? "isPulsing" : undefined}
        style={{ "--growth": growth, "--minus-boost": `${minusBoost}rem` }}
      >
        MSTERY
      </h1>

      {message && <p className={`message ${message.side}`}>{message.text}</p>}

      <button
        className="shrinkButton"
        type="button"
        onClick={handleShrink}
        disabled={minusClicks >= 3}
      >
        -
      </button>

      <button
        className="growButton"
        type="button"
        onClick={handleGrow}
        disabled={growClicks >= 3}
      >
        +
      </button>
    </main>
  );
}

export default App;
