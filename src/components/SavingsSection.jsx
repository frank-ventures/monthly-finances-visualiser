import MainHeading from "./MainHeading";
import DeleteButton from "./DeleteButton";
import AddNewButton from "./AddNewButton";

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
            <div className="hidden-scrollbar flex flex-col gap-2 max-h-52 overflow-scroll overflow-x-hidden border border-solid border-green-800 p-2 rounded-lg w-full  bg-sky-800 shadow-inner shadow-black border-l-4 border-l-sky-500">
              <div className="flex gap-2 justify-between items-center text-center mx-2">
                <p className="w-3/12">What is it?</p>
                <p className="w-2/12">How much?</p>
                <p className="w-2/12">Type?</p>
                <p className="w-2/12">Stored Where?</p>
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
                  <input
                    name="savingValue"
                    type="number"
                    placeholder="Enter Monthly Amount"
                    className={`shadow-inner shadow-black p-2 rounded text-black w-[14%] ${
                      isNaN(item.savingValue) ? `bg-red-500 text-white` : ``
                    }`}
                    value={item.savingValue}
                    onChange={(event) =>
                      handleTypeChange(event, index, "saving")
                    }
                  />
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

          <div className="flex flex-col gap-2 my-4 w-8/12 max-w-96">
            {isNaN(savingsTotal) ? (
              <p>Check your amounts!</p>
            ) : (
              <>
                <p className="flex justify-between gap-2 font-light">
                  Total Saved Monthly:
                  <span className="text-xl">
                    £
                    {savingsTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>

                <div className="flex justify-between gap-2 font-light italic">
                  <p>
                    As Percent{" "}
                    <span className="text-sm">
                      (of £{(monthlytakeHome - expensesTotal).toFixed(2)})
                    </span>
                    :
                  </p>

                  <span className="text-xl">
                    {(
                      (savingsTotal / (monthlytakeHome - expensesTotal)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </div>

                {savingsTypes.map((type, index) => {
                  const matchedValue = savings
                    .filter((each) => each.savingType == type)
                    .reduce((acc, curr) => acc + parseInt(curr.savingValue), 0);
                  return (
                    <p
                      key={index}
                      className="flex justify-between gap-2 font-light"
                    >
                      Total in {type}s
                      <span className="text-xl">
                        £
                        {matchedValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  );
                })}
              </>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
