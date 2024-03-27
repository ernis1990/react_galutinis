import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { QuestionsActionTypes } from "../../contexts/CardsContext";
import Comment from "../UI/Comment";

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
    const { setQuestions } = useContext(CardsContext);
    const [card, setCard] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
            .then(res => res.json())
            .then(data => {
                setCard(data);
                setLikes(parseInt(data.likes));
                setDislikes(parseInt(data.dislikes));
            });
    }, [id]);

    const handleLike = () => {
        if (selectedButton !== 'like') {
            setLikes(prevLikes => prevLikes + 1);
            setDislikes(prevDislikes => prevDislikes - (selectedButton === 'dislike' ? 1 : 0));
            setSelectedButton('like');
        } else {
            setLikes(prevLikes => prevLikes - 1);
            setSelectedButton(null);
        }
    };

    const handleDislike = () => {
        if (selectedButton !== 'dislike') {
            setDislikes(prevDislikes => prevDislikes + 1);
            setLikes(prevLikes => prevLikes - (selectedButton === 'like' ? 1 : 0));
            setSelectedButton('dislike');
        } else {
            setDislikes(prevDislikes => prevDislikes - 1);
            setSelectedButton(null);
        }
    };

    return (
        <StyledSection>
            <div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>

                <div className="actions">
                    <i className="bi bi-hand-thumbs-up-fill" onClick={handleLike} >{likes}</i>
                    
                    <i className="bi bi-hand-thumbs-down-fill" onClick={handleDislike} >{dislikes}</i>
                    
                </div>

                {loggedInUser.id === card.userId && (
                    <button
                        onClick={() => {
                            setQuestions({
                                type: QuestionsActionTypes.delete,
                                id: card.id
                            });
                            navigate(-1);
                        }}
                    >
                        Ištrinti
                    </button>
                )}
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
          
        </StyledSection>
    );
};

export default OneQuestionPage;
