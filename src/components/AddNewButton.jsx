export default function AddNewButton({ onClickFunction, text }) {
  return (
    <button
      className="bg-sky-200 text-sky-900 shadow shadow-black rounded p-2 w-48 hover:bg-sky-900 hover:text-sky-200 hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black active:bg-sky-500 active:text-sky-900"
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
}
