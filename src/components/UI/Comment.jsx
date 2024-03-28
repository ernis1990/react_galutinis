import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { QuestionsActionTypes } from "../../contexts/CardsContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditComment from '../../contexts/EditComment';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  

  .comment-container {
    background-color: #ffffff;
    border: 1px solid #e1e1e1; 
    padding: 15px;
    border-radius: 8px; 
    margin-bottom: 10px; 
    width: 80%; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    position: relative;
  }

  .author {
    color: black;
    padding: 5px 10px;
    border-radius: 4px; 
    margin-bottom: 10px; 
    font-weight: bold; 
  }

  .edit-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #3498db; 
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9; 
    }
  }

  .delete-button {
    background-color: #ff0019; 
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px; 
    cursor: pointer;
    transition: background-color 0.3s ease; 
    margin-top: 10px; 

    &:hover {
      background-color: #ff2e4a; 
    }
  }

  p {
    color: #333; 
    margin: 5px 0;
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
      {users.length > 0 && (
        <div className="comment-container">
          <div className="author">Komentuoja: {author.userName}</div>
          {loggedInUser.id === comment.authorId && (
            <button
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Atšaukti' : 'Redaguoti'}
            </button>
          )}
          <p>{comment.text}</p>
          {isEditing && <EditComment comment={comment} cardId={cardId} />}
          {loggedInUser.id === comment.authorId && (
            <button
              className="delete-button"
              onClick={() =>
                setQuestions({
                  type: QuestionsActionTypes.deleteComment,
                  commentId: comment.id,
                  cardId: cardId,
                })
              }
            >
              Ištrinti
            </button>
          )}
        </div>
      )}
    </StyledSection>
  );
};

export default Comment;
