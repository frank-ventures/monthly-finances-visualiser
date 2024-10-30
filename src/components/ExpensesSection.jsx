import MainHeading from "./MainHeading";
import DeleteButton from "./DeleteButton";
import AddNewButton from "./AddNewButton";
import "scroll-shadow-element";
import StatsWrapper from "./StatsWrapper";
import SectionWrapper from "./SectionWrapper";

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
  const expensesStats = [
    {
      text: "Total Expenses:",
      figure: expensesTotal.toFixed(2),
      percentTrue: false,
    },
    {
      text: "Income Remaining:",
      figure: (monthlytakeHome - expensesTotal).toFixed(2),
      percentTrue: false,
    },
    {
      text: "% of Income Remaining:",
      figure: (
        ((monthlytakeHome - expensesTotal) / monthlytakeHome) *
        100
      ).toFixed(1),
      percentTrue: true,
    },
  ];

  return (
    <SectionWrapper>
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

      {isNaN(expensesTotal) ? (
        <p>Check your amounts!</p>
      ) : (
        <StatsWrapper stats={expensesStats} />
      )}
    </SectionWrapper>
  );
}
