import styled from 'styled-components';
import { useContext } from 'react';
import CardsContext from "../../contexts/CardsContext";
import { QuestionsActionTypes } from '../../contexts/CardsContext';
import UsersContext from '../../contexts/UsersContext';

const StyledDiv = styled.div`
    border:solid 1px black;
    margin: 10px;
    padding: 10px;
    background-color: #faeeb1;

    h3{
        color: #6b85db;
    }
`;

const Question = ({data}) => {

    const { setQuestions } = useContext(CardsContext);
    const {loggedInUser} = useContext(UsersContext)
   

    return ( 
        <StyledDiv>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            
            {
                loggedInUser.id === data.userId &&
                <button
                onClick={() => {
                    setQuestions({
                      type: QuestionsActionTypes.delete,
                      id: data.id
                    })
                  }}
                >
                    Ištrinti
                </button>
            }
        </StyledDiv>
     );
}
 
export default Question;