import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    height: 80px;

    img{
        width: 50px;
        margin-left: 40px;
    }
    ul{
        list-style-type: none;
        display: flex;
        text-decoration: none;
        gap: 20px;
        margin: 40px;
        
    

        li{
            a{
                text-decoration: none;
                color: black;
                font-size: 20px;
            }
        }
    }
    div{
        display: flex;
        align-items: center;
    }
    
`;

const Header = () => {
    return ( 
        <StyledHeader>
            <div><img src="https://smarthusbygging.no/wp-content/uploads/2024/03/cropped-WhatsApp-Image-2024-03-13-at-16.24.15-123x113.png" alt="page logo" />
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/'>Pagrindinis</NavLink>
                        </li>
                        <li>
                            <NavLink to='/questions/klausimai'>Klausimai</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <nav>
                <ul>
                    <li>
                        <NavLink to='/user/register'>Registruotis</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/login'>Prisijungti</NavLink>
                    </li>
                </ul>
            </nav>
        </StyledHeader>
     );
}
 
export default Header;