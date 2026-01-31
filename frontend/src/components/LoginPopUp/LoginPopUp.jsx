import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "./LoginPopUp.css";
import { StoreContext } from "../../context/StoreContext";

function LoginPopUp({ setShowLogin }) {
  const [currState, setCurrState] = useState("Login");
  const { login } = useContext(StoreContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    unregister,
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    /* ================= SIGN UP ================= */
    if (currState === "Sign Up") {
      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              password: data.password,
            }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          alert(result.message || "Signup failed");
          return;
        }

        alert("Account created successfully! Please login.");
        setCurrState("Login");
        reset();
      } catch (error) {
        alert("Backend not reachable");
      }
    }

    /* ================= LOGIN ================= */
    else {
      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          alert(result.message || "Invalid email or password");
          return;
        }

        login(result.user);
        alert(`Welcome back, ${result.user.name}!`);
        reset();
        setShowLogin(false);
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <i className="bi bi-x-lg" onClick={() => setShowLogin(false)}></i>
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="Enter your username"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="error">*Username is required</p>
              )}
            </>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "*Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "*Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "*Password is required",
              minLength: {
                value: 8,
                message: "*Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "*Password must contain letters, numbers & special characters",
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          {currState === "Sign Up" && (
            <>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "*Confirm password is required",
                  validate: (value) =>
                    value === passwordValue ||
                    "*Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </>
          )}
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" {...register("terms", { required: true })} />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {errors.terms && (
          <p className="error">*Please accept the terms</p>
        )}

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
                unregister("confirmPassword");
              }}
            >
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp;
