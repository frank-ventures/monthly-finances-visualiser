export default function SectionWrapper({ children }) {
  return (
    <div className="w-full flex flex-col items-center gap-8 bg-gradient-to-br from-green-400 via-green-800 to-green-600 text-white p-2 rounded-md border-l-4 border-l-green-800 shadow shadow-slate-800">
      {children}
    </div>
  );
}
