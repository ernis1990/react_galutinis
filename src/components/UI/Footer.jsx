
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid black;
    height: 200px;
    img{
        width: 130px;
        margin-left: 40px
    }

    ul{
        list-style-type: none;
        margin-right: 40px;
        text-align:center;
        li{
            a{
                text-decoration: none;
                color: black;
                line-height: 30px;
            }
            a:hover{
                color: #f37200;
            }
            i{
                font-size: 30px;
            }
        }
    }

    div:nth-child(3){
        ul{
            display: flex;  
            gap: 20px;
        }
    }
    
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <div><img src="https://smarthusbygging.no/wp-content/uploads/2024/03/cropped-WhatsApp-Image-2024-03-13-at-16.24.15-123x113.png" alt="page logo" /></div>
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