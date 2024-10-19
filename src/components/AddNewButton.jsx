export default function AddNewButton({ onClickFunction, text }) {
  return (
    <button
      className="bg-orange-300 text-orange-700 shadow shadow-black rounded p-2 w-48"
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
}
