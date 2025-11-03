import React from "react";

function Leaderboard({ tracks }) {
  return (
    <div className="rounded-2xl mt-5 border p-5 bg-white">
      <p
        className="text-2xl mb-3 font-bold"
        style={{ color: "#526E88", fontFamily: "Nunito" }}
      >
        <b>Leaderboard</b>
      </p>

      {/* Scrollable container */}
      <div
        className="text-lg w-full overflow-y-auto pr-2 space-y-1"
        style={{
          color: "#526E88",
          fontFamily: "Nunito",
          maxHeight: "400px", // adjust to your layout
        }}
      >
        {tracks.map((track, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-1"
          >
            <span className="truncate max-w-100">
              {index + 1}. {track.username}
            </span>
            <span>{track.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
