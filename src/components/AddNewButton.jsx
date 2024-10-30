export default function AddNewButton({ onClickFunction, text, disabled }) {
  return (
    <button
      className={`rounded p-2 w-48 transition-all
        ${
          disabled
            ? `bg-gray-500 bg-opacity-80`
            : `bg-sky-200 text-sky-900 shadow shadow-black  hover:bg-sky-900 hover:text-sky-200 hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black active:bg-sky-500 active:text-sky-900 `
        }`}
      onClick={onClickFunction}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
