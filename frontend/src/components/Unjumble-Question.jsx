import React, { useState } from "react";

export default function UnjumbleQuestion({ questionsInput }) {
  const [qIndex, setQIndex] = useState(0);
  const [items, setItems] = useState(questionsInput[qIndex]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("dragIndex");
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  const handleDragOver = (e) => e.preventDefault();

	const handleNext = () => {
    if (qIndex < questionsInput.length - 1) {
			setItems(questionsInput[qIndex + 1]);
      setQIndex(qIndex + 1);
    } else {
      alert("Submitted, No more questions!");
    }
  };

  return (
		<div>
			<div className="flex border rounded-4xl mt-4 py-3 px-5">
				{items.map((question, index) => (
					<div
						key={index}
						className="rounded-2xl text-2xl mr-4 px-4 py-2 cursor-move"
						style={{ backgroundColor: "#E8DFCA" }}
						draggable
						onDragStart={(e) => handleDragStart(e, index)}
						onDragOver={handleDragOver}
						onDrop={(e) => handleDrop(e, index)}
					>
						{question}
					</div>
				))}
			</div>

			<div className="flex justify-center mt-8">
				<button
					className="btn btn-ghost rounded-4xl outline-0 text-2xl py-6 px-8 hover:outline-none"
					style={{
						backgroundColor: "#6d94c5",
						fontFamily: "Nunito",
						color: "white",
					}}
					onClick={handleNext}
				>
					{qIndex === questionsInput.length - 1 ? "Submit" : "Next"}
				</button>
			</div>
		</div>
    
  );
}
