import MainHeading from "./MainHeading";
import Stat from "./Stat";
import StatsWrapper from "./StatsWrapper";
export default function IncomeSection({
  setIncomeVisible,
  incomeVisible,
  userIncome,
  setUserIncome,
  annualTakeHome,
  monthlytakeHome,
}) {
  return (
    <div className="user-income flex flex-col gap-2 bg-green-800 text-white p-2 rounded-md w-full border-t-8 border-t-green-600 shadow shadow-slate-800">
      <MainHeading
        mainColour={"bg-orange-300"}
        hoverColour={"hover:bg-orange-600"}
        onClickFunction={() => {
          setIncomeVisible(!incomeVisible);
        }}
        text={"Income"}
        visibility={incomeVisible}
      />

      <label htmlFor="userIncome" className="text-center font-light text-lg ">
        Your Annual Income:{" "}
        <span className="text-2xl pl-2 text-green-400">
          £
          {userIncome.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </label>

      <div
        className={`${
          incomeVisible ? `block` : `hidden`
        } flex flex-col items-center gap-4`}
      >
        <input
          name="userIncome"
          type="number"
          min={0}
          placeholder="Enter your yearly income"
          value={userIncome.toString()}
          className="p-2 rounded shadow-inner shadow-black text-black w-8/12 max-w-72"
          onChange={(event) => {
            const income = event.target.value.replace(/^0+/, "");
            setUserIncome(parseInt(income || 0));
          }}
        />

        <StatsWrapper>
          <Stat
            text="Annual take home pay:"
            figure={annualTakeHome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          ></Stat>
          <Stat
            text="Monthly take home pay:"
            figure={monthlytakeHome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          ></Stat>
        </StatsWrapper>
      </div>
    </div>
  );
}
