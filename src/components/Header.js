import '../Styles/Header.css';
import { useState, useEffect, React, useRef }from 'react';
import headerImage from '../assets/assets_Homework_Front-End_01/bitmap.png';
import searchImage from '../assets/assets_Homework_Front-End_01/search-copy.png';
import searchImage2 from '../assets/assets_Homework_Front-End_02/search-copy.png';
import HeaderDropdown from './HeaderDropdown';
import SearchBar from './SearchBar';
import axios from 'axios';



function Header(props) {
 const [activeSearchImage, setActiveSearchImage]= useState(null);
 const [focus, setFocus]= useState(false);
 const [headerDropdown, setHeaderDropdown] = useState(false);
 const [input, setInput] = useState('');
 const [totalData, setTotalData] = useState(null);
 const [searchData, setSearchData] = useState([]);
 const [bg, setBg] = useState('transparent');
 const [keyDown, setKeyDown] = useState(false);
 const inputRef = useRef();



 //handle search input
 const handleInputChange= (e)=>{
     setBg('#fff')
     setFocus(true)
    e.preventDefault()
    setInput(e.target.value)
    const searchfilter= totalData.filter((value)=>{
        return value.value.includes(e.target.value)
    })
    setSearchData(searchfilter)
    if(searchfilter.length>0){
        setHeaderDropdown(true);
    }else{
        setHeaderDropdown(false); 
    }
 }
 //load all data
 useEffect(
    ()=>{
        axios.get(`https://api.chucknorris.io/jokes/search?query=all`)
        .then(data=>{
            setTotalData(data.data.result)
        })

        }, [])

        const dropdownStatus=()=>{
            setHeaderDropdown(false)
        }
        
 //toggle input icon
 useEffect(
    ()=>{
        if(focus){
            setActiveSearchImage(searchImage2)
        }
        else{
            setActiveSearchImage(searchImage)
        }}, [focus])

const handleToggle= (data)=>{
    setHeaderDropdown(false)
    props.toggle(data)
}

 const handleInput= ()=>{
     if(input.length>0){
         setHeaderDropdown(true)
     }
 }
 const handleBlur= ()=>{
    if(input.length<1){
        setHeaderDropdown(false)
        setBg('transparent')
    }
}

//handle enter input 
const handleKeyDown=(e)=>{
    if(e.keyCode===13){
        props.handleSearch(searchData)
    }
    if(e.keyCode===40){
        console.log(inputRef)
        inputRef.current.focus()
    }
    
}


  return (
    <div className='Header'>      
       <div style={{backgroundImage: `url(${headerImage})`}}>
           <div>
                <div className='the-joke-bible'>
                        The Joke Bible
                </div>
                <div>
                    Daily Laughs for you and yours
                </div>
                <div>
                    <input onKeyDown={(e)=>handleKeyDown(e)} style={{background: bg}} id='focus' value={input} onChange={handleInputChange} onFocus={handleInput} onBlur={handleBlur} placeholder='How can we make you laugh today?'>
                    </input>
                    <img src={activeSearchImage}/>
                    {headerDropdown && <HeaderDropdown uref={inputRef} dropdownStatus={dropdownStatus} toggle={handleToggle} result={searchData} headerDropdown={headerDropdown}/>}
                </div>
                
           </div>
           
       </div>
    </div>
  );
}

export default Header;
