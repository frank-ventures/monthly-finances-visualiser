export default function SectionWrapper({ children }) {
  return (
    <div className="user-income flex flex-col items-center gap-2 bg-green-800 text-white p-2 rounded-md w-full border-t-8 border-t-green-600 shadow shadow-slate-800">
      {children}
    </div>
  );
}
