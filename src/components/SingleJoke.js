import '../Styles/SingleJoke.css'
import FooterImage from '../assets/assets_Homework_Front-End_01/bitmap_2.png'
import PathIcon from '../assets/assets_Homework_Front-End_01/path.png'
import goBackbg from '../assets/assets_Homework_Front-End_01/NicePng_triangle-shape-png_469203.png'
import arrowLeft from '../assets/assets_Homework_Front-End_02/arrow-left.png'
import arrowRight from '../assets/assets_Homework_Front-End_02/arrow-left-copy.png'
import {ReactComponent as isvg} from '../assets/assets_Homework_Front-End_01/iconmonstr-thumb-10.svg'
import {LikeOutlined} from '@ant-design/icons'
import {DislikeOutlined} from '@ant-design/icons'
import { useState, useEffect } from 'react'






function SingleJoke(props) {
    const [likes, setLikes]= useState(0)
    const [dislikes, setDislikes]= useState(0);
    const [stat, setStat]= useState('');
    const [statColor, setStatColor]= useState('#fff');




    useEffect(()=>{
        if(likes<51 ){
            setStat('POPULAR')
            setStatColor('#57dbe6')
        } 
        if(likes>50 && likes<101){
            setStat('TRENDING')
            setStatColor('#ffbe5b')

        } 
        if(likes>101){
            setStat('EPIC')
            setStatColor('#ff5b5b')
        } 
    })


    const returnToMultiple= ()=>{
        props.toggle(false)
    }
    const handleLikes= ()=>{
        setLikes(likes+1)
    }

    const handleDisikes= ()=>{
        setDislikes(dislikes+1)
    }
    const loadBest= ()=>{
        var bestJokes= []
        for (let index = 0; index < 10; index++) {
            bestJokes.push(
                <div>
                    {props.data[index].categories[0]?`${props.data[index].categories[0]} joke`:'uncategorized joke'}
                </div> 
            )
        } 
        return bestJokes
    }

  return (
    <div className='SingleJokeWrapper'> 
    <div onClick={returnToMultiple} style={{marginLeft: '10%', marginBottom: 30}}>
    <img style={{position: 'absolute', marginTop: 17, zIndex: 2, paddingLeft: 12, height: 13}} src={arrowLeft}/>  
    <img style={{width: 50, transform: 'rotate(80deg)'}} src={goBackbg}/>  
    </div>
    <div className='SingleJokeFlex'>
        <div className='jokeColumn'>
        <div className='SingleJokeContainer'>
            <div  className='jokeHeaderTop'>
            <div className='jokeCategory'>
                <div className='dot'>• </div>
                <div>{props.joke.categories[0]?`${props.joke.categories[0]} JOKE`.toUpperCase():'UNCATEGORIZED JOKE'}</div>
            </div>
            <div className='status' style={{color: statColor, fontWeight: 600, marginTop: 5, marginRight:20}}>
            • {stat}
            </div>
            </div>
            <div className='SingleJokeHeader'>
                <div className='SingleJokeHeaderText'>
                    CHUCK JOKE
                </div>
                <div className='SingleJokeHeaderDetails'>
                    <hr/>
                    <div>
                        No #1
                    </div>
                </div>
            </div>
            <div className='SingleJokeContent'>
                {props.joke.value}
            </div>
            
          </div>
          <div className='utilityContainer'>
            <div className='iconsContainer'>
                <div>
                    <div className='likeIcon' onClick={()=>{handleLikes(props.joke.id)}}>
                        <LikeOutlined style={{color: '#fff', fontSize: '20px', position: 'absolute', marginLeft: '5px', marginTop: '3.5px'}}/>
                    </div>
                    <div className='likeIconNumbers'>
                        {likes}
                    </div> 
                </div>
                <div>
                    <div className='dislikeIcon' onClick={handleDisikes}>
                        <DislikeOutlined style={{color: '#fff', fontSize: '20px', position: 'absolute', marginLeft: '5px', marginTop: '5px'}}/>
                    </div>
                    <div  className='likeIconNumbers'>
                        {dislikes}
                    </div> 
                </div>
            </div>
            <div className='linkButtons'>
                <div>
                    <img className='arrowLeft' src={arrowLeft}/>
                    <div className='prevButton'>
                        PREV. JOKE
                    </div>
                </div>
                <div >
                    <div className='nextButton'>
                        NEXT JOKE
                    </div>
                    <img className='arrowRight' src={arrowRight}/>
                </div>
            </div>
          </div>
        </div>
        <div className='jokeListContainer'>
            <div className='bestHeading'>Top ten jokes of the week</div>
            <div className='jokeList'>
                {loadBest()}
            </div>
        </div>
        </div>       
    </div>
  );
}

export default SingleJoke;
