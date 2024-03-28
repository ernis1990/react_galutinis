import { useFormik } from "formik";
import * as Yup from 'yup';
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import styled from "styled-components";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { UsersActionTypes } from "../../contexts/UsersContext";


const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  background-image: url('https://images.unsplash.com/photo-1495422964407-28c01bf82b0d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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

    > div {
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

const Register = () => {

  const navigate = useNavigate();
  const [sameNameError, setSameNameError] = useState(false);
  const { users, setUsers, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues:{
      userName: "",
      password: "",
      passwordRepeat: ""
    },
    onSubmit: (values) => {
     

      if(users.find(user => user.userName === values.userName)){
        setSameNameError(true);
      } else {
        const newUser = {
          id: uuid(),
          userName: values.userName,
          password: values.password,
          role: "user"
        };
        setUsers({
          type: UsersActionTypes.addNew,
          data: newUser
        });
        setLoggedInUser(newUser);
        navigate('/');
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(4, 'Vartotojo vardas minimalus 4 simboliai')
        .max(20, "Vartotojo vardas negali būti ilgesnis nei 20 simbolių")
        .required('Laukas privalo būti užpildytas')
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          'Slaptažodis privalo turėti: vieną mažaja raidę, vieną didžiają raidę, vieną skaičių, vieną spec. simbolį, ilgis nuo 8 iki 20 simbolių'
        )
        .required('Laukas privalo būti užpildytas')
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Slaptažodis turi sutapti')
        .required('Laukas privalo būti užpildytas')
        .trim()
    })
  });

  return (
    <StyledSection>
      <h1>Registruotis</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">Vartotojo vardas:</label>
          <input
            type="text"
            name="userName" id="userName"
            placeholder="Vartotojo vardas..."
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.userName && formik.errors.userName &&
            <p>{formik.errors.userName}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Slaptažodis:</label>
          <input
            type="password"
            name="password" id="password"
            placeholder="Slaptažodis..."
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <div>
          <label htmlFor="passwordRepeat">Pakartoti slaptažodį:</label>
          <input
            type="password"
            name="passwordRepeat" id="passwordRepeat"
            placeholder="Pakartoti slaptažodį..."
            value={formik.values.passwordRepeat}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
            <p>{formik.errors.passwordRepeat}</p>
          }
        </div>
        <input type="submit" value="Registruotis" />
      </form>
      {
        sameNameError && <p>Vartotojo vardas netinkamas</p>
      }
    </StyledSection>
  );
}
 
export default Register;