export default function DeleteButton({
  onClickFunction,
  text,
  conditionalCheck,
}) {
  return (
    <button
      className={`${
        conditionalCheck
          ? `bg-slate-400 text-black opacity-30`
          : `bg-red-700 bg-opacity-40 text-white shadow-md border border-solid border-red-900 hover:bg-red-800 hover:border-red-700 active:shadow-md active:shadow-black `
      } w-2/12  p-1 transition-all`}
      disabled={conditionalCheck}
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
}
