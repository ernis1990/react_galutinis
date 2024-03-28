import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { QuestionsActionTypes } from "../../contexts/CardsContext";
import styled from 'styled-components';
import Comment from "../UI/Comment";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { BsHeart, BsHeartFill } from 'react-icons/bs'; // Importing Bootstrap icons

const StyledSection = styled.section`
  background-color: #34495e; /* Tamsus fonas */
  color: #ecf0f1; /* Šviesus tekstas */
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px; /* Atstumas tarp skilties elementų */
  border-left: 5px solid #f1c40f; /* Ryški pastelinė spalva kairėje juostoje */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Šešėlis aplink skiltį */

  h3 {
    color: #f39c12; /* Ryški pastelinė spalva antraštei */
    margin-bottom: 10px;
    font-size: 35px;
  }

  p {
    color: #737373; /* Šviesesnė pilka spalva teksto turiniui */
    margin-bottom: 15px;
  }

  button {
    background-color: #2ecc71; /* Žalia spalva mygtukams */
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px; /* Apvalinti kampai mygtukams */
    cursor: pointer;
    transition: background-color 0.2s; /* Sklandus spalvos keitimas */

    &:hover {
      background-color: #27ae60; /* Tamsesnė žalia spalva užvedus pelę */
    }

    &.like-button {
      margin-right: 10px; /* Atstumas tarp mygtukų */
    }
  }

  .comments {
    background-color: #2c3e50; /* Tamsesnė spalva komentarų skiltyje */
    padding: 15px;
    border-radius: 8px; /* Apvalinti kampai komentarų skiltyje */
    margin-top: 20px; /* Atstumas nuo pagrindinės skilties iki komentarų */
  }

  form {
    background-color: #2c3e50; /* Tamsesnė spalva formos skiltyje */
    padding: 15px;
    border-radius: 8px; /* Apvalinti kampai formos skiltyje */
    margin-top: 20px; /* Atstumas nuo komentarų skilties iki formos */
  }

  label {
    color: #ecf0f1; /* Šviesus tekstas etiketėms */
  }

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #7f8c8d; /* Pilka spalva rėmeliui */
    background-color: #95a5a6; /* Šviesesnė pilka spalva teksto laukui */
    color: white; /* Šviesus tekstas teksto laukui */

    &:focus {
      border-color: #f39c12; /* Ryški pastelinė spalva fokusuojant */
    }
  }

  input[type="submit"] {
    background-color: #3498db; /* Mėlyna spalva pateikimo mygtukui */
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px; /* Apvalinti kampai pateikimo mygtukui */
    cursor: pointer;
    transition: background-color 0.2s; /* Sklandus spalvos keitimas */

    &:hover {
      background-color: #2980b9; /* Tamsesnė mėlyna spalva užvedus pelę */
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
    const [liked, setLiked] = useState(false); // State to manage likes

    useEffect(() => {
        const foundCard = questions.find(question => question.id === id);
        if (foundCard) {
            setCard(foundCard);
        } else {
            navigate(-1);
        }
    }, [id, questions, navigate]);

    // Handlers for like and unlike actions
    const handleLike = () => {
        setLiked(true);
        // Implement the logic to increase the like count in your context or backend
    };

    const handleUnlike = () => {
        setLiked(false);
        // Implement the logic to decrease the like count in your context or backend
    };

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
                        {/* Like and Unlike buttons with icons */}
                        {liked ? (
                            <button onClick={handleUnlike}>
                                <BsHeartFill color="red" /> Unlike
                            </button>
                        ) : (
                            <button onClick={handleLike}>
                                <BsHeart /> Like
                            </button>
                        )}
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
                          >Delete</button>
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
            ) : (
                <p>Loading...</p> 
            )}
        </StyledSection>
      );
    }

export default OneQuestionPage;
