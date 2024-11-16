export default function PosNegButton({
  text,
  onClickFunction,
  positive,
  conditionalCheck,
}) {
  return (
    <button
      className={`${
        positive
          ? `text-white bg-green-600 px-3 py-1 rounded-lg shadow shadow-black cursor-pointer hover:shadow-md hover:shadow-black hover:bg-green-500  hover:text-green-900 hover:-translate-y-1 transition-all active:bg-green-600  border-b-4 border-x-2 border-green-800`
          : `bg-red-500 text-red-100 px-3 py-1 rounded-lg shadow shadow-black cursor-pointer 
          ${
            conditionalCheck
              ? ``
              : `hover:shadow-md hover:shadow-black hover:bg-red-800  hover:text-red-200 hover:-translate-y-1 transition-all active:bg-red-600  border-b-4 border-x-2 border-red-800`
          }`
      } 
          ${
            conditionalCheck
              ? `bg-slate-400 text-black opacity-30 cursor-default`
              : ``
          } `}
      onClick={onClickFunction}
      disabled={conditionalCheck}
    >
      {text}
    </button>
  );
}
