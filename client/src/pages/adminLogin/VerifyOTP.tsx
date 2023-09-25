import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginStep2 } from "../../service/auth";
import { PayloadCodeLogin } from "../../constants/interface/authInterface";
import { ROUTER_PATH } from "../../constants";

const VerifyOTP = () => {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(60);

  const navigate = useNavigate();

  //Countdown timer:
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (seconds === 0 && minutes === 0) {
        clearInterval(countdown);
        navigate(ROUTER_PATH.ADMIN);
      }

      // Save timer state to localStorage
      localStorage.setItem("timer", JSON.stringify({ minutes, seconds }));
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds]);

  // Restore timer state from localStorage
  useEffect(() => {
    const timerState = JSON.parse(localStorage.getItem("timer") || "{}");

    if (
      timerState.minutes === 0 ||
      timerState.seconds === 0 ||
      (timerState.minutes !== "" && timerState.seconds !== "")
    ) {
      setMinutes(timerState.minutes);
      setSeconds(timerState.seconds);
    }
  }, []);

  // Function to handle input change
  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Update input value and focus on the next input
    if (value) {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);

      if (index < 3) {
        const nextInput = document.getElementById(
          `input${index + 1}`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // Function to handle keypress events (for backspace)
  const handleKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && !inputValues[index]) {
      const prevInput = document.getElementById(
        `input${index - 1}`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Function to clear all input values
  const clearAllValues = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValues(["", "", "", ""]);
    // Optionally, focus on the first input field after clearing
    const firstInput = document.getElementById("input0") as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = inputValues.join("");
    const payloadStep2: PayloadCodeLogin = {
      code: otpValue,
    };

    try {
      const response = await adminLoginStep2(payloadStep2);
      if (response.data.status === 200) {
        navigate("/admin/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <form className="form-verify" onSubmit={handleSubmit}>
        <div className="title">OTP Verification</div>

        <p className="message">
          Enter the verification code we just sent to your email.
        </p>

        <div className="inputs">
          {inputValues.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleKeyPress(index, e)}
              id={`input${index}`}
            />
          ))}
        </div>

        <div>
          <button className="action">VERIFY</button>
          <button className="action-clear" onClick={clearAllValues}>
            CLEAR
          </button>
        </div>
      </form>

      {/* Countdown */}
      <div className="expire-time mt-[1rem]">
        Verification code will be expired in &nbsp;
        <span className="countdown font-mono text-medium text-rose-500">
          {minutes}m {seconds}s
        </span>
      </div>
    </div>
  );
};

export default VerifyOTP;
