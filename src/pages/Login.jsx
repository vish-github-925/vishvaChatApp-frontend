import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, reset, login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const LoadingDiv = styled.h1`
  font-size: 50px;
  margin-top: 300px;
`;

const LoginPage = styled.div`
  margin-top: 100px;
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  h1,
  p {
    color: purple;
  }
  form {
    min-height: 100px;
    padding: 20px 10px;
    width: 400px;
    border: 2px solid black;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    .form-group {
      height: 35px;
      width: 90%;
      input {
        border: none;
        outline: none;
        height: 100%;
        width: 100%;
        border: 1px solid purple;
        border-radius: 5px;
        padding: 5px 10px;
      }
    }
    .submit {
      height: 70px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      button {
        margin-top: 10px;
        height: 45px;
        width: 75px;
        background-color: purple;
        color: white;
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 5px;
      }
      span {
        font-size: 15px;
      }
      a {
        font-size: 20px;
        transition: all 2s ease-in;
        &:hover {
          border-bottom: 2px solid purple;
        }
      }
    }
  }
`;
const Login = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } =
    useSelector(authSelector);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    setFormData((prev) => ({
      ...prev,
      email: "",
      password: "",
    }));
  };

  if (isLoading) {
    return <LoadingDiv>Loading...</LoadingDiv>;
  }
  return (
    <LoginPage>
      <h1>
        Login <FaSignInAlt />
      </h1>
      <p>Please login to proceed further</p>
      <form className="reg-form form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group submit">
          <button type="submit">Submit</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </span>
        </div>
      </form>
    </LoginPage>
  );
};
export default Login;
