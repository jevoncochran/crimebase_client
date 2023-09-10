"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import classes from "./LoginPage.module.scss";
import Link from "next/link";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [inputError, setInputError] = useState({
    emailMissing: false,
    passwordMissing: false,
    passwordMinimum: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;

    let inputErorCopy = { ...inputError };

    if (email === "") {
      inputErorCopy = { ...inputErorCopy, emailMissing: true };
    } else {
      inputErorCopy = { ...inputErorCopy, emailMissing: false };
    }

    if (password === "") {
      inputErorCopy = { ...inputErorCopy, passwordMissing: true };
    } else {
      inputErorCopy = { ...inputErorCopy, passwordMissing: false };
    }

    if (password !== "" && password.length < 6) {
      inputErorCopy = { ...inputErorCopy, passwordMinimum: true };
    } else {
      inputErorCopy = { ...inputErorCopy, passwordMinimum: false };
    }

    setInputError(inputErorCopy);
  };

  return (
    <div className={classes.main}>
      <Link href="/">
        <div className={classes.logo}>Crimebase</div>
      </Link>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={classes.mainHeader}>Login</h2>
          <div className={classes.inputWrapper}>
            <label htmlFor="email" className={classes.label}>
              Email
            </label>
            <input
              type="text"
              name="email"
              value={undefined}
              onChange={handleChange}
              className={classes.input}
            />
            {inputError.emailMissing && (
              <span className={classes.inputError}>
                * Please enter your email
              </span>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="password" className={classes.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={undefined}
              onChange={handleChange}
              className={classes.input}
            />
            {inputError.passwordMissing && (
              <>
                <span className={classes.inputError}>
                  * Please enter your password
                </span>
              </>
            )}
            {inputError.passwordMinimum && (
              <>
                <span className={classes.inputError}>
                  * Password must be 6 characters or more
                </span>
              </>
            )}
          </div>
          <button className={classes.signInBtn}>Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
