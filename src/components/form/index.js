import React from "react";

import { Input, FormGroup, Label, FormFeedback } from "reactstrap";
const arrayze = a => (Array.isArray(a) ? a : [a]);

export const FieldInput = ({
  input,
  meta,
  label,
  type,
  labelProps,
  children,
  ...passProps
}) => (
  <FormGroup>
    {label && <Label>{label}</Label>}
    <Input
      type={type}
      {...input}
      {...passProps}
      invalid={!!(meta.touched && meta.error)}
    >
      {children}
    </Input>
    {meta.touched &&
      meta.error &&
      arrayze(meta.error).map((error, i) => (
        <FormFeedback key={i}>{error}</FormFeedback>
      ))}
  </FormGroup>
);

FieldInput.defaultProps = {
  type: "text"
};
