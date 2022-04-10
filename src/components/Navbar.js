import '../Styles/Navbar.css';
import { useState, useEffect }from 'react';
import Dropdown from './Dropdown';
import MobileNav from './MobileNav';

import AccountIcon from '../assets/assets_Homework_Front-End_01/shape.png';
import PathIcon from '../assets/assets_Homework_Front-End_01/path_2.png';
import { WindowsFilled } from '@ant-design/icons';


function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [displayMobileNav, setDisplayMobileNav] = useState(false);
    const [mainNav, setMainNav] = useState(true);


    useEffect(() => {
        if(click){
            setDropdown(true)
        }
        else{
            setDropdown(false)
        }
      }, [click])

      useEffect(() => {
        if(window.innerWidth<900){
            setDisplayMobileNav(true)
            setMainNav(false)
        }
        
      }, [window.innerWidth])

    const onMouseEnter = () => {
        setClick(!click)
        if(click){
            setClick(false)
        }
        else{
            setClick(true)
        }      
    };

    window.addEventListener('resize', ()=>{
        if(window.innerWidth<900){
            setDisplayMobileNav(true)
            setMainNav(false)
            setDropdown(false)
        }else{
            setDisplayMobileNav(false) 
            setMainNav(true)
        }
    }
    )
    
    
  return (
    <div >
       <nav>
       {displayMobileNav && <MobileNav/>}
       { mainNav &&
        <div class="nav-links-container">
            <div class="nav-link">
                SO FUNKTIONIERTS
            </div>
            <div class="nav-link">
                SONDERANGEBOTE     
            </div>
            <div class="nav-options" onClick={onMouseEnter}>
                <div><img src={AccountIcon}/></div>
                <div>MEIN BEREICH</div> 
                <div><img src={PathIcon}/></div>
            </div>
        </div>
       }
      </nav>
      {dropdown && <Dropdown/>}
    </div>
  );
}

export default Navbar;
