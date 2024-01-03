import { useState } from "react";
import "./App.css";

type TCords = {
  x: number;
  y: number;
};

function App() {
  const [cords, setCords] = useState<TCords[]>([]);
  const [removedCords, setRemovedCords] = useState<TCords[]>([]);

  console.log({
    cords,
    removedCords,
  });

  function Cords(e: any) {
    const { clientX, clientY } = e;
    setCords([...cords, { x: clientX, y: clientY }]);
  }

  const handleUndo = () => {
    const newCords = [...cords];
    const removedCord = newCords.pop();
    if (!removedCord) return;
    console.log(removedCord, "removed cord");
    setRemovedCords([...removedCords, removedCord]);
    setCords(newCords);

    if (cords.length === 0) return;
  };

  const handleRedo = () => {
    const newRemovedCords = [...removedCords];
    const removedCord = newRemovedCords.pop();
    if (!removedCord) return;
    setRemovedCords(newRemovedCords);
    setCords([...cords, removedCord]);
  };

  return (
    <>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <div className="body" onClick={Cords}>
        {cords?.map((circle, idx) => {
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: circle.y - 25 + "px",
                left: circle.x - 25 + "px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "3px solid green",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default App;
