import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { QuestionsActionTypes } from "../../contexts/CardsContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditComment from '../../contexts/EditComment';
import { useState } from "react";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  div {
    background-color: #f9f9f9; /* Šviesus fonas komentarui */
    border: 1px solid #e1e1e1; /* Subtilus rėmelis aplink komentarą */
    padding: 15px;
    border-radius: 8px; /* Apvalinti kampai */
    margin-bottom: 10px; /* Atstumas tarp komentarų */
    width: 80%; /* Komentaro plotis */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Lengvas šešėlis po komentaru */
  }

  p {
    color: #333; /* Tamsesnė spalva teksto */
    margin: 5px 0; /* Vertikalus tarpas tarp paragrafų */
  }

  button {
    background-color: #ff4b5c; /* Ryški raudona spalva ištrynimo mygtukui */
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px; /* Apvalinti kampai mygtukui */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Sklandus spalvos keitimas */

    &:hover {
      background-color: #ff2e4a; /* Tamsesnė raudona spalva užvedus pelę */
    }
  }
`;

const Comment = ({ comment, cardId }) => {

  const navigate = useNavigate();
  const { loggedInUser, users } = useContext(UsersContext);
  const { setQuestions } = useContext(CardsContext);
  const [isEditing, setIsEditing] = useState(false);
  const author = users.find(user => user.id === comment.authorId);

  return (
    <StyledSection>
      {
        users.length && 
        <div>
          <p>Comment by: {author.userName}</p>
          <p>{comment.text}</p>
          {
            loggedInUser.id === comment.authorId &&
            <button
              onClick={()=> setQuestions({
                type: QuestionsActionTypes.deleteComment,
                commentId: comment.id,
                cardId: cardId
              })}
            
            >Delete</button>
          }
          {
            loggedInUser.id === comment.authorId &&
              <>
                <button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && <EditComment comment={comment} cardId={cardId} />}
              </>
          }
        </div>
      }
    </StyledSection>
  );
}
 
export default Comment;