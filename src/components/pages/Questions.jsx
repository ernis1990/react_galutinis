import { useContext } from "react";
import QuestionsContext from "../../contexts/CardsContext";
import UsersContext from "../../contexts/UsersContext";
import Question from "../UI/Question";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
    margin: 20px;
    div{
        border:1px solid black;
        margin: 10px 5px;
        
    }
    .klausimas{
        text-decoration: none;
        color: white;
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: #5353f9;
        margin-bottom: 5px;
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