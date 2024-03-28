import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { QuestionsActionTypes } from "../../contexts/CardsContext";
import styled from 'styled-components';
import Comment from "../UI/Comment";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';


const StyledSection = styled.section`
  background-color: #34495e; 
  color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 5px solid #f1c40f; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 

  h3 {
    color: #f39c12;
    margin-bottom: 10px;
    font-size: 35px;
  }

  p {
    color: #737373; 
    margin-bottom: 15px;
    font-size: 20px;
  }

  button {
    background-color: #2ecc71; 
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px; 
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #27ae60;

    &.like-button {
      margin-right: 10px;
    }
  }

  .comments {
    background-color: #2c3e50; 
    padding: 15px;
    border-radius: 8px; 
    margin-top: 20px; 
  }

  form {
    background-color: #2c3e50; 
    border-radius: 8px; 
    margin-top: 20px;
  }

  label {
    color: #ecf0f1; 
  }

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #7f8c8d; 
    background-color: #95a5a6; 
    color: white; 

    &:focus {
      border-color: #f39c12; 
    }
  }

  input[type="submit"] {
    background-color: #3498db; 
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s; 

    &:hover {
      background-color: #2980b9; 
    }
  }
  .description{
    color: white;
  }
`;

const OneQuestionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UsersContext);
    const { setQuestions, questions } = useContext(CardsContext);
    const [card, setCard] = useState(null);
    

    useEffect(() => {
        const foundCard = questions.find(question => question.id === id);
        if (foundCard) {
            setCard(foundCard);
        } else {
            navigate(-1);
        }
    }, [id, questions, navigate]);

    const formik = useFormik({
        initialValues: {
          text: ''
        },
        validationSchema: Yup.object({
          text: Yup.string()
          .min(10, 'Komentaras privalo buti ilgesnis nei 10 simbolių')
          .max(500, "Komentaras privalo buti trumpesnis nei 500 simbolių")
          .required('Privaloma užpildyti')
          .trim()
        }),
        onSubmit: (values) => {
          const newComment = {
            text: values.text,
            id: uuid(),
            authorId: loggedInUser.id
          }
          
          setQuestions({
            type: QuestionsActionTypes.addComment,
            comment: newComment,
            cardId: card.id
          });
          formik.resetForm();
        }
      });
    
      return (
        <StyledSection>
            {card ? (
                <>
                    <div>
                        <h3>{card.title}</h3>
                        <p className="description">{card.description}</p>
                        
                        
                        {
                          loggedInUser.id === card.userId &&
                          <button
                            onClick={() => {
                              setQuestions({
                                type: QuestionsActionTypes.delete,
                                id: card.id
                              });
                              navigate('/questions/klausimai');
                            }}
                          >Ištrinti</button>
                        }
                    </div>
                    <div className="comments">
                        {
                          card.comments?.map(comment => 
                            <Comment
                              key={comment.id}
                              comment={comment}
                              cardId={card.id}
                            />
                          )
                        }
                    </div>
                    {
                        loggedInUser &&
                        <form onSubmit={formik.handleSubmit}>
                          <div>
                            <label htmlFor="text">Komentaras:</label>
                            <textarea
                              name="text" id="text"
                              placeholder="Rašyti komentarą..."
                              value={formik.values.text}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                            />
                            {
                              formik.touched.text && formik.errors.text &&
                              <p>{formik.errors.text}</p>
                            }
                          </div>
                          <input type="submit" value="Komentuoti" />
                        </form>
                    }
                </>
            ) : (
                <p>Loading...</p> 
            )}
        </StyledSection>
      );
    }

export default OneQuestionPage;