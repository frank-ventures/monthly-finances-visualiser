import { useEffect, useState } from "react";
import "./App.css";
import IncomeSection from "./components/IncomeSection";
import TaxSection from "./components/TaxSection";
import ExpensesSection from "./components/ExpensesSection";
import SavingsSection from "./components/SavingsSection";
import HelpSection from "./components/HelpSection";
import PosNegButton from "./components/PosNegButton";

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
  const personalAllowance = 12570;
  const [usersTaxableIncome, setUsersTaxableIncome] = useState(0);
  useEffect(() => {
    if (userIncome < personalAllowance) {
      setUsersTaxableIncome(0);
    } else if (userIncome > 12571 && userIncome < 125140) {
      setUsersTaxableIncome(parseFloat(userIncome - personalAllowance));
    } else if (userIncome > 125140) {
      // You do not get a Personal Allowance on taxable income over £125,140
      setUsersTaxableIncome(parseFloat(userIncome));
    }
  }, [userIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- National Insurance --- ---
  const [nationalInsurancePayments, setNationalInsurancePayments] = useState(0);
  // TODO: Refactor this:
  useEffect(() => {
    if (userIncome < 12570) {
      setNationalInsurancePayments(0);
    } else if (userIncome > 12570 && userIncome < 50271) {
      setNationalInsurancePayments(parseFloat(usersTaxableIncome * 0.08));
    } else if (userIncome > 50271) {
      const higherRate = userIncome - 50270;
      const basicRate = userIncome - higherRate - personalAllowance;

      // 20% on the first bit
      const higherRateNI = higherRate * 0.02;
      const basicRateNI = basicRate * 0.08;
      //set national insurance here
      setNationalInsurancePayments(parseFloat(basicRateNI + higherRateNI));
    }
  }, [userIncome, usersTaxableIncome]);

  // --- --- --- --- --- --- --- ---
  // --- --- Tax Paid --- ---
  const [taxPaid, setTaxPaid] = useState(0);
  // TODO: Refactor this:
  useEffect(() => {
    if (userIncome > 12571 && userIncome < 50271) {
      setTaxPaid(parseFloat(usersTaxableIncome * 0.2));
    } else if (userIncome > 50270 && userIncome < 125141) {
      const higherRate = userIncome - 50270;
      const basicRate = userIncome - higherRate - personalAllowance;

      // 20% on the first bit
      const higherRateTaxed = higherRate * 0.4;
      const basicRateTaxed = basicRate * 0.2;
      setTaxPaid(basicRateTaxed + higherRateTaxed);
      // 40% on the next bit
    } else if (userIncome > 125140) {
      //no personal allowance
      //basic rate up to 50270
      //higher 50270 to 125140
      //additional 45% over 125140
      const additionalRate = userIncome - 125140;

      const additionalRateTaxed = additionalRate * 0.45;
      const higherRateTaxed = 87439 * 0.4;
      const basicRateTaxed = 37700 * 0.2;

      setTaxPaid(additionalRateTaxed + higherRateTaxed + basicRateTaxed);
    }
  }, [usersTaxableIncome, userIncome]);

  // Basic Rate: £12,571 to £50,270	20%
  // Higher Rate: £50,271 to £125,140	40%
  // Additional Rate: over £125,140	45%
  // You do not get a Personal Allowance on taxable income over £125,140

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
    const handleChange = (list, setList, valueKey) => {
      const updatedList = list.map((item, i) => {
        if (i === index) {
          if (event.target.name == valueKey && event.target.value == "") {
            return {
              ...item,
              [event.target.name]: 0,
            };
          }
          return {
            ...item,
            [event.target.name]: event.target.value.replace(/^0+/, ""),
          };
        } else {
          return item;
        }
      });

      setList(updatedList);
    };

    if (type === "expense") {
      handleChange(expenses, setExpenses, "expenseValue");
    }
    if (type === "saving") {
      {
        handleChange(savings, setSavings, "savingValue");
      }
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
  // --- --- --- --- --- Reset --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  const [resetVisible, setResetVisible] = useState(false);
  function resetAllStats() {
    setUserIncome(0);
    setExpenses([defaultExpense]);
    setSavings([defaultSavings]);
    setExpensesVisible(false);
    setSavingsVisible(false);
    setResetVisible(false);
  }

  // --- --- --- --- --- --- --- --- --- --- --- ---
  // --- --- --- --- --- Main Return --- --- --- ---
  // --- --- --- --- --- --- --- --- --- --- --- ---
  return (
    <div className="whole-page flex gap-4 flex-col p-2 items-center bg-slate-600 w-dvw min-h-dvh">
      <h1 className=" text-slate-100 text-6xl">Play Money</h1>
      <HelpSection />
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

          {!resetVisible ? (
            <PosNegButton
              text="Reset All?"
              onClickFunction={() => setResetVisible(!resetVisible)}
              positive={false}
            />
          ) : (
            ""
          )}
          {resetVisible ? (
            <div className="flex gap-10">
              <PosNegButton
                text="Actually Reset!"
                onClickFunction={resetAllStats}
                positive={false}
              />

              <PosNegButton
                text="No!"
                onClickFunction={() => setResetVisible(!resetVisible)}
                positive={true}
              />
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
