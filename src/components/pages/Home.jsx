import styled from 'styled-components';
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";

const StyledDiv = styled.div`
  .cover {
    background-color: #b47a2e;
    height: 400px;
    background-image: url('https://th.bing.com/th/id/R.8faa02c567f8ceaaca503d62150657cd?rik=%2bEi2deBhcGGN8w&riu=http%3a%2f%2fcdn.tsheets.com%2fimages%2fimg-90.jpg&ehk=k5g%2f2CjFb%2fSNyz8QD2V7IbxtIrOrnW4uVD5YCDyr5Ic%3d&risl=&pid=ImgRaw&r=0'); // Updated with a construction-themed image
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .homeText {
    margin: 100px;
    text-align: center;
    color: #ecf0f1; 
    background-color: rgba(52, 73, 94, 0.8);
    padding: 20px;
    border-radius: 8px;
  }
`;

const Home = () => {
  const { loggedInUser } = useContext(UsersContext);
  return (
    <StyledDiv>
      <div className='cover'></div>
      <div className='homeText'>
        {loggedInUser ?
          <h1>Sveikiname prisijungus !!!!!</h1> :
          <h1>Kviečiame į mūsų forumą, kur patyrę specialistai dalinasi žiniomis ir patarimais apie statybą. Prisijunkite ir sužinokite apie namų statybą nuo pamatų iki rakto!</h1>
        }
      </div>
    </StyledDiv>
  );
}

export default Home;
