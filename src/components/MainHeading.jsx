export default function MainHeading({
  mainColour,
  hoverColour,
  onClickFunction,
  text,
  visibility,
}) {
  return (
    <h2
      className={`flex justify-between px-12 text-4xl text-black ${mainColour} text-center p-1 rounded-md hover:cursor-pointer ${hoverColour}  w-full shadow shadow-black`}
      onClick={onClickFunction}
    >
      {text}
      <span className="pl-6">{visibility ? "⬆" : "⬇"}</span>
    </h2>
  );
}
