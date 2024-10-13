import { useEffect, useState } from "react";
import "./App.css";

//TODO: Tidy up this enormous messy tangle of code. Refactoring, Components and more.
export default function App() {
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Income --- --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- User Income
  // --- Income
  const [userIncome, setUserIncome] = useState(() => {
    return JSON.parse(localStorage.getItem("userIncome")) || 0;
  });
  const [incomeVisible, setIncomeVisible] = useState(true);

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Maths --- --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- --- --- ---
  // --- --- Taxable Income --- ---
  const [taxVisible, setTaxVisible] = useState(false);
  // TODO: personal allowance is a dynamic figure I think. Check GOV:
  const personalAllowance = 12570;
  const [usersTaxableIncome, setUsersTaxableIncome] = useState(0);
  useEffect(() => {
    if (userIncome < personalAllowance) {
      setUsersTaxableIncome(0);
    } else {
      setUsersTaxableIncome(parseInt(userIncome - personalAllowance));
    }
  }, [userIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- National Insurance --- ---
  const [nationalInsurancePayments, setNationalInsurancePayments] = useState(0);
  // TODO: NI payments vary depending on income:
  useEffect(() => {
    if (userIncome > 12570 && userIncome < 50270) {
      setNationalInsurancePayments(parseInt(usersTaxableIncome * 0.08));
    } else {
      setNationalInsurancePayments(0);
    }
  }, [userIncome, usersTaxableIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- Tax Paid --- ---
  const [taxPaid, setTaxPaid] = useState(0);
  // TODO: Tax payments is also variable depending on income level:
  useEffect(() => {
    setTaxPaid(parseInt(usersTaxableIncome * 0.2));
  }, [usersTaxableIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- Annual Take Home --- ---
  const [annualTakeHome, setAnnualTakeHome] = useState(0);
  useEffect(() => {
    if (usersTaxableIncome == 0) {
      setAnnualTakeHome(parseInt(Math.round(userIncome * 100) / 100));
    } else {
      let numberToUse = parseInt(
        userIncome - nationalInsurancePayments - taxPaid
      );
      setAnnualTakeHome(parseInt(Math.round(numberToUse * 100) / 100));
    }
  }, [userIncome, usersTaxableIncome, nationalInsurancePayments, taxPaid]);

  // --- --- --- --- --- --- --- ---
  // --- --- Monthly Take Home --- ---
  const [monthlytakeHome, setMonthlyTakeHome] = useState(0);
  useEffect(() => {
    setMonthlyTakeHome(parseInt(annualTakeHome / 12));
  }, [annualTakeHome]);

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Functions --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- --- --- ---
  // --- --- Add Expenses --- ---
  // https://dev.to/okafor__mary/how-to-dynamically-add-input-fields-on-button-click-in-reactjs-5298
  const defaultExpense = { expenseName: "", expenseValue: 0 };
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [defaultExpense];
  });
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [expensesVisible, setExpensesVisible] = useState(false);

  function addExpense() {
    setExpenses([...expenses, defaultExpense]);
  }

  // This detects when there is a change to the 'expenses' array and ensures that the 'total value' calculation is up to date:
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      total = total + parseInt(expenses[i].expenseValue);
    }
    setExpensesTotal(total);
  }, [expenses]);

  const handleExpenseChange = (event, index) => {
    const expenseChange = expenses.map((expense, i) => {
      if (i === index) {
        return {
          ...expense,
          [event.target.name]: event.target.value,
        };
      } else {
        return expense;
      }
    });

    setExpenses(expenseChange);
  };

  const handleDeleteExpense = (index) => {
    const newArray = [...expenses];
    newArray.splice(index, 1);
    setExpenses(newArray);
  };

  // --- --- --- --- --- --- --- ---
  // --- --- Add Savings --- ---
  // https://dev.to/okafor__mary/how-to-dynamically-add-input-fields-on-button-click-in-reactjs-5298
  const savingsTypes = ["Saving", "Investment", "Personal Pension"];
  const defaultSavings = {
    savingName: "",
    savingValue: 0,
    savingType: savingsTypes[0],
    savingLocation: "Bank ISA",
  };
  const [savings, setSavings] = useState(() => {
    return JSON.parse(localStorage.getItem("savings")) || [defaultSavings];
  });
  const [savingsTotal, setSavingsTotal] = useState(0);
  const [savingsVisible, setSavingsVisible] = useState(false);

  function addSaving() {
    setSavings([...savings, defaultSavings]);
  }

  // This detects when there is a change to the 'savings' array and ensures that the 'total value' calculation is up to date:
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < savings.length; i++) {
      total = total + parseInt(savings[i].savingValue);
    }
    setSavingsTotal(total);
  }, [savings]);

  const handleSavingsChange = (event, index) => {
    const savingsChange = savings.map((saving, i) => {
      if (i === index) {
        return {
          ...saving,
          [event.target.name]: event.target.value,
        };
      } else {
        return saving;
      }
    });

    setSavings(savingsChange);
  };

  const handleDeleteSaving = (index) => {
    const newArray = [...savings];
    newArray.splice(index, 1);
    setSavings(newArray);
  };

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Local Storage --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  useEffect(() => {
    localStorage.setItem("userIncome", JSON.stringify(userIncome));
  }, [userIncome]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("savings", JSON.stringify(savings));
  }, [savings]);

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Main Return --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  return (
    <div className="whole-page flex gap-2 flex-col p-2 items-center bg-blue-200 min-h-dvh">
      <h1 className=" text-orange-600 text-6xl">Play Money</h1>

      <div className="user-income flex flex-col gap-2 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
        <h2
          className="flex justify-between px-12 text-4xl text-black bg-orange-400 text-center p-1 rounded-md"
          onClick={() => {
            setIncomeVisible(!incomeVisible);
          }}
        >
          Income
          <span className="pl-6">{incomeVisible ? "⬆" : "⬇"}</span>
        </h2>

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
                Your annual take home pay:
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
                Your monthly take home pay:
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
      {userIncome == 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center min-h-20 mt-16 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
          <p className="text-2xl font-light text-orange-300">
            Enter your income above
          </p>
        </div>
      ) : (
        <>
          <div className="user-tax flex flex-col items-center gap-2 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
            <h2
              className="flex justify-between px-12 text-4xl bg-blue-400  text-center hover:cursor-pointer hover:bg-blue-600
           text-black p-1 rounded-md w-full
          "
              onClick={() => {
                setTaxVisible(!taxVisible);
              }}
            >
              Tax
              <span className="pl-6">{taxVisible ? "⬆" : "⬇"}</span>
            </h2>

            <div
              className={`${
                taxVisible ? `block` : `hidden`
              } flex flex-col gap-2 my-4 w-8/12 max-w-96`}
            >
              <p className="text-center font-extralight mb-2">
                All figures are yearly
              </p>
              <p className="flex justify-between gap-2 mx-4">
                <span className="italic font-extralight">
                  {" "}
                  Your Taxable Income:
                </span>
                <span className="text-lg">
                  £
                  {usersTaxableIncome.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>

              <p className="flex justify-between gap-2 mx-4">
                <span className="italic font-extralight">
                  Your NI Payments:
                </span>
                <span className="text-lg">
                  £
                  {nationalInsurancePayments.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              <p className="flex justify-between gap-2 mx-4">
                <span className="italic font-extralight">Your tax paid:</span>
                <span className="text-lg">
                  £
                  {taxPaid.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
            </div>
          </div>

          <div className="user-expenses flex flex-col items-center gap-2 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
            <h2
              className="flex justify-between px-12 text-4xl bg-purple-400  text-center hover:cursor-pointer hover:bg-purple-600 text-black p-1 rounded-md w-full"
              onClick={() => setExpensesVisible(!expensesVisible)}
            >
              Expenses
              <span className="pl-6">{expensesVisible ? "⬇" : "⬆"}</span>
            </h2>
            {expensesVisible ? (
              <>
                <div className="flex flex-col gap-2 max-h-32 overflow-scroll border border-solid border-green-800 px-1 py-2 rounded-lg w-full">
                  <div className="flex gap-2 justify-between mx-2">
                    <p>What is it?</p>
                    <p>How much?</p>
                    <p>Get rid</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {expenses.map((item, index) => (
                      <div className="flex gap-2 justify-between" key={index}>
                        <input
                          name="expenseName"
                          type="text"
                          placeholder="Name of Expense"
                          className="p-2 rounded w-56 shadow-inner shadow-black text-black"
                          value={item.expenseName}
                          onChange={(event) =>
                            handleExpenseChange(event, index)
                          }
                        />
                        <input
                          name="expenseValue"
                          type="number"
                          placeholder="Enter Monthly Amount"
                          className={`p-2 rounded text-black w-20 shadow-inner shadow-black ${
                            isNaN(item.expenseValue)
                              ? `bg-red-500 text-white`
                              : ``
                          }`}
                          value={item.expenseValue}
                          onChange={(event) =>
                            handleExpenseChange(event, index)
                          }
                        />

                        <button
                          className={`${
                            expenses.length == 1
                              ? `bg-slate-400 text-black opacity-30`
                              : `bg-red-700 text-white shadow-md border border-solid border-red-900`
                          }  p-1`}
                          disabled={expenses.length == 1}
                          onClick={() => handleDeleteExpense(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="bg-orange-300 rounded p-2 w-48"
                  onClick={addExpense}
                >
                  Add New Expense
                </button>
              </>
            ) : (
              ""
            )}

            <div className="flex flex-col gap-2 my-4 w-10/12 max-w-80">
              {isNaN(expensesTotal) ? (
                "Check your amounts!"
              ) : (
                <>
                  <p>
                    <p className="flex justify-between gap-2 font-light">
                      Total Monthly Expenses:
                      <span className="text-xl">
                        £{expensesTotal.toFixed(2)}
                      </span>
                    </p>
                  </p>

                  <p className="flex justify-between gap-2 font-light">
                    Monthly Remaining:
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

          <div className="user-savings flex flex-col items-center gap-2 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
            <h2
              className="flex justify-between px-12 text-4xl
         bg-yellow-400  text-center hover:cursor-pointer hover:bg-yellow-600 text-black p-1 rounded-md w-full
        "
              onClick={() => setSavingsVisible(!savingsVisible)}
            >
              Savings
              <span className="pl-6">{savingsVisible ? "⬇" : "⬆"}</span>
            </h2>

            <div className="flex justify-evenly gap-6">
              <p className="flex gap-2 items-center font-light">
                Unallocated Funds:
                <span className="text-green-500 text-lg">
                  £{(monthlytakeHome - expensesTotal - savingsTotal).toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center font-light">
                As Percent
                <span className="text-green-500 text-lg">
                  {(
                    ((monthlytakeHome - expensesTotal - savingsTotal) /
                      (monthlytakeHome - expensesTotal)) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 max-h-32 overflow-scroll border border-solid border-green-800 px-1 py-2 rounded-lg w-full">
              <div className="flex gap-2 justify-between mx-2">
                <p>What is it?</p>
                <p>How much?</p>
                <p>Type?</p>
                <p>Stored Where??</p>
                <p>Get rid</p>
              </div>
              {savings.map((item, index) => (
                <div className="flex gap-2 justify-between" key={index}>
                  <input
                    name="savingName"
                    type="text"
                    placeholder="Name of Saving"
                    className="p-2 rounded text-black"
                    value={item.savingName}
                    onChange={(event) => handleSavingsChange(event, index)}
                  />
                  <input
                    name="savingValue"
                    type="number"
                    placeholder="Enter Monthly Amount"
                    className={`p-2 rounded text-black w-20 ${
                      isNaN(item.savingValue) ? `bg-red-500 text-white` : ``
                    }`}
                    value={item.savingValue}
                    onChange={(event) => handleSavingsChange(event, index)}
                  />
                  <select
                    name="savingType"
                    className="rounded text-black w-20"
                    onChange={(event) => handleSavingsChange(event, index)}
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
                    className="rounded p-2 text-black w-32"
                    value={item.savingLocation}
                    onChange={(event) => handleSavingsChange(event, index)}
                  />

                  <button
                    className={`${
                      savings.length == 1
                        ? `bg-slate-400 text-black opacity-30`
                        : `bg-red-700 text-white shadow-md border border-solid border-red-900`
                    }  p-1`}
                    disabled={savings.length == 1}
                    onClick={() => handleDeleteSaving(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              className="bg-orange-300 rounded p-2 w-48"
              onClick={addSaving}
            >
              Add New Saving
            </button>

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

                  <p className="flex justify-between gap-2 font-light italic">
                    As Percent:
                    <span className="text-xl">
                      {(
                        (savingsTotal / (monthlytakeHome - expensesTotal)) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>

                  {savingsTypes.map((type, index) => {
                    const matchedValue = savings
                      .filter((each) => each.savingType == type)
                      .reduce(
                        (acc, curr) => acc + parseInt(curr.savingValue),
                        0
                      );
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
          </div>
        </>
      )}
    </div>
  );
}
