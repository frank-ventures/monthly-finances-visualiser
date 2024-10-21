import MainHeading from "./MainHeading";
export default function IncomeSection({
  setIncomeVisible,
  incomeVisible,
  userIncome,
  setUserIncome,
  annualTakeHome,
  monthlytakeHome,
}) {
  return (
    <div className="user-income flex flex-col gap-2 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
      <MainHeading
        mainColour={"bg-orange-400"}
        hoverColour={"hover:bg-orange-600"}
        onClickFunction={() => {
          setIncomeVisible(!incomeVisible);
        }}
        text={"Income"}
        visibility={incomeVisible}
      />

      <label htmlFor="userIncome" className="text-center font-light text-lg">
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
        } flex flex-col items-center`}
      >
        <input
          name="userIncome"
          type="number"
          min={0}
          placeholder="Enter your yearly income"
          value={userIncome}
          className="p-2 rounded shadow-inner shadow-black text-black w-8/12 max-w-72"
          onChange={(event) => {
            setUserIncome(parseInt(event.target.value || 0));
          }}
        />

        <div className="flex flex-col gap-2 my-4 w-10/12 max-w-96">
          <p className="flex justify-between gap-2 mx-4">
            <span className="italic font-extralight">
              Annual take home pay:
            </span>
            <span className="text-lg">
              £
              {annualTakeHome.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>

          <p className="flex justify-between gap-2 mx-4">
            <span className="italic font-extralight">
              Monthly take home pay:
            </span>
            <span className="text-lg">
              £
              {monthlytakeHome.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
