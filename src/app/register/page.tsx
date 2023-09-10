"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./RegisterPage.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [inputError, setInputError] = useState({
    firstNameMissing: false,
    lastNameMissing: false,
    emailMissing: false,
    usernameMissing: false,
    passwordOneMissing: false,
    passwordTwoMissing: false,
    passwordMinimum: false,
    passwordMismatch: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      firstName,
      middleName,
      lastName,
      username,
      email,
      password1,
      password2,
    } = credentials;

    let inputErrorCopy = { ...inputError };

    if (!firstName) {
      inputErrorCopy = { ...inputErrorCopy, firstNameMissing: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, firstNameMissing: false };
    }

    if (!lastName) {
      inputErrorCopy = { ...inputErrorCopy, lastNameMissing: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, lastNameMissing: false };
    }

    if (!email) {
      inputErrorCopy = { ...inputErrorCopy, emailMissing: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, emailMissing: false };
    }

    if (!username) {
      inputErrorCopy = { ...inputErrorCopy, usernameMissing: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, usernameMissing: false };
    }

    if (!password1) {
      inputErrorCopy = { ...inputErrorCopy, passwordOneMissing: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, passwordOneMissing: false };
    }

    if (password1 && password1.length < 6) {
      inputErrorCopy = { ...inputErrorCopy, passwordMinimum: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, passwordMinimum: false };
    }

    if (password1 !== password2) {
      inputErrorCopy = { ...inputErrorCopy, passwordMismatch: true };
    } else {
      inputErrorCopy = { ...inputErrorCopy, passwordMismatch: false };
    }

    setInputError(inputErrorCopy);

    const noInputError = !Object.values(inputErrorCopy).some(
      (value) => value === true
    );

    console.log(noInputError);

    if (noInputError) {
      try {
        axios
          .post("http://localhost:8000/api/auth/register", {
            firstName,
            middleName,
            lastName,
            email,
            username,
            password: password1,
          })
          .then(async (res) => {
            console.log(res.data);
            try {
              const signInResponse = await signIn("credentials", {
                email: email,
                password: password1,
                redirect: false,
              });

              if (signInResponse?.error === null) {
                setTimeout(() => {
                  router.push("/");
                }, 1000);
              } else {
                console.log("error occurred while logging in");
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => {
            console.log(err);
          });
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
          <h2 className={classes.mainHeader}>Create account</h2>
          <div className={classes.inputWrapper}>
            <label htmlFor="firstName" className={classes.label}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={credentials.firstName}
              onChange={handleChange}
              className={classes.input}
            />
            {inputError.firstNameMissing && (
              <span className={classes.inputError}>* Required field</span>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="middleName" className={classes.label}>
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={credentials.middleName}
              onChange={handleChange}
              className={classes.input}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="lastName" className={classes.label}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={credentials.lastName}
              onChange={handleChange}
              className={classes.input}
            />
            {inputError.lastNameMissing && (
              <span className={classes.inputError}>* Required field</span>
            )}
          </div>
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
              <span className={classes.inputError}>* Required field</span>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="username" className={classes.label}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className={classes.input}
            />
            {inputError.usernameMissing && (
              <span className={classes.inputError}>* Required field</span>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="password1" className={classes.label}>
              Password
            </label>
            <input
              type="password"
              name="password1"
              value={credentials.password1}
              onChange={handleChange}
              className={classes.input}
            />
            {inputError.passwordOneMissing && (
              <>
                <span className={classes.inputError}>* Required field</span>
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
          <div className={classes.inputWrapper}>
            <label htmlFor="password2" className={classes.label}>
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              value={credentials.password2}
              onChange={handleChange}
              className={classes.input}
            />
            {inputError.passwordTwoMissing && (
              <>
                <span className={classes.inputError}>* Required field</span>
              </>
            )}
            {inputError.passwordMismatch && (
              <>
                <span className={classes.inputError}>
                  * Passwords do not match
                </span>
              </>
            )}
          </div>
          <button className={classes.registerBtn}>
            Create Crimebase contributor account
          </button>
        </form>
        <h5 className={classes.accountExists}>
          Already have an account?
          <Link href="/login">
            <span>Sign In</span>
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default RegisterPage;
