import styled from 'styled-components';

const StyledDiv = styled.div`
    border:solid 1px black;
    margin: 10px;
    padding: 10px;

    h3{
        background-color: #dedede;
        color: #6b85db;
    }
`;

const Question = ({data}) => {
    return ( 
        <StyledDiv>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
        </StyledDiv>
     );
}
 
export default Question;