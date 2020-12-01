import React from "react";

import Input from "./../Input";

export default ({ label, children, onChange }) => (
  <Input label={label} Component="select" onChange={onChange}>
    {children}
  </Input>
);
