import styled from 'styled-components';
import UsersContext  from "../../contexts/UsersContext";
import {useContext} from "react"


const StyledDiv = styled.div`


    .cover{
        background-color: #b47a2e;
        height: 400px;
        background-image: url('https://smarthusbygging.no/wp-content/uploads/2024/03/a_1-Photo-1-scaled.jpg');
        background-position: center;
        background-size: cover;
    }

    .homeText{
      margin: 100px;
      text-align: center;
    }


    
`;

const Home = () => {
    const {loggedInUser} = useContext(UsersContext);
    return ( 
        <StyledDiv>
                <div className='cover'></div>
                <div className='homeText'>
                {
                    loggedInUser ?
                    <h1>Sveikiname prisijungus !!!!!</h1>:
                    <h1>Kviečiame į mūsų forumą, kur patyrę specialistai dalinasi žiniomis ir patarimais apie statybą. Prisijunkite ir sužinokite apie namų statybą nuo pamatų iki rakto!</h1>
                }
                
                
                </div>
            
               
      
            
        </StyledDiv>
     );
}
 
export default Home;