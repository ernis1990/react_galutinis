import styled from 'styled-components';

import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  background-color: #34495e; /* Tamsus fonas */
  color: #ecf0f1; /* Šviesus tekstas */
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px; /* Atstumas tarp klausimų */
  border-left: 5px solid #f1c40f; /* Ryški pastelinė spalva kairėje juostoje */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Šešėlis aplink divą */

  h2 {
    color: #f39c12; /* Ryški pastelinė spalva antraštei */
    margin-bottom: 10px;
  }

  p {
    color: #bdc3c7; /* Šviesesnė pilka spalva teksto turiniui */
    margin-bottom: 15px;
  }

  a {
    display: inline-block;
    text-decoration: none;
    padding: 10px 15px;
    background-color: #2ecc71; /* Žalia spalva mygtukui */
    color: white;
    border-radius: 4px; /* Apvalinti kampai nuorodoms */
    cursor: pointer;
    transition: background-color 0.2s; /* Sklandus spalvos keitimas */

    &:hover {
      background-color: #27ae60; /* Tamsesnė žalia spalva užvedus pelę */
    }
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