import { useContext } from "react";
import QuestionsContext from "../../contexts/CardsContext";
import Question from "../UI/Question";
import styled from 'styled-components';

const StyledDiv = styled.div`
padding-top: 20px;
    margin: 20px;
    div{
        border:1px solid black
    }
`;

const Questions = () => {

    const {questions} = useContext(QuestionsContext);

    return ( 
        <StyledDiv>
            <h1>Klausimai</h1>
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