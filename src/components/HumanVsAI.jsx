"use client";
import { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { computeNextMove } from "@/app/computeNextMove";


const HumanVsAI = ({ playAs }) => {
  let orient = "";
  if (playAs) {
    orient = "white";
  } else {
    orient = "black";
  }

  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [squareStyles, setSquareStyles] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [player, setPlayer] = useState(true);

  const handleMove = ({ sourceSquare, targetSquare }) => {
    if (gameOver || player !== playAs) return;

    try {
      chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      setSquareStyles({
        [sourceSquare]: { backgroundColor: "green" },
        [targetSquare]: { backgroundColor: "green" },
      });

      setFen(chess.fen());

      if (chess.isGameOver()) {
        setGameOver(true);
      } else {
        setTimeout(() => {
          setPlayer(!player);
        }, 250);
      }
    } catch (error) {
      setSquareStyles({
        [sourceSquare]: { backgroundColor: "green" },
      });
    }
  };

  useEffect(() => {
    const aiPlay = () => {
      if (player !== playAs && !gameOver) {
        if (chess.isGameOver()) {
          setGameOver(true);
          return;
        }
        // const aiMove1 = nextBestMove(3, fen, player, -Infinity, Infinity); // Call your AI function here
        const aiMove = computeNextMove(3, fen); // Call your AI function here
        // console.log("move1: "+aiMove1);
        console.log("move2: "+aiMove);
        try {
          const move = chess.move(aiMove[1]);
          setSquareStyles({
            [move.from]: { backgroundColor: "green" },
            [move.to]: { backgroundColor: "green" },
          });

          setFen(chess.fen());

          if (chess.isGameOver()) {
            setGameOver(true);
          } else {
            setPlayer(!player);
          }
        } catch (err) {
          console.log("oops");
        }
      }
    };

    if (player === !playAs) {
      aiPlay();
    }
  }, [player, fen, gameOver]);

  const onMouseOverSquare = (square) => {
    const moves = chess.moves({ square, verbose: true });
    if (moves.length === 0) return;

    const squareStyles = {};
    for (const move of moves) {
      squareStyles[move.to] = { backgroundColor: "green" };
    }

    setSquareStyles(squareStyles);
  };

  const onMouseOutSquare = () => {
    setSquareStyles({});
  };

  return (
    <div>
      <Chessboard
        position={fen}
        onDrop={handleMove}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        squareStyles={squareStyles}
        dropSquareStyle={{
          boxShadow: "inset 0 0 1px 4px green",
        }}
        orientation={orient}
        width={400}
      />
    </div>
  );
};

export default HumanVsAI;
