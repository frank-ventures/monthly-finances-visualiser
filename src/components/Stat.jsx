export default function Stat({ text, figure, percentTrue }) {
  return (
    <p className="flex justify-between gap-8 font-light">
      <span className="">{text}</span>
      <span className="text-xl">
        {percentTrue ? figure + `%` : `£` + figure}
      </span>
    </p>
  );
}
