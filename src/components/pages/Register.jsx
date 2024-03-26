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
  min-height: calc(100vh - 80px - 200px);
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://media.istockphoto.com/id/521134300/photo/photo-of-blur-housing-estate.jpg?s=612x612&w=0&k=20&c=HorvB5JhFrx56G7VBOLfFsS1SIppDCkqLVX65FutPnw=');

  > h1{
    font-size: 3rem;
  }

  > form{
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 300px;
    gap: 10px;
    

    > div {
      display: flex;
      flex-direction: column;

      > p{
        grid-column: span 3;
        color: red;
        text-align: center;
      }
    }
    +p{
      color: red;
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
      // console.log(values);
      // console.log(users);

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