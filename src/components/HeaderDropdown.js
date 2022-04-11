import '../Styles/HeaderDropdown.css'
import { useState, useEffect, useRef , useLayoutEffect}from 'react';
import BoltIcon1 from '../assets/assets_Homework_Front-End_02/blue-light.png'
import BoltIcon2 from '../assets/assets_Homework_Front-End_02/green-light.png'
import BoltIcon3 from '../assets/assets_Homework_Front-End_02/orange-light.png'
import BoltIcon4 from '../assets/assets_Homework_Front-End_02/red-light.png'
function HeaderDropdown(props) {
    const [activeResult, setActiveResult]= useState(null);
    const [displayPointer, setdisplayPointer]= useState(false);

    //send joke object to parent
    const submitJoke=(data)=>{
        props.toggle(data)
    }


    var resultArray= []
    const iconArray= [
        BoltIcon1,
        BoltIcon2,
        BoltIcon3,
        BoltIcon4
    ]
    
    //handle dropdown
    useEffect(
        ()=>{
            if(props.result.length>0){
                setdisplayPointer(true)
                resultArray= []
                var a= 4
                if(props.result.length<4){
                    a= props.result.length
                }
                var iconPicker= 0
                for (let index = 0; index < props.result.length-1; index++) {
                    if(iconPicker==4){
                        iconPicker= 0
                    }
                    resultArray.push(
                        <div className='dropdown-link-container' onClick={()=>{submitJoke(props.result[index])}}>
                            <div className='dropdown-link'>
                                <img style={{height: '15px', marginTop: '4px'}} className='dropdown-link-icon' src={iconArray[iconPicker]}/>
                                <div className='dropdown-link-text'>
                                    {props.result[index].value.length<=30?props.result[index].value:`${props.result[index].value.substring(0,30)}...`}
                                </div>
                            </div>
                            <hr className='header-hr'/>
                        </div>
                        )   
                    iconPicker+= 1                             
                }
                resultArray.push(
                    <div className='header-dropdown-link-container'>
                            <div className='dropdown-link'>
                                <img className='dropdown-link-icon' style={{height: '15px', marginTop: '4px'}} src={iconArray[3]}/>
                                <div  style={{marginTop: '3px'}}>
                                    {props.result[a-1].value.length<=30?props.result[a-1].value:`${props.result[a-1].value.substring(0,30)}...`}
                                </div>
                            </div>
                        </div>
                )   
                setActiveResult(resultArray)
            }
            
            }, [props.result])
    const showPointer= ()=>{
        if(displayPointer){
            return(
                <div className='header-pointer'>
                </div>
            )
        }else{
            return
        }
    }
    
  return (
    <div   className='header-dropdown-container' >   
        <div className='header-pointer'>
                </div>
       <div ref={props.uref}  className='header-dropdown' tabIndex={0}>
                {activeResult}
       </div>
       
    </div>
  );
}

export default HeaderDropdown;
