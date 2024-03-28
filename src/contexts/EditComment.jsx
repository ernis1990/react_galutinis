import { useContext, useState } from 'react';
import QuestionsContext from './CardsContext';
import { QuestionsActionTypes } from './CardsContext';

const EditComment = ({ comment, cardId }) => {
  const [newText, setNewText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(true);
  const { setQuestions } = useContext(QuestionsContext);

  const handleEdit = () => {
    setQuestions({
      type: QuestionsActionTypes.editComment,
      commentId: comment.id,
      cardId: cardId,
      newText: newText
    });
    setIsEditing(false); 
  };

  return (
    <div>
      {isEditing ? (
        <>
          <textarea value={newText} onChange={(e) => setNewText(e.target.value)} />
          <button onClick={handleEdit}>Išsaugoti</button>
        </>
      ) : (
        <p>Komentaras sėkmingai atnaujintas.</p>
      )}
    </div>
  );
};

export default EditComment;
