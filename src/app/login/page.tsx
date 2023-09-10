"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./LoginPage.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;

    let inputErrorCopy = { ...inputError };

    if (!email) {
      inputErrorCopy = { ...inputErrorCopy, emailMissing: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, emailMissing: false };
    }

    if (!password) {
      inputErrorCopy = { ...inputErrorCopy, passwordMissing: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, passwordMissing: false };
    }

    if (password && password.length < 6) {
      inputErrorCopy = { ...inputErrorCopy, passwordMinimum: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, passwordMinimum: false };
    }

    setInputError(inputErrorCopy);

    const noInputError = !Object.values(inputErrorCopy).some(
      (value) => value === true
    );

    if (noInputError) {
      try {
        const res = await signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          redirect: false,
        });

        if (res?.error === null) {
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          console.log("error occurred while logging in");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
              value={credentials.email}
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
              value={credentials.password}
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
        <h5 className={classes.newToCrimebase}>New to Crimebase?</h5>
        <button
          className={classes.registerBtn}
          onClick={() => router.push("/register")}
        >
          Create your contributor account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
