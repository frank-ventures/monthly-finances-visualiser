export default function DisplaySection({ definition }) {
  return (
    <div className={`user-${definition}`}>
      <h2 className="text-4xl">
        {definition.charAt(0).toUpperCase() + definition.slice(1)}
      </h2>
    </div>
  );
}
