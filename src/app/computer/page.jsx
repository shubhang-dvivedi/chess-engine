"use client";
import Link from "next/link";

export default function Computer() {
  const randomChoice = Math.random() < 0.5 ? "white" : "black";

  return (
    <div className="mt-4">
      <Link href={`./computer/${randomChoice}`}>
        <button className="px-4 py-2 mr-2 text-white bg-gray-800 rounded hover:bg-gray-700">
          Random Toss
        </button>
      </Link>
      <Link href="./computer/white">
        <button className="px-4 py-2 mr-2 bg-white rounded hover:bg-gray-300 text-gray-900">
          White
        </button>
      </Link>
      <Link href="./computer/black">
        <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-700">
          Black
        </button>
      </Link>
    </div>
  );
}
