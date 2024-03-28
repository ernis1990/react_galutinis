import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsersContext  from "../../contexts/UsersContext";
import {useContext} from "react"

const StyledHeader = styled.header`
    background-color: #2c3e50; /* Dark background */
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ecf0f1; /* Light stripe for separation */
    height: 80px;

    img {
        width: 50px;
        margin-left: 40px;
    }

    ul {
        list-style-type: none;
        display: flex;
        text-decoration: none;
        gap: 20px;
        margin: 40px;
        
        li {
            a {
                text-decoration: none;
                color: #3498db; /* Bright pastel color */
                font-size: 20px;
                &:hover {
                    color: #9b59b6; /* Slightly different pastel shade on hover */
                }
            }
        }
    }

    div {
        display: flex;
        align-items: center;
    }

    .login {
        padding-right: 20px;
        p {
            padding-right: 20px;
            font-size: 25px;
            color: #ecf0f1; /* Light text color for contrast */
        }
        button {
            background-color: #8e44ad; /* Changed from red to a pastel purple */
            border-radius: 5px;
            border: none;
            padding: 5px 10px;
            color: white;
            letter-spacing: 2px;
            font-weight: 600;
            &:hover {
                background-color: #3498db; /* Different pastel shade on hover */
            }
        }
    }
`;

const Header = () => {
    
    const navigate = useNavigate();
    const {loggedInUser, setLoggedInUser} = useContext(UsersContext);
    
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
            {
                loggedInUser ?
                <div className="login">
                    <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="" />
                    <p>Sveikas, {loggedInUser.userName}</p>
                    <button
                        onClick={() =>{
                            setLoggedInUser(false);
                            navigate('/');
                        }}
                    >
                        Atsijungti
                    </button>
                
                </div>:
                
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
            }
            
            
        </StyledHeader>
     );
}
 
export default Header;