import { useEffect, useRef, useState } from "react";
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
  const [inputVisible, setInputVisible] = useState(false);
  const inputref = useRef(null);
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

  useEffect(() => {
    if (inputVisible) {
      inputref.current.focus();
    }
  }, [inputVisible]);

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
        <span className="text-3xl pl-1 text-green-400">£</span>
        {!inputVisible && (
          <span
            className="rounded pl-1 w-8/12  max-w-56 bg-green-600 text-3xl text-green-400 bg-opacity-5"
            onClick={() => {
              setInputVisible(true);
            }}
          >
            {userIncome.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        )}
        <input
          id="input"
          ref={inputref}
          onBlur={() => {
            setInputVisible(false);
          }}
          name="userIncome"
          type="number"
          min={0}
          placeholder="Enter here"
          value={userIncome === 0 ? "" : userIncome}
          className={`rounded pl-1 w-8/12 max-w-32 bg-green-600 text-3xl text-green-400 bg-opacity-5 focus:bg-green-300 focus:text-green-800 ${
            inputVisible ? `inline` : `hidden`
          }`}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              setInputVisible(false);
            }
          }}
          onChange={(event) => {
            let income = Number(event.target.value.replace(/[^0-9.]/g, ""));
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
