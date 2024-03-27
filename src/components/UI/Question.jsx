import styled from 'styled-components';

import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
    border:solid 1px black;
    margin: 10px;
    padding: 15px;
    background-color: #faeeb1;

    

    h2{
        color: #6b85db;
    }
    a{
        text-decoration: none;
        padding: 10px 20px;
        background-color: blue;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 5px;

    }

`;

const Question = ({data}) => {

   
    
   

    return ( 
        <StyledDiv>
            
            
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            
          
            <Link to={`/questions/${data.id}`}>Peržiūrėti</Link>
            
        </StyledDiv>
     );
}
 
export default Question;