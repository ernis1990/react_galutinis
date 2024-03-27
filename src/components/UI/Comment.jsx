import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { QuestionsActionTypes } from "../../contexts/CardsContext";

const Comment = ({ comment, cardId }) => {

  const { loggedInUser, users } = useContext(UsersContext);
  const { setQuestions } = useContext(CardsContext);
  const author = users.find(user => user.id === comment.authorId);

  return (
    <>
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
        </div>
      }
    </>
  );
}
 
export default Comment;