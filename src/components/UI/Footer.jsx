
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid black;
    height: 200px;
    img{
        width: 200px;
    }

    ul{
        list-style-type: none;
        margin-right: 40px;
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
            <div><img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg" alt="page logo" /></div>
            <div>
                <ul>
                    <li><Link>About</Link></li>
                    <li><Link>Legal</Link></li>
                    <li><Link>Privacy Policy</Link></li>
                    <li><Link>Terms of Service</Link></li>
                    <li><Link>Cookie Policy</Link></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Link><i class="bi bi-facebook"></i></Link></li>
                    <li><Link><i class="bi bi-instagram"></i></Link></li>
                    <li><Link><i class="bi bi-linkedin"></i></Link></li>
                </ul>
            </div>
        </StyledFooter>
     );
}
 
export default Footer;