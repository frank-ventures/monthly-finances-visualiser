export default function StatsWrapper({ stats }) {
  return (
    <div className="bg-green-600 p-4 flex flex-col gap-4 rounded-md border-2 w-10/12">
      {stats.map((stat, index) => {
        return (
          <p key={index} className="flex justify-between gap-8 font-light">
            <span className="">{stat.text}</span>
            <span className="text-xl">
              {stat.percentTrue ? stat.figure + `%` : `£` + stat.figure}
            </span>
          </p>
        );
      })}
    </div>
  );
}
