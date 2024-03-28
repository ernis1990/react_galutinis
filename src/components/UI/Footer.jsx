
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledFooter = styled.footer`
    background-color: #34495e;
    color: #ecf0f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-top: 3px solid #f39c12; 

    .image {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 130px;
            margin-bottom: 10px;
        }
    }

    ul {
        list-style-type: none;
        display: flex;
        gap: 20px;
        padding: 0;
        margin: 0;
        li {
            a {
                text-decoration: none;
                color: #ecf0f1; 
                font-size: 18px;
                &:hover {
                    color: #f39c12; 
                }
            }
        }
    }

    .social-media-icons {
        font-size: 24px;
        a {
            color: #ecf0f1;
            &:hover {
                color: #f39c12; 
            }
        }
    }
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <div className="image">
                <img src="https://i.stack.imgur.com/17UsL.png" alt="page logo" />
                <p>Copyrights &copy; 2024 by ME</p>
            </div>
            <div>
                <ul>
                    <li><Link>Apie mus</Link></li>
                    <li><Link>Kontaktai</Link></li>
                    <li><Link>Pasiūlimai</Link></li>
                    <li><Link>Forumo taisyklės</Link></li>
                    <li><Link>Privatumo Politika</Link></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Link><i className="bi bi-facebook"></i></Link></li>
                    <li><Link><i className="bi bi-instagram"></i></Link></li>
                    <li><Link><i className="bi bi-linkedin"></i></Link></li>
                </ul>
            </div>
        </StyledFooter>
     );
}
 
export default Footer;