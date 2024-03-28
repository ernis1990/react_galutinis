import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import styled from 'styled-components';
// import bcrypt from 'bcryptjs';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  background-image: url('https://images.unsplash.com/photo-1495422964407-28c01bf82b0d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: calc(100vh - 80px - 200px);

  > h1 {
    font-size: 50px;
    color: #ffffff;
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px; 
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);

    > .userName, .password {
      display: flex;
      flex-direction: column;

      > label {
        color: #333; 
      }

      > input {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px; 
        margin-bottom: 5px; 
      }

      > p {
        color: #e74c3c; 
        text-align: center;
      }
    }

    > input[type="submit"] {
      background-color: #3498db; 
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px; 
      cursor: pointer;
      transition: background-color 0.3s ease; 

      &:hover {
        background-color: #2980b9;
      }
    }
  }
`;

const Login = () => {

  const navigate = useNavigate();
  const [wrongLogin, setWrongLogin] = useState(false);
  const { users, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues:{
      userName: "",
      password: ""
    },
    onSubmit: (values) => {
      setWrongLogin(true)

     const loggedInUser =  users.find(user => user.userName === values.userName && user.password === values.password)


      if(loggedInUser === undefined){
        setWrongLogin(true);
      } else {
        setLoggedInUser(loggedInUser);
        navigate('/');
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('Laukas privalo būti užpildytas...')
        .trim(),
      password: Yup.string()
      .required('Laukas privalo būti užpildytas...')
      .trim()
    })
  });

  return (
    <StyledSection>
      <h1>Prisijungti</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="userName">
          <label htmlFor="userName">Vartotojo vardas: </label>
          <input
            type="text"
            name="userName" id="userName"
            placeholder="Įveskite vartotojo vardą..."
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.userName && formik.errors.userName &&
            <p>{formik.errors.userName}</p>
          }
        </div>
        <div className="password">
          <label htmlFor="password">Slaptažodis:</label>
          <input
            type="password"
            name="password" id="password"
            placeholder="Įveskite slaptažodį..."
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <input type="submit" value="Prisijungti" />
      </form>
      {
        wrongLogin && <p>Blogas prisijungimas</p>
      }
    </StyledSection>
  );
}
 
export default Login;