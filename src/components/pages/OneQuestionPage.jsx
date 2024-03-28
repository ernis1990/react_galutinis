import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { QuestionsActionTypes } from "../../contexts/CardsContext";
import Comment from "../UI/Comment";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

const StyledSection = styled.section`
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        margin: 20px;
    }

    .actions {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        padding: 10px;
    }

    .like-button, .dislike-button {
        
        padding: 5px 10px;
        cursor: pointer;
    }

    .like-button:hover, .dislike-button:hover {
        background-color: #aaa;
    }
`;

const OneQuestionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UsersContext);
    const { setQuestions, questions } = useContext(CardsContext);
    const card = questions.find(question => question.id === id);
    
    // const [card, setCard] = useState([]);
   

    const formik = useFormik({
        initialValues: {
          text: ''
        },
        validationSchema: Yup.object({
          text: Yup.string()
          .min(10, 'Comment must be at least 10 symbols length')
          .max(500, "Comment can't be longer than 500 symbols")
          .required('This field must be filled')
          .trim()
        }),
        onSubmit: (values) => {
          const newComment = {
            text: values.text,
            id: uuid(),
            authorId: loggedInUser.id
          }
          // console.log(newComment);
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
          {
            questions.length &&
            <>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {
                  loggedInUser.id === card.userId &&
                  <button
                    onClick={() => {
                      setQuestions({
                        type: QuestionsActionTypes.delete,
                        id: card.id
                      });
                      navigate(-1);
                    }}
                  >Delete</button>
                }
              </div>
              <div>
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
                    <label htmlFor="text">Comment:</label>
                    <textarea
                      name="text" id="text"
                      placeholder="Write your comment..."
                      value={formik.values.text}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {
                      formik.touched.text && formik.errors.text &&
                      <p>{formik.errors.text}</p>
                    }
                  </div>
                  <input type="submit" value="Comment" />
                </form>
              }
            </>
          }
        </StyledSection>
      );
    }
     
    export default OneQuestionPage;
