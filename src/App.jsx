import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- States --- --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- User States
  // --- Income
  const [userIncome, setUserIncome] = useState(0);

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Maths --- --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- --- --- ---
  // --- --- Taxable Income --- ---
  // TODO: personal allowance is a dynamic figure I think. Check GOV:
  const personalAllowance = 12570;
  const [usersTaxableIncome, setUsersTaxableIncome] = useState(0);
  useEffect(() => {
    if (userIncome < personalAllowance) {
      setUsersTaxableIncome(0);
    } else {
      setUsersTaxableIncome(userIncome - personalAllowance);
    }
  }, [userIncome]);
  // --- --- --- --- --- --- --- ---
  // --- --- National Insurance --- ---
  const [nationalInsurancePayments, setNationalInsurancePayments] = useState(0);
  // TODO: NI payments vary depending on income:
  useEffect(() => {
    if (userIncome > 12570 && userIncome < 50270) {
      setNationalInsurancePayments(usersTaxableIncome * 0.08);
    } else {
      setNationalInsurancePayments(0);
    }
  }, [userIncome, usersTaxableIncome]);
  // --- --- --- --- --- --- --- ---
  // --- --- Tax Paid --- ---
  const [taxPaid, setTaxPaid] = useState(0);
  // TODO: Tax payments is also variable depending on income level:
  useEffect(() => {
    setTaxPaid(usersTaxableIncome * 0.2);
  }, [usersTaxableIncome]);
  // --- --- --- --- --- --- --- ---
  // --- --- Annual Take Home --- ---
  const [annualTakeHome, setAnnualTakeHome] = useState(0);
  useEffect(() => {
    if (usersTaxableIncome == 0) {
      setAnnualTakeHome(Math.round(userIncome * 100) / 100);
    } else {
      let numberToUse = userIncome - nationalInsurancePayments - taxPaid;
      setAnnualTakeHome(Math.round(numberToUse * 100) / 100);
    }
  }, [userIncome, usersTaxableIncome, nationalInsurancePayments, taxPaid]);
  // --- --- --- --- --- --- --- ---
  // --- --- Monthly Take Home --- ---
  const [monthlytakeHome, setMonthlyTakeHome] = useState(0);
  useEffect(() => {
    setMonthlyTakeHome(annualTakeHome / 12);
  }, [annualTakeHome]);

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Functions --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- --- --- ---
  // --- --- Add Expense --- ---
  // https://dev.to/okafor__mary/how-to-dynamically-add-input-fields-on-button-click-in-reactjs-5298
  const defaultExpense = { expenseName: "ChangeMe", expenseValue: 0 };
  const [expenses, setExpenses] = useState([defaultExpense]);

  function addExpense() {
    console.log("addexpense");
    setExpenses([...expenses, defaultExpense]);
  }

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  const handleExpenseChange = (event, index) => {
    const expenseChange = expenses.map((expense, i) => {
      console.log(expense[event.target.name], i);
      if (i === index) {
        console.log("match");

        return { ...expense, [event.target.name]: event.target.value };
      } else {
        return expense;
      }
    });
    console.log(expenseChange);
    console.log();

    setExpenses(expenseChange);
  };

  const handleDeleteExpense = (index) => {
    const newArray = [...expenses];
    newArray.splice(index, 1);
    setExpenses(newArray);
  };

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Main Return --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  return (
    <div className="whole-page flex gap-2 flex-col p-4 items-center justify-center h-dvh bg-slate-300">
      <h1 className="text-amber-800 text-6xl">
        Ello. Wonna see ow much munny u got 2 play wif?
      </h1>

      <div className="user-income border border-black border-solid">
        <h2 className="text-4xl">Income</h2>
        <form action="">
          <label htmlFor="userIncome">Your Annual Income: </label>
          <input
            name="userIncome"
            type="number"
            min={0}
            placeholder="Enter your yearly income"
            value={userIncome}
            onChange={(event) => {
              setUserIncome(event.target.value);
            }}
          />
        </form>
        <p>Your Taxable Income: £{usersTaxableIncome}</p>
        <p>Your annual take home pay: £{annualTakeHome.toFixed(2)}</p>
        <p>Your monthly take home pay: £{monthlytakeHome.toFixed(2)}</p>
      </div>

      <div className="user-tax">
        <h2 className="text-4xl">Tax</h2>
        <p>Your NI Payments: £{nationalInsurancePayments.toFixed(2)}</p>
        <p>Your yearly tax paid: £{taxPaid.toFixed(2)}</p>
      </div>

      <div className="user-expenses">
        <h2 className="text-4xl">Expenses</h2>
        <div className="flex flex-col gap-2">
          {expenses.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <p>{index}</p>
              <input
                name="expenseName"
                type="text"
                value={item.expenseName}
                onChange={(event) => handleExpenseChange(event, index)}
              />
              <input
                name="expenseValue"
                type="text"
                value={item.expenseValue}
                onChange={(event) => handleExpenseChange(event, index)}
              />
              {expenses.length > 1 && (
                <button onClick={() => handleDeleteExpense(index)}>
                  Delete
                </button>
              )}
              {index === expenses.length - 1 && (
                <button onClick={() => addExpense()}>Add</button>
              )}
            </div>
          ))}
        </div>

        {/* <button onClick={addExpense}>Add New Expense</button> */}
      </div>

      <div className="user-savings">
        <h2 className="text-4xl">Savings</h2>
      </div>

      <div className="user-investments">
        <h2 className="text-4xl">Investments</h2>
      </div>
    </div>
  );
}
