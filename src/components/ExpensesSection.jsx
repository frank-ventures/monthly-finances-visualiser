import MainHeading from "./MainHeading";
import DeleteButton from "./DeleteButton";
import AddNewButton from "./AddNewButton";
import "scroll-shadow-element";

export default function ExpensesSection({
  setExpensesVisible,
  expensesVisible,
  expenses,
  handleTypeChange,
  handleDeleteType,
  addNewField,
  expensesTotal,
  monthlytakeHome,
}) {
  return (
    <div className="user-expenses flex flex-col items-center gap-2 bg-green-800 text-white p-2 rounded-md w-full border-t-8 border-t-green-600 shadow shadow-slate-800">
      <MainHeading
        mainColour={"bg-purple-300"}
        hoverColour={"hover:bg-purple-600"}
        onClickFunction={() => setExpensesVisible(!expensesVisible)}
        text={"Expenses"}
        visibility={expensesVisible}
      />
      <p className="text-center font-extralight mb-2">
        All figures are monthly
      </p>

      {expensesVisible ? (
        <>
          <scroll-shadow>
            <div
              className={`hidden-scrollbar overflow-x-scroll whitespace-nowrap flex flex-col gap-2 max-h-52 overflow-scroll border border-solid border-green-800 bg-sky-800 p-2 rounded-lg shadow-inner shadow-black border-l-4 border-l-sky-500`}
            >
              <div className="flex gap-2 justify-between items-center text-center mx-2 ">
                <p className="w-5/12">What is it?</p>
                <p className="w-4/12">How much?</p>
                <p className="w-2/12">Get rid!</p>
              </div>
              <div className="flex flex-col gap-2 ">
                {expenses.map((item, index) => (
                  <div
                    className="flex gap-2 justify-between items-center"
                    key={index}
                  >
                    <input
                      name="expenseName"
                      type="text"
                      placeholder="Name of Expense"
                      className="p-2 rounded w-5/12 shadow-inner shadow-black text-black"
                      value={item.expenseName}
                      onChange={(event) =>
                        handleTypeChange(event, index, "expense")
                      }
                    />
                    <span className="before:content-['£']  before:text-white before:pt-2 before:pr-1 w-4/12 flex justify-end">
                      <input
                        name="expenseValue"
                        type="number"
                        placeholder="Enter Monthly Amount"
                        className={`p-2 rounded text-black w-11/12 shadow-inner shadow-black  ${
                          isNaN(item.expenseValue)
                            ? `bg-red-500 text-white`
                            : ``
                        }`}
                        value={
                          item.expenseValue == "Enter a number"
                            ? 0
                            : item.expenseValue || 0
                        }
                        onChange={(event) =>
                          handleTypeChange(event, index, "expense")
                        }
                      />
                    </span>

                    <DeleteButton
                      onClickFunction={() => handleDeleteType(index, "expense")}
                      text="Delete"
                      conditionalCheck={expenses.length == 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </scroll-shadow>

          <AddNewButton
            onClickFunction={() => {
              addNewField("expense");
            }}
            text={"Add New Expense"}
          />
        </>
      ) : (
        ""
      )}

      <div className="flex flex-col gap-2 my-4 w-10/12 max-w-80">
        {isNaN(expensesTotal) ? (
          "Check your amounts!"
        ) : (
          <>
            <div>
              <p className="flex justify-between gap-2 font-light">
                Total Expenses:
                <span className="text-xl">£{expensesTotal.toFixed(2)}</span>
              </p>
            </div>

            <p className="flex justify-between gap-2 font-light">
              Income Remaining:
              <span className="text-xl">
                £{(monthlytakeHome - expensesTotal).toFixed(2)}
              </span>
            </p>

            <p className="flex justify-between gap-2 font-light">
              % of Income Remaining:{" "}
              <span className="text-xl">
                {(
                  ((monthlytakeHome - expensesTotal) / monthlytakeHome) *
                  100
                ).toFixed(1)}
                %
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
