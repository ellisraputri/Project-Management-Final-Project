import React from "react";

export default function FruitNinjaReviewCard({ questionGroup, answers }) {
  return (
    <div className="w-full bg-white rounded-2xl border p-5 mt-4">
      <p
        className="text-2xl font-bold mb-4"
        style={{ color: "#526E88", fontFamily: "Nunito" }}
      >
        <b>Review</b>
      </p>

      {/* Scrollable container */}
      <div
        className="space-y-3 text-lg overflow-y-auto pr-2"
        style={{
          color: "#526E88",
          fontFamily: "Nunito",
          maxHeight: "400px", // adjust as needed
        }}
      >
        <p
					className="text-2xl font-bold mb-4"
					style={{ color: "#526E88", fontFamily: "Nunito" }}
				>
					<b>{questionGroup}</b>
				</p>

        {answers.map((item, index) => (
          <div key={index} className="bg-blue-50 rounded-xl p-3 leading-relaxed">
            <p>
              <span className="font-semibold">{item}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
