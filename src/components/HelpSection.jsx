import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import PosNegButton from "./PosNegButton";

export default function HelpSection() {
  const [helpVisible, setHelpVisible] = useState(false);

  return (
    <>
      {helpVisible ? (
        <>
          {/* This first div is the grey overlay */}
          <div className="fixed top-0 z-20 bg-slate-500 bg-opacity-85 h-screen w-dvw"></div>

          {/* This is our actual Help modal */}
          <div className="fixed bottom-5 right-2 z-50 w-6/12 shadow-md border-black border-x-2 rounded-md shadow-black">
            <SectionWrapper>
              <p>Plan your monthly finances by entering:</p>
              <ul>
                <li>• Your monthly income</li>
                <li>• Your monthly income</li>
                <li>• How much you&apos;d like to save</li>
              </ul>
              <p>
                The app figures out your UK Income tax based on 2024-25 tax
                brackets, personal allowances and NI payments.
              </p>
              <p>
                Your figures, expenses and savings are only stored on your
                device.
              </p>

              <PosNegButton
                text="Close"
                onClickFunction={() => setHelpVisible(!helpVisible)}
                positive={true}
              />
            </SectionWrapper>
          </div>
        </>
      ) : (
        <div className="fixed bottom-2 right-2 z-50">
          <PosNegButton
            text="?"
            onClickFunction={() => setHelpVisible(!helpVisible)}
            positive={true}
          />
        </div>
      )}
    </>
  );
}
