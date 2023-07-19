import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-4">
      <Link href="./passplay">
        <button className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Pass & Play
        </button>
      </Link>
      <Link href="./computer">
        <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
          Play Computer
        </button>
      </Link>
    </div>
  );
}
