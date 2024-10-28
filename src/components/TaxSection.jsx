import MainHeading from "./MainHeading";
import Stat from "./Stat";
import StatsWrapper from "./StatsWrapper";
export default function TaxSection({
  setTaxVisible,
  taxVisible,
  usersTaxableIncome,
  nationalInsurancePayments,
  taxPaid,
}) {
  return (
    <div className="user-tax flex flex-col justify-center items-center gap-4 bg-green-800 text-white p-2 rounded-md w-full border-t-8 border-t-green-600 shadow shadow-slate-800">
      <MainHeading
        mainColour={"bg-blue-300"}
        hoverColour={"hover:bg-blue-600"}
        onClickFunction={() => {
          setTaxVisible(!taxVisible);
        }}
        text={"Tax"}
        visibility={taxVisible}
      />

      {taxVisible ? (
        <StatsWrapper>
          <p className="text-center font-extralight mb-2">
            All figures are yearly
          </p>
          <Stat
            text="Taxable Income:"
            figure={usersTaxableIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          ></Stat>
          <Stat
            text="NI Payments:"
            figure={nationalInsurancePayments.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          ></Stat>
          <Stat
            text="Tax Paid:"
            figure={taxPaid.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          ></Stat>
        </StatsWrapper>
      ) : (
        ""
      )}
    </div>
  );
}
