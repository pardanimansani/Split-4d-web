import { useState } from "react";

export default function Home() {
  const [lines, setLines] = useState<string[]>([]);
  const [result, setResult] = useState<string[][]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputLines = e.target.value.split("*").map(line => line.trim()).filter(Boolean);
    setLines(inputLines);
  };

  const splitAndShuffle = () => {
    const shuffled = [...lines].sort(() => 0.5 - Math.random());
    const chunked = [];
    for (let i = 0; i < shuffled.length; i += 500) {
      chunked.push(shuffled.slice(i, i + 500));
    }
    setResult(chunked);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Split 4D Web</h1>
      <textarea rows={10} style={{ width: "100%" }} onChange={handleChange} placeholder="Paste 1500 lines separated by *" />
      <button onClick={splitAndShuffle}>Split & Shuffle</button>
      {result.map((group, index) => (
        <div key={index}>
          <h3>Group {index + 1}</h3>
          <textarea rows={10} style={{ width: "100%" }} readOnly value={group.join("*")} />
        </div>
      ))}
    </div>
  );
}