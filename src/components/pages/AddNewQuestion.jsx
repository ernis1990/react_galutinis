import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import styled from "styled-components";
import { QuestionsActionTypes } from "../../contexts/CardsContext";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  min-height: calc(100vh - 80px - 200px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://img.freepik.com/premium-photo/hard-hats-yellow-cap-mine-safety-appliances-cement-floor_35719-3052.jpg');
    
  > h1 {
    font-size: 3rem;
    color: #ffffff;
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);

    > div {
      display: flex;
      flex-direction: column;
      width: 400px;

      > label {
        color: #333; 
      }

      > input, textarea {
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

const AddNewQuestion = () => {
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UsersContext);
    const { setQuestions } = useContext(CardsContext);

    const formik = useFormik({
        initialValues: {
          title: "",
          description: "",
          likes: "",
          dislikes: ""

        }, 
        onSubmit: values => {
            
          const newCard = {
            id: uuid(),
            userId: loggedInUser.id,
            ...values
          }
          
          setQuestions({
            type: QuestionsActionTypes.addNew,
            data: newCard
          });
          navigate(-1);
        },
        validationSchema: Yup.object({
          title: Yup.string()
            .min(5, 'Temos pavadinimas bent 5 simboliai')
            .max(20, "Temos pavadinimas negali būti ilgesnis už 20 simpolių")
            .required('Parašykite temą !')
            .trim(),
          description: Yup.string()
            .min(5, 'Klausimas privalo būti bent 5 simbolių')
            .max(1000, "Maksimalus simbolių kiekis 1000")
            .required('Parašykite klausimą')
            .trim()
        })
      });

    return ( 
        <StyledSection>
            <h1>Naujas klausimas</h1>
            <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="title">Tema:</label>
                <input
                type="text"
                name="title" id="title"
                placeholder="Klausimo tema..."
                value={formik.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                />
                {
                formik.touched.title && formik.errors.title &&
                <p>{formik.errors.title}</p>
                }
            </div>
            <div>
                <label htmlFor="description">Klausimas:</label>
                <textarea
                name="description" id="description"
                placeholder="Klausimas..."
                value={formik.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                />
                {
                formik.touched.description && formik.errors.description &&
                <p>{formik.errors.description}</p>
                }
            </div>
            <input type="submit" value="Patvirtinti" />
            </form>
      </StyledSection>
     );
}
 
export default AddNewQuestion;