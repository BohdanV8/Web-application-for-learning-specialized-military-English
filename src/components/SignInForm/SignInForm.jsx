import React from "react";
import styles from "./SignInForm.module.css";
import { useState } from "react";
import axios from "axios";
const SignInForm = ({ setIsAccountExist }) => {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Відправка POST-запиту на сервер
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Обробка успішної відповіді від сервера, наприклад, перехід на іншу сторінку або встановлення додаткових флагів
      console.log(response.data); // Виводимо дані з відповіді у консоль (це може бути зайвим на продакшені)
      localStorage.setItem("userId", response.data.userId);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      // Обробка помилок, наприклад, виведення повідомлення про помилку користувачеві
      console.error("Error during signup:", error.message);
    }
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  return (
    <form className={styles.myForm} onSubmit={handleSubmit}>
      <input
        className={styles.myInput}
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
      <input
        className={styles.myInput}
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <div className="text-center">
        <button className={styles.myButton}>Sign in</button>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => {
            setIsAccountExist(false);
          }}
        >
          Don't have an account? Create it!
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
