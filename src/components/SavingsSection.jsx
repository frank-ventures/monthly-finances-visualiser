import MainHeading from "./MainHeading";
import DeleteButton from "./DeleteButton";
import AddNewButton from "./AddNewButton";
import StatsWrapper from "./StatsWrapper";
import Stat from "./Stat";

export default function SavingsSection({
  setSavingsVisible,
  savingsVisible,
  savings,
  savingsTotal,
  savingsTypes,
  handleTypeChange,
  handleDeleteType,
  addNewField,
  expensesTotal,
  monthlytakeHome,
}) {
  return (
    <div className="user-savings flex flex-col items-center gap-2 bg-green-800 text-white p-2 rounded-md w-full border-t-8 border-t-green-600 shadow shadow-slate-800">
      <MainHeading
        mainColour={"bg-yellow-300"}
        hoverColour={"hover:bg-yellow-600"}
        onClickFunction={() => setSavingsVisible(!savingsVisible)}
        text={"Savings"}
        visibility={savingsVisible}
      />

      <div className="flex justify-evenly gap-6">
        <p className="flex gap-2 items-center font-light">
          Unallocated Funds:
          <span className="text-green-400 text-lg">
            £{(monthlytakeHome - expensesTotal - savingsTotal).toFixed(2)}
          </span>
        </p>
        <p className="flex gap-2 items-center font-light">
          As Percent
          <span className="text-green-400 text-lg">
            {(
              ((monthlytakeHome - expensesTotal - savingsTotal) /
                (monthlytakeHome - expensesTotal)) *
              100
            ).toFixed(2)}
            %
          </span>
        </p>
      </div>
      {savingsVisible ? (
        <>
          <scroll-shadow>
            <div className="hidden-scrollbar min-w-[600px] overflow-x-scroll whitespace-nowrap flex flex-col gap-2 max-h-52 overflow-scroll border border-solid border-green-800 p-2 rounded-lg w-full  bg-sky-800 shadow-inner shadow-black border-l-4 border-l-sky-500 ">
              <div className="flex gap-2 justify-between items-center text-center mx-2">
                <p className="w-3/12">What is it?</p>
                <p className="w-2/12">How much?</p>
                <p className="w-2/12">Type?</p>
                <p className="w-2/12">Location?</p>
                <p className="w-2/12">Get rid!</p>
              </div>
              {savings.map((item, index) => (
                <div className="flex gap-2 justify-between text-sm" key={index}>
                  <input
                    name="savingName"
                    type="text"
                    placeholder="Name of Saving"
                    className="shadow-inner shadow-black p-2 rounded text-black w-3/12"
                    value={item.savingName}
                    onChange={(event) =>
                      handleTypeChange(event, index, "saving")
                    }
                  />
                  <span className="before:content-['£']  before:text-white before:pt-2 before:pr-1 w-[14%] flex justify-end">
                    <input
                      name="savingValue"
                      type="number"
                      placeholder="Enter Monthly Amount"
                      className={`shadow-inner shadow-black p-2 rounded text-black w-10/12 ${
                        isNaN(item.savingValue) ? `bg-red-500 text-white` : ``
                      }`}
                      value={item.savingValue || 0}
                      onChange={(event) =>
                        handleTypeChange(event, index, "saving")
                      }
                    />
                  </span>
                  <select
                    name="savingType"
                    className="shadow-inner shadow-black rounded text-black w-2/12"
                    onChange={(event) =>
                      handleTypeChange(event, index, "saving")
                    }
                  >
                    {savingsTypes.map((type, index) => {
                      return (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    name="savingLocation"
                    type="text"
                    placeholder="Kept where?"
                    className="shadow-inner shadow-black rounded p-2 text-black w-2/12"
                    value={item.savingLocation}
                    onChange={(event) =>
                      handleTypeChange(event, index, "saving")
                    }
                  />

                  <DeleteButton
                    onClickFunction={() => handleDeleteType(index, "saving")}
                    text="Delete"
                    conditionalCheck={savings.length == 1}
                  />
                </div>
              ))}
            </div>
          </scroll-shadow>

          <AddNewButton
            onClickFunction={() => {
              addNewField("saving");
            }}
            text={"Add New Saving"}
          />

          {isNaN(savingsTotal) ? (
            <p>Check your amounts!</p>
          ) : (
            <StatsWrapper>
              <Stat
                text="Total Saved Monthly:"
                figure={savingsTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              ></Stat>
              <Stat
                text={`As Percent (of £${(
                  monthlytakeHome - expensesTotal
                ).toFixed(2)})`}
                figure={(
                  (savingsTotal / (monthlytakeHome - expensesTotal)) *
                  100
                ).toFixed(2)}
                percentTrue={true}
              ></Stat>

              {savingsTypes.map((type, index) => {
                const matchedValue = savings
                  .filter((each) => each.savingType == type)
                  .reduce((acc, curr) => acc + parseInt(curr.savingValue), 0);
                return (
                  <Stat
                    key={index}
                    text={`Total in ${type}s:`}
                    figure={matchedValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  ></Stat>
                );
              })}
            </StatsWrapper>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
