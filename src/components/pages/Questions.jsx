import { useContext } from "react";
import QuestionsContext from "../../contexts/CardsContext";
import UsersContext from "../../contexts/UsersContext";
import Question from "../UI/Question";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledDiv = styled.div`

  background-color: #2c3e50; /* Tamsus fonas */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-height: calc(100vh - 80px - 200px);

  h1 {
    color: #f1c40f; /* Ryški pastelinė spalva antraštei */
    text-align: center;
    margin-bottom: 20px;
  }

  .klausimas {
    display: block;
    background-color: #e74c3c; /* Ryški pastelinė spalva mygtukui */
    color: white;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 20px;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #d35400; /* Tamsesnė pastelinė spalva užvedus pelę */
    }
  }

  > div {
    background-color: #34495e; /* Tamsesnė spalva klausimų sąrašui */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
  }
`;


const Questions = () => {

    const {questions} = useContext(QuestionsContext);
    const {loggedInUser} = useContext(UsersContext)

    return ( 
    
        <StyledDiv>
            <h1>Klausimai</h1>
            {
                loggedInUser && <Link className="klausimas" to="/questions/naujas_klausimas">Naujas klausimas</Link>
            }
           
            <div>
                {
                    questions.map(question=>
                        <Question
                            key={question.id}
                            data={question}
                        />
                    )
                }

            </div>
            
        </StyledDiv>
     );
}
 
export default Questions;