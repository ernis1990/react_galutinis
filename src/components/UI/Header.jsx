import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsersContext  from "../../contexts/UsersContext";
import {useContext} from "react"

const StyledHeader = styled.header`
    background-color: #2c3e50; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ecf0f1; 
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
                color: #ffffff; 
                font-size: 20px;
                &:hover {
                    color: #f39c12; 
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
            color: #ecf0f1; 
        }
        button {
            background-color: #8e44ad;
            border-radius: 5px;
            border: none;
            padding: 5px 10px;
            color: white;
            letter-spacing: 2px;
            font-weight: 600;
            &:hover {
                background-color: #3498db;
            }
        }
    }
`;

const Header = () => {
    
    const navigate = useNavigate();
    const {loggedInUser, setLoggedInUser} = useContext(UsersContext);
    
    return ( 
        <StyledHeader>
            <div><img src="https://i.stack.imgur.com/17UsL.png" alt="page logo" />
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