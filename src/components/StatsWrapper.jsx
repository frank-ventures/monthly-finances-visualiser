export default function StatsWrapper({ children }) {
  return (
    <div className="bg-green-600 p-4 flex flex-col gap-4 rounded-md border-2 w-10/12">
      {children}
    </div>
  );
}
