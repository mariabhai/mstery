import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [growth, setGrowth] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const growthRef = useRef(0);
  const messageTimer = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(messageTimer.current);
  }, []);

  function handleGrow() {
    const nextGrowth = growthRef.current + 1;

    growthRef.current = nextGrowth;
    setGrowth(nextGrowth);

    if (nextGrowth === 3) {
      setShowMessage(true);
      window.clearTimeout(messageTimer.current);
      messageTimer.current = window.setTimeout(() => {
        setShowMessage(false);
      }, 1400);
    }
  }

  return (
    <main>
      <h1 style={{ "--growth": growth }}>MSTERY</h1>

      {showMessage && <p className="message">grow like me</p>}

      <button className="growButton" type="button" onClick={handleGrow}>
        +
      </button>
    </main>
  );
}

export default App;
