import MainHeading from "./MainHeading";
export default function TaxSection({
  setTaxVisible,
  taxVisible,
  usersTaxableIncome,
  nationalInsurancePayments,
  taxPaid,
}) {
  return (
    <div className="user-tax flex flex-col items-center gap-2 bg-green-900 text-white border border-black border-solid p-2 rounded-md w-full">
      <MainHeading
        mainColour={"bg-blue-400"}
        hoverColour={"hover:bg-blue-600"}
        onClickFunction={() => {
          setTaxVisible(!taxVisible);
        }}
        text={"Tax"}
        visibility={taxVisible}
      />

      <div
        className={`${
          taxVisible ? `block` : `hidden`
        } flex flex-col gap-2 my-4 w-8/12 max-w-96`}
      >
        <p className="text-center font-extralight mb-2">
          All figures are yearly
        </p>
        <p className="flex justify-between gap-2 mx-4">
          <span className="italic font-extralight">Taxable Income:</span>
          <span className="text-lg">
            £
            {usersTaxableIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>

        <p className="flex justify-between gap-2 mx-4">
          <span className="italic font-extralight">NI Payments:</span>
          <span className="text-lg">
            £
            {nationalInsurancePayments.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
        <p className="flex justify-between gap-2 mx-4">
          <span className="italic font-extralight">Tax Paid:</span>
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
  );
}
