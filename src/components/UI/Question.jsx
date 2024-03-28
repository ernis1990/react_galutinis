import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import QuestionsContext from '../../contexts/CardsContext';

const StyledDiv = styled.div`
  background-color: #34495e; /* Tamsus fonas */
  color: #ecf0f1; /* Šviesus tekstas */
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px; /* Atstumas tarp elementų */
  border-left: 5px solid #f1c40f; /* Ryški pastelinė spalva kairėje juostoje */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Šešėlis aplink divą */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    color: #f39c12; /* Ryški pastelinė spalva antraštei */
    margin-bottom: 10px;
  }

  p {
    color: #bdc3c7; /* Šviesesnė pilka spalva teksto turiniui */
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
      background-color: #2ecc71; /* Žalia spalva "like" mygtukui */

      &:hover {
        background-color: #27ae60; /* Tamsesnė žalia spalva užvedus pelę */
      }
    }

    &.dislikeButton {
      background-color: #e74c3c; /* Raudona spalva "dislike" mygtukui */

      &:hover {
        background-color: #c0392b; /* Tamsesnė raudona spalva užvedus pelę */
      }
    }

    &.viewButton {
      background-color: #3498db; /* Mėlyna spalva "peržiūrėti" mygtukui */
      padding: 15px 20px; /* Didesnis dydis */
      font-size: 1.1em;

      &:hover {
        background-color: #2980b9; /* Tamsesnė mėlyna spalva užvedus pelę */
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
      if (!hasLiked && !hasDisliked) {
        setQuestions({
          type: 'like',
          id: id
        });
        setHasLiked(true);
      }
    };
  
    const handleDislike = (id) => {
      if (!hasLiked && !hasDisliked) {
        setQuestions({
          type: 'dislike',
          id: id
        });
        setHasDisliked(true);
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
            Like {data.likes}
          </button>
          <button 
            className={`dislikeButton ${hasLiked ? 'disabled' : ''}`} 
            onClick={() => handleDislike(data.id)}
            disabled={hasLiked || hasDisliked}
          >
            Dislike {data.dislikes}
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