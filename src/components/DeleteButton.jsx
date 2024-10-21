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
          : `bg-red-700 text-white shadow-md border border-solid border-red-900 w-2/12`
      }  p-1`}
      disabled={conditionalCheck}
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
}
