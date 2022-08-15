import React from "react";
import { ErrorMessage, useField } from "formik";
import "./TextField.css";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="container">
      <label className="title" htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`input-textfield ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
