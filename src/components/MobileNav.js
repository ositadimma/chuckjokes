import '../Styles/MobileNav.css';
import { useState, useEffect }from 'react';
import Dropdown from './Dropdown';
import AccountIcon from '../assets/assets_Homework_Front-End_01/shape.png';
import PathIcon from '../assets/assets_Homework_Front-End_01/path_2.png';
import { CaretDownFilled } from '@ant-design/icons';


function MobileNav() {
    const [click, setClick] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [subDropdown, setSubDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    // useEffect(() => {
    //     if(click){
    //         setShowDropdown(true)
    //     }
    //     else{
    //         setShowDropdown(false)
    //     }
    //   }, [click])

    const handleIconClick=()=>{
        setMenuOpen(!menuOpen)
    }


    // const onMouseEnter = () => {
    //     setClick(!click)
    //     if(click){
    //         setClick(false)
    //     }
    //     else{
    //         setClick(true)
    //     }      
    // };

    const showSubDropdown= ()=>{
        setSubDropdown(!subDropdown)
    }
  return (
    <div >
      <div className='nav-pointer'></div>
       <div  onClick={handleIconClick}>
            {
                !menuOpen &&
                <div className='mobileMenuIcon'>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
            }
            {
                menuOpen &&
                <div className='close'>
                    <div className='closeiCon'>
                        x
                    </div>
                </div>
            }
       </div>
       {
        menuOpen && 
        <div className='mobileDropdown'>
          <div className="mobileNavLink">
                SO FUNKTIONIERTS
          </div>
          <hr className='line'/>
          <div className="mobileNavLink">
                SONDERANGEBOTE     
          </div>
          <hr className='line'/>
          <div className="mobileNavOptions" onClick={showSubDropdown}>
                <div>MEIN BEREICH</div> 
                <CaretDownFilled/>
          </div>
          {subDropdown && <hr className='line'/>}
          { subDropdown &&
             <div className='subDropdown'>
                <div >
                  MY PUBLISHED JOKES
                </div>
                <hr className='line'/>
                <div>
                  MY SAVED JOKES
                </div>
                <hr className='line'/>
                <div>
                  ACCOUNT INFORMATION
                </div>
                <hr className='line'/>
                <div>
                  PUBLISH NEW JOKE
                </div>
              </div> 
          }
       </div>
       }
       
    </div>
  );
}

export default MobileNav;
