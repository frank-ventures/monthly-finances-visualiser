import { useEffect, useState } from "react";
import "./App.css";
import IncomeSection from "./components/IncomeSection";
import TaxSection from "./components/TaxSection";
import ExpensesSection from "./components/ExpensesSection";
import SavingsSection from "./components/SavingsSection";

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
      setUsersTaxableIncome(parseFloat(userIncome - personalAllowance));
    }
  }, [userIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- National Insurance --- ---
  const [nationalInsurancePayments, setNationalInsurancePayments] = useState(0);
  // TODO: NI payments vary depending on income:
  useEffect(() => {
    if (userIncome > 12570 && userIncome < 50270) {
      setNationalInsurancePayments(parseFloat(usersTaxableIncome * 0.08));
    } else {
      setNationalInsurancePayments(0);
    }
  }, [userIncome, usersTaxableIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- Tax Paid --- ---
  const [taxPaid, setTaxPaid] = useState(0);
  // TODO: Tax payments is also variable depending on income level:
  useEffect(() => {
    setTaxPaid(parseFloat(usersTaxableIncome * 0.2));
  }, [usersTaxableIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- Annual Take Home --- ---
  const [annualTakeHome, setAnnualTakeHome] = useState(0);
  useEffect(() => {
    if (usersTaxableIncome == 0) {
      setAnnualTakeHome(parseFloat(Math.round(userIncome * 100) / 100));
    } else {
      let numberToUse = parseFloat(
        userIncome - nationalInsurancePayments - taxPaid
      );
      setAnnualTakeHome(parseFloat(Math.round(numberToUse * 100) / 100));
    }
  }, [userIncome, usersTaxableIncome, nationalInsurancePayments, taxPaid]);

  // --- --- --- --- --- --- --- ---
  // --- --- Monthly Take Home --- ---
  const [monthlytakeHome, setMonthlyTakeHome] = useState(0);
  useEffect(() => {
    setMonthlyTakeHome(parseFloat(annualTakeHome / 12));
  }, [annualTakeHome]);

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Functions --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- --- --- ---
  // --- --- Add Expenses / Savings --- ---
  // https://dev.to/okafor__mary/how-to-dynamically-add-input-fields-on-button-click-in-reactjs-5298
  // --- Expenses States
  const defaultExpense = { expenseName: "", expenseValue: 0 };
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [defaultExpense];
  });
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [expensesVisible, setExpensesVisible] = useState(false);
  // --- Savings States
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

  function addNewField(type) {
    // 'type' means is it an expense or saving?
    type == "expense"
      ? setExpenses([...expenses, defaultExpense])
      : setSavings([...savings, defaultSavings]);
  }

  // This detects when there is a change to the 'expenses' array and ensures that the 'total value' calculation is up to date:
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      total = total + parseFloat(expenses[i].expenseValue);
    }
    setExpensesTotal(total);
  }, [expenses]);

  // This detects when there is a change to the 'savings' array and ensures that the 'total value' calculation is up to date:
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < savings.length; i++) {
      total = total + parseFloat(savings[i].savingValue);
    }
    setSavingsTotal(total);
  }, [savings]);

  const handleTypeChange = (event, index, type) => {
    if (type == "expense") {
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
    } else {
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
    }
  };

  const handleDeleteType = (index, type) => {
    if (type == "expense") {
      const newArray = [...expenses];
      newArray.splice(index, 1);
      setExpenses(newArray);
    } else {
      const newArray = [...savings];
      newArray.splice(index, 1);
      setSavings(newArray);
    }
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

      <IncomeSection
        setIncomeVisible={setIncomeVisible}
        incomeVisible={incomeVisible}
        userIncome={userIncome}
        setUserIncome={setUserIncome}
        annualTakeHome={annualTakeHome}
        monthlytakeHome={monthlytakeHome}
      />

      {userIncome == 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center min-h-20 mt-16 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
          <p className="text-2xl font-light text-orange-300">
            Enter your income above
          </p>
        </div>
      ) : (
        <>
          <TaxSection
            setTaxVisible={setTaxVisible}
            taxVisible={taxVisible}
            usersTaxableIncome={usersTaxableIncome}
            nationalInsurancePayments={nationalInsurancePayments}
            taxPaid={taxPaid}
          />

          <ExpensesSection
            setExpensesVisible={setExpensesVisible}
            expensesVisible={expensesVisible}
            expenses={expenses}
            handleTypeChange={handleTypeChange}
            handleDeleteType={handleDeleteType}
            addNewField={addNewField}
            expensesTotal={expensesTotal}
            monthlytakeHome={monthlytakeHome}
          />

          <SavingsSection
            setSavingsVisible={setSavingsVisible}
            savingsVisible={savingsVisible}
            savings={savings}
            savingsTotal={savingsTotal}
            savingsTypes={savingsTypes}
            handleTypeChange={handleTypeChange}
            handleDeleteType={handleDeleteType}
            addNewField={addNewField}
            expensesTotal={expensesTotal}
            monthlytakeHome={monthlytakeHome}
          />
        </>
      )}
    </div>
  );
}
