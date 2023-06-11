import { useEffect, useState } from "react";
const Test = () => {
  const [count, setCount] = useState(0);
  const [ setOdd] = useState(false);

  useEffect(() => {
    console.log("a");
  }, []);
  return (
    <>
      <h1>Count</h1>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
          if (count % 2 === 1) {
            setOdd(true);
          }
        }}
      >
        +
      </button>
    </>
  );
};
export default Test;
