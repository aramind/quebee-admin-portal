import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import AvailabilityControlSection from "./AvailabilityControlSection";
import DisplayOnlySection from "./DisplayOnlySection";

const ACSandDOS = ({ control, values }) => {
  return (
    <>
      <ElevatedSectionWrapper>
        <AvailabilityControlSection control={control} />
      </ElevatedSectionWrapper>
      <ElevatedSectionWrapper>
        <DisplayOnlySection values={values} />
      </ElevatedSectionWrapper>
    </>
  );
};

export default ACSandDOS;
