import { useContext, useState } from 'react';
import QuestionsContext from './CardsContext';
import { QuestionsActionTypes } from './CardsContext';

const EditComment = ({ comment, cardId }) => {
  const [newText, setNewText] = useState(comment.text);
  const { setQuestions } = useContext(QuestionsContext);

  const handleEdit = () => {
    setQuestions({
      type: QuestionsActionTypes.editComment,
      commentId: comment.id,
      cardId: cardId,
      newText: newText
    });
  };

  return (
    <div>
      <textarea value={newText} onChange={(e) => setNewText(e.target.value)} />
      <button onClick={handleEdit}>Save</button>
    </div>
  );
};

export default EditComment;