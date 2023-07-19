"use client";
import { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

const HumanVsHuman = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [squareStyles, setSquareStyles] = useState({});
  const [player, setPlayer] = useState(true);

  const orient = () => {
    if (player) {
      return "white";
    } else {
      return "black";
    }
  };

  const handleMove = ({ sourceSquare, targetSquare }) => {
    try {
      chess.move({
        from: sourceSquare,
        to: targetSquare,
      });

      setPlayer(!player);

      setFen(chess.fen());

      setSquareStyles({
        [sourceSquare]: { backgroundColor: "green" },
        [targetSquare]: { backgroundColor: "green" },
      });
    } catch (error) {
      setSquareStyles({
        [sourceSquare]: { backgroundColor: "green" },
      });
    }
  };

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
        orientation={orient()}
        width={400}
      />
    </div>
  );
};

export default HumanVsHuman;
