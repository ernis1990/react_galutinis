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
    
  > h1{
    font-size: 3rem;
    color: white;
  }

  > form{
    display: flex;
    flex-direction: column;
    gap: 15px;

    > div {
      display: flex;
      flex-direction: column;
      width: 400px;
      color: white;

      > textarea{
        height: 5lh;
      }
      > p{
        grid-column: span 3;
        color: red;
        text-align: center;
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