import { createContext, useEffect, useReducer } from "react";
import Questions from "../components/pages/Questions";

const QuestionsContext = createContext();


export const QuestionsActionTypes = {
    getAll: 'fetch all data',
    addNew: 'adds new card date',
    delete: 'delete one specific card',
    deleteComment: 'delete one specific comment',
    editComment: 'edit one specific comment',
    like: 'like question',
    dislike: 'dislike question'
    
}

const reducer = (state, action) => {
    switch(action.type){
      case QuestionsActionTypes.getAll:
        return action.data;
      case QuestionsActionTypes.addNew:
        fetch(`http://localhost:8080/questions`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(action.data)
        });
        return [...state, action.data];
      case QuestionsActionTypes.delete:
        fetch(`http://localhost:8080/questions/${action.id}`,{ method: "DELETE" });
        return state.filter(el => el.id !== action.id);
      case QuestionsActionTypes.addComment:
        const cardToAddComment = state.find(el => el.id === action.cardId);
        const commentedCard = {
          ...cardToAddComment,
          comments: cardToAddComment.comments ? [...cardToAddComment.comments, action.comment] : [action.comment]
        };
        fetch(`http://localhost:8080/questions/${action.cardId}`,{
          method: "PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(commentedCard)
        });
        return state.map(el => {
          if(el.id === action.cardId){
            return commentedCard;
          } else {
            return el;
          }
        });
        case QuestionsActionTypes.editComment:
            const cardToEditComment = state.find(el => el.id === action.cardId);
            const updatedComments = cardToEditComment.comments.map(comment => {
                if (comment.id === action.commentId) {
                return { ...comment, text: action.newText };
                }
                return comment;
            });
            const updatedCard = {
                ...cardToEditComment,
                comments: updatedComments
            };
            fetch(`http://localhost:8080/questions/${action.cardId}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCard)
            });
            return state.map(el => {
                if (el.id === action.cardId) {
                return updatedCard;
                } else {
                return el;
            }
        });
        
      case QuestionsActionTypes.deleteComment:
        const cardToChange = state.find(el => el.id === action.cardId);
        const changedCard = {
          ...cardToChange,
          comments: cardToChange.comments.filter(comment => comment.id !== action.commentId)
        };
        fetch(`http://localhost:8080/questions/${action.cardId}`,{
          method: "PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(changedCard)
        });
        return state.map(el => {
          if(el.id === action.cardId){
            return changedCard;
          } else {
            return el;
          }
        });
        case 'like':
      const updatedQuestionsLike = state.map(question => {
        if(question.id === action.id) {
          const updatedLikes = String(Number(question.likes) + 1);
          const updatedQuestion = { ...question, likes: updatedLikes };
          fetch(`http://localhost:8080/questions/${action.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedQuestion)
          });
          return updatedQuestion;
        }
        return question;
      });
      return updatedQuestionsLike;
    case 'dislike':
      const updatedQuestionsDislike = state.map(question => {
        if(question.id === action.id) {
          const updatedDislikes = String(Number(question.dislikes) + 1);
          const updatedQuestion = { ...question, dislikes: updatedDislikes };
          fetch(`http://localhost:8080/questions/${action.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedQuestion)
          });
          return updatedQuestion;
        }
        return question;
      });
      return updatedQuestionsDislike;
        
        
      default:
        console.error(`No such reducer actions: ${action.type}`);
        return state;
    }
  }
  
  const QuestionsProvider = ({ children }) => {
  
    const [questions, setQuestions] = useReducer(reducer, []);
  
    useEffect(()=>{
      fetch(`http://localhost:8080/questions`)
        .then(res => res.json())
        .then(data => setQuestions({
          type: QuestionsActionTypes.getAll,
          data: data
        }));
    },[]);
  
    return(
      <QuestionsContext.Provider
        value={{
            questions,
            setQuestions
        }}
      >
        { children }
      </QuestionsContext.Provider>
    )
  }

  
  
  export { QuestionsProvider };
  export default QuestionsContext;