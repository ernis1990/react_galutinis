import { createContext, useEffect, useReducer } from "react";
import Questions from "../components/pages/Questions";

const QuestionsContext = createContext();

export const QuestionsActionTypes = {
    getAll: 'fetch all data',
    addNew: 'adds new card date',
    delete: 'delete one specific card',
    deleteComment: 'delete one specific comment'
    
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