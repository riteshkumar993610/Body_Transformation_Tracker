import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Progress() {

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("weightHistory")) || [];

    setHistory(saved);
  }, []);

  const addWeight = () => {

    const newData = {
      date,
      weight,
    };

    const oldData =
      JSON.parse(localStorage.getItem("weightHistory")) || [];

    oldData.push(newData);

    localStorage.setItem(
      "weightHistory",
      JSON.stringify(oldData)
    );

    setHistory(oldData);

    setDate("");
    setWeight("");

    alert("Weight Added Successfully ✅");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold text-center mb-6">
        📈 Weight Progress
      </h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <button
        onClick={addWeight}
        className="bg-black text-white w-full py-3 rounded-lg"
      >
        Add Weight
      </button>

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Weight History
        </h2>

        {history.length === 0 ? (
          <p>No Data Found</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 mb-3"
            >
              <p>📅 {item.date}</p>
              <p>⚖️ {item.weight} kg</p>
            </div>
          ))
        )}

      </div>
     <div className="mt-8">

  <h2 className="text-2xl font-bold mb-4">
    📊 Weight Progress Graph
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={history}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="weight"
        stroke="#000"
        strokeWidth={3}
      />

    </LineChart>
  </ResponsiveContainer>

</div>
    </div>
  );
}

export default Progress;