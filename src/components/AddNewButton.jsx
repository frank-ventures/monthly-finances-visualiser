export default function AddNewButton({ onClickFunction, text, disabled }) {
  return (
    <button
      className={`rounded-lg p-2 w-48 transition-all duration-300
        ${
          disabled
            ? `bg-gray-500 bg-opacity-80`
            : `text-sky-900 bg-sky-200 shadow shadow-black
            border-b-4 border-x-2 border-sky-700
            hover:bg-sky-900 hover:text-sky-200 hover:shadow-md hover:shadow-black hover:-translate-y-1
            
            active:shadow-inner active:shadow-black active:bg-sky-500 active:text-sky-900 active:border-b-0 active:mb-1`
        }`}
      onClick={onClickFunction}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// text-white bg-green-600 px-3 py-1 rounded-lg shadow shadow-black cursor-pointer hover:shadow-md hover:shadow-black hover:bg-green-500  hover:text-green-900 hover:-translate-y-1 transition-all active:bg-green-600  border-b-4 border-x-2 border-green-800
