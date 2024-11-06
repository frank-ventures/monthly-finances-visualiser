import MainHeading from "./MainHeading";
import SectionWrapper from "./SectionWrapper";
import StatsWrapper from "./StatsWrapper";
export default function IncomeSection({
  setIncomeVisible,
  incomeVisible,
  userIncome,
  setUserIncome,
  annualTakeHome,
  monthlytakeHome,
}) {
  const incomeStats = [
    {
      text: "Annual take home pay:",
      figure: annualTakeHome.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      percentTrue: false,
    },
    {
      text: "Monthly take home pay:",
      figure: monthlytakeHome.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      percentTrue: false,
    },
  ];

  return (
    <SectionWrapper>
      <MainHeading
        mainColour={"bg-orange-300"}
        hoverColour={"hover:bg-orange-600"}
        onClickFunction={() => {
          setIncomeVisible(!incomeVisible);
        }}
        text={"Income"}
        visibility={incomeVisible}
      />

      <label htmlFor="userIncome" className="text-center font-light text-lg">
        Your Annual Income:{" "}
        <span className="text-3xl pl-2 text-green-400">£</span>
        <input
          name="userIncome"
          type="text"
          min={0}
          placeholder="Enter here"
          value={
            userIncome === 0
              ? ""
              : userIncome.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
          }
          className="rounded pl-1 w-8/12 max-w-56 bg-green-600 text-3xl text-green-400 bg-opacity-5 focus:bg-green-300 focus:text-green-800"
          onChange={(event) => {
            let income = event.target.value.replace(/[^0-9.]/g, "");
            setUserIncome(income ? parseFloat(income) : 0);
          }}
        />
      </label>

      <div
        className={`${
          incomeVisible ? `block` : `hidden`
        } flex flex-col items-center gap-4 w-full`}
      >
        <StatsWrapper stats={incomeStats} />
      </div>
    </SectionWrapper>
  );
}
