import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import QuestionsContext from '../../contexts/CardsContext';

const StyledDiv = styled.div`
  background-color: #34495e; 
  color: #ecf0f1; 
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px; 
  border-left: 5px solid #f1c40f; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    color: #f39c12; 
    margin-bottom: 10px;
  }

  p {
    color: #bdc3c7;
    margin-bottom: 15px;
  }

  .voteButtons {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  button {
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &.likeButton {
      background-color: #2ecc71; 

      &:hover {
        background-color: #27ae60; 
      }
    }

    &.dislikeButton {
      background-color: #e74c3c; 

      &:hover {
        background-color: #c0392b; 
      }
    }

    &.viewButton {
      background-color: #3498db; 
      padding: 15px 20px; 
      font-size: 1.1em;

      &:hover {
        background-color: #2980b9; 
      }
    }
  }

  span {
    margin-left: 10px;
    font-weight: bold;
  }
`;

const Question = ({ data }) => {
    const { setQuestions } = useContext(QuestionsContext);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
  
    const handleLike = (id) => {
        if (!hasLiked) {
          setQuestions({
            type: 'like',
            id: id,
            hasDisliked: hasDisliked
          });
          setHasLiked(true);
          if (hasDisliked) {
            setHasDisliked(false);
          }
        }
      };
    
      const handleDislike = (id) => {
        if (!hasDisliked) {
          setQuestions({
            type: 'dislike',
            id: id,
            hasLiked: hasLiked
          });
          setHasDisliked(true);
          if (hasLiked) {
            setHasLiked(false);
          }
        }
      };
  
    return (
      <StyledDiv>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <div className="voteButtons">
          <button 
            className={`likeButton ${hasDisliked ? 'disabled' : ''}`} 
            onClick={() => handleLike(data.id)}
            disabled={hasLiked || hasDisliked}
          >
            Patinka {data.likes}
          </button>
          <button 
            className={`dislikeButton ${hasLiked ? 'disabled' : ''}`} 
            onClick={() => handleDislike(data.id)}
            disabled={hasLiked || hasDisliked}
          >
            Nepatinka {data.dislikes}
          </button>
        </div>
        <Link to={`/questions/${data.id}`}>
          <button className="viewButton">
            Peržiūrėti
          </button>
        </Link>
      </StyledDiv>
    );
  };
  
  export default Question;