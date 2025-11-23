import React, { useRef, useEffect } from "react";

export default function FruitSlicingQuestion({ score, setScore, words, answers }) {
  const canvasRef = useRef(null);
  const trail = useRef([]);
  const fruits = useRef([]);
  const loopStarted = useRef(false);

	const spawnFruit = (width, height) => {
		// Limit spawn zone to the center 50% of the width
		const minX = width * 0.4;
		const maxX = width * 0.6;

		const randomLabel = words[Math.floor(Math.random() * words.length)];

		const x = minX + Math.random() * (maxX - minX);
		fruits.current.push({
			x,
			y: height,
			radius: 50,
			vy: -11 - Math.random()*3 , // upward velocity
			sliced: false,
			label: randomLabel,
		});
	};

  const checkCollision = (fruit, trailPoint) => {
    const dx = fruit.x - trailPoint.x;
    const dy = fruit.y - trailPoint.y;
    return Math.sqrt(dx * dx + dy * dy) < fruit.radius;
  };

  useEffect(() => {
		if (loopStarted.current) return; // prevent double init in Strict Mode
		loopStarted.current = true;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const parent = canvas.parentElement;
		const resizeCanvas = () => {
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		let lastSpawn = performance.now();

		const loop = (time) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw fruits
			fruits.current.forEach((fruit) => {
				if (!fruit.sliced) {
					fruit.y += fruit.vy;
					fruit.vy += 0.3; // gravity
					ctx.beginPath();
					ctx.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
					ctx.fillStyle = "#E8DFCA";
					ctx.fill();
					ctx.fillStyle = "#526E88";
					ctx.font = "28px Nunito";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(fruit.label, fruit.x, fruit.y);
				}
			});

			// Draw trail
			ctx.beginPath();
			trail.current.forEach((p, i) => {
				if (i === 0) ctx.moveTo(p.x, p.y);
				else ctx.lineTo(p.x, p.y);
			});
			ctx.strokeStyle = "#6D94C5";
			ctx.lineWidth = 4;
			ctx.stroke();

			// Check fruit slice
			fruits.current.forEach((fruit) => {
				if (!fruit.sliced) {
					for (let p of trail.current) {
						if (checkCollision(fruit, p)) {
							fruit.sliced = true;
							if(answers.includes(fruit.label)) setScore((s) => s + 1);
							break;
						}
					}
				}
    	});

    	// Spawn control
			if (time - lastSpawn > 2000) {
				spawnFruit(canvas.width, canvas.height);
				lastSpawn = time;
			}

    	requestAnimationFrame(loop);
  	};

  	requestAnimationFrame(loop);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [setScore]);


  // Track pointer relative to canvas
  useEffect(() => {
		const canvas = canvasRef.current;

		const handleMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			trail.current.push({ x, y });
			if (trail.current.length > 20) trail.current.shift();
		};

		canvas.addEventListener("pointermove", handleMove);
		return () => canvas.removeEventListener("pointermove", handleMove);
	}, []);


  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "1rem",
        }}
      />
    </div>
  );
}
