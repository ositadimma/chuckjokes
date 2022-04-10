import '../Styles/SearchBar.css'
import { useState, useEffect, React, useRef }from 'react';

import FooterImage from '../assets/assets_Homework_Front-End_01/bitmap_2.png'
import PathIcon from '../assets/assets_Homework_Front-End_01/path.png'
import searchImage from '../assets/assets_Homework_Front-End_01/search-copy.png';
import searchImage2 from '../assets/assets_Homework_Front-End_02/search-copy.png';
import axios from 'axios';
import BoltIcon1 from '../assets/assets_Homework_Front-End_02/blue-light.png'
import BoltIcon2 from '../assets/assets_Homework_Front-End_02/green-light.png'
import BoltIcon3 from '../assets/assets_Homework_Front-End_02/orange-light.png'
import BoltIcon4 from '../assets/assets_Homework_Front-End_02/red-light.png'




function SearchBar(props) {
const [activeSearchImage, setActiveSearchImage]= useState(null);
const [focus, setFocus]= useState(false);
const [headerDropdown, setHeaderDropdown] = useState(false);
const [input, setInput] = useState('');
const [activeResult, setActiveResult]= useState(null);
const [displayPointer, setdisplayPointer]= useState(false);
const [searchData, setSearchData] = useState('');
const [bg, setBg] = useState('transparent');


var resultArray= []
    const iconArray= [
        BoltIcon1,
        BoltIcon2,
        BoltIcon3,
        BoltIcon4
    ]



useEffect(
    ()=>{
        axios.get(`https://api.chucknorris.io/jokes/search?query=${input}`)
        .then(data=>{
            setSearchData(data.data.result)
            if(data.data.result.length>0){
                setHeaderDropdown(true);
            }else{
                setHeaderDropdown(false); 
            }
        })

        }, [input])

        var resultArray= []
 
 useEffect(
    ()=>{
        if(focus){
            setActiveSearchImage(searchImage2)
        }
        else{
            setActiveSearchImage(searchImage)
        }}, [focus])

        useEffect(
            ()=>{
                if(searchData.length>0){
                    resultArray= []
                    var a= 4
                    if(searchData.length<4){
                        a= searchData.length
                    }
                    var iconPicker= 0
                    for (let index = 0; index < searchData.length-1; index++) {
                        if(iconPicker==4){
                            iconPicker= 0
                        }
                        resultArray.push(
                            <div className='dropdown-link-container' tabIndex={0}>
                                <a href='#'>
                                <div className='dropdown-link'>
                                    <img style={{height: '15px', marginTop: '4px'}} className='dropdown-link-icon' src={iconArray[iconPicker]}/>
                                    <div className='dropdown-link-text'>
                                        {searchData[index].value.length<=30?searchData[index].value:`${searchData[index].value.substring(0,30)}...`}
                                    </div>
                                </div>
                                <hr className='header-hr'/>
                                </a>
                            </div>
                            )   
                        iconPicker+= 1                             
                    }
                    resultArray.push(
                        <div className='header-dropdown-link-container'>
                                <div className='dropdown-link'>
                                    <img className='dropdown-link-icon' style={{height: '15px', marginTop: '4px'}} src={iconArray[3]}/>
                                    <div  style={{marginTop: '3px'}}>
                                        {searchData[a-1].value.length<=30?searchData[a-1].value:`${searchData[a-1].value.substring(0,30)}...`}
                                    </div>
                                </div>
                            </div>
                    )
                    // if(resultArray.length>0){
                    //     setActiveResult(resultArray)
                    // }else{
                    //     setActiveResult(<div>no result found</div>)
                    // }   
                    setActiveResult(resultArray)
                }
                
    }, [searchData])


    const handleInputChange= (e)=>{
        setBg('#fff')
       e.preventDefault()
       setInput(e.target.value)
    }









  return (
    <div >      
       <div >
       <input id='focus' value={input} onChange={handleInputChange} placeholder='How can we make you laugh today?'>
                    </input>
        <img src={searchImage}/>           
       </div>
            {searchData.length !=0 &&(
       <div className='header-dropdown-container'>
            {activeResult}
       </div>)
    }
    </div>
  );
}

export default SearchBar;
