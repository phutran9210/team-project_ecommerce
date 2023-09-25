import { Link } from "react-router-dom";
import { adminFormStyle } from "../../constants/style";
import { useState, ChangeEvent, FormEvent } from "react";
import { adminLogin } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { PayloadLogin } from "../../constants/interface/authInterface";
import { ROUTER_PATH } from "../../constants";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  // Hàm xử lý thay đổi giá trị input
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setStateFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setStateFunc(e.target.value);
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payloadLogin: PayloadLogin = {
      user_name: username,
      user_password: password,
    };
    try {
      const response = await adminLogin(payloadLogin);

      if (response.data.status === 200) {
        navigate(ROUTER_PATH.VERIFY);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="admin-form flex flex-col justify-center items-center h-[100vh]">
      <div>
        <Link to={ROUTER_PATH.HOME}>
          <img
            className="admin-logo w-[2.5rem] cursor-pointer"
            src="/logos/logo-icon-black.png"
            alt="logo-icon"
          />
        </Link>
      </div>
      <div className="admin-welcome text-[3rem] font-chakra">WELCOME ADMIN</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={adminFormStyle.inputDiv}>
            <input
              className={adminFormStyle.input}
              type="text"
              placeholder="Email"
              onChange={(e) => handleChange(e, setUsername)}
            />
          </div>
          <div className={adminFormStyle.inputDiv}>
            <input
              className={adminFormStyle.input}
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e, setPassword)}
            />
          </div>
          <button className={adminFormStyle.button}>SIGN IN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
