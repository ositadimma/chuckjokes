import '../Styles/HomepageBody.css';
import { useState, useEffect }from 'react';
import DownArrow from '../assets/assets_Homework_Front-End_01/path-copy-7.png';
import RightArrow from '../assets/assets_Homework_Front-End_01/path.png';
import BoltIcon from '../assets/assets_Homework_Front-End_01/green-light-copy.png';
import axios from 'axios';
import SingleJoke from './SingleJoke';
import { PropertySafetyFilled } from '@ant-design/icons';



function HomepageBody(props) {
    const [input, setInput] = useState('');
    const [categoriesData, setCategoriesData] = useState(null);
    const [allData, setAllData] = useState(null);
    const [categoriesUI, setCategoriesUI] = useState(null);
    const [jokes, setJokes] = useState([]);
    const [activeJokes, setActiveJokes] = useState(null);
    const [loadingJokes, setLoadingJokes] = useState(true);
    const [randomJokes, setRandomJokes] = useState(null);
    const [randomJokesLoading, setRandomJokesLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('suggested');
    const [currentBg, setCurrentBg] = useState('#ff5b5b');
    const [loadViewAll, setLoadViewAll] = useState('VIEW ALL');
    const [displayIcon, setDisplayIcon] = useState('block');
    const [currentJoke, setCurrentJoke] = useState(null);
    const [singleJokeLoaded, setSingleJokeLoaded] = useState(false);
    const [showMultipleJokes, setShowMultipleJokes] = useState(true);
    const [jokesNumber, setJokesNumber] = useState(0);
    const [showViewAll, setShowViewAll] = useState(true);







    




    const categories= [
        'new', 'old', 'cool', 'not cool', 'fresh', 'too fresh', 'the one', 'one and only', 'true one' 
    ]
    
    //render a joke
    useEffect(
        ()=>{
            if(props.newJoke){
                showSingleJoke(props.newJoke)
            }
     }, [props.newJoke])

     //load search result jokes
    useEffect(
        ()=>{
            if(props.newSearch){
                if(props.newSearch.length==1){
                    showSingleJoke(props.newSearch[0])
                }else{
                const searchArray= []
                var searchLimit= 6;
                if(props.newSearch.length<searchLimit){
                    searchLimit= props.newSearch.length
                    setShowViewAll(false)
                }
                for (let i = 0; i < 6; i++) {
                    searchArray.push(
                    <div className='jokeContainer'>
                        <div className='jokeHeader'>
                            <img style={{height: '15px', marginTop: '4px', marginRight: '5px'}} src={BoltIcon}/>
                            <div className='jokeHeader'>
                                {`${props.newSearch[i].categories[0]?props.newSearch[i].categories[0].toUpperCase():'UNCATEGORIZED'} JOKE ` }
                            </div>
                        </div>
                        <div className='jokeContent'>
                                {props.newSearch[i].value.length> 400?`${props.newSearch[i].value.substring(0,400)}...` :props.newSearch[i].value}
                        </div>
                        <div onClick={()=>{showSingleJoke(props.newSearch[i])}} className='statsLink'>
                            <div className='statsLinkText'>
                                SEE STATS
                            </div>
                            <div className='statsLinkIconContainer'>
                                <img className='statsLinkIcon' src={RightArrow}>
                                </img>
                            </div>
                        </div>
                    </div>
                    )
                }

                setActiveJokes(searchArray)
                setCurrentCategory('search result')
                setJokesNumber(6)
            }
            }
            
            }, [props.newSearch])
      
    //load category buttons
    useEffect(
        ()=>{
            var colorPicker= 0
            const loadedCategories= []
            if(categoriesData != null){
                for (let i = 0; i < 7; i++) {
                    loadedCategories.push(<div key={categoriesData[i]} onClick={()=>{setCurrentCategory(categoriesData[i]);setCurrentBg(colors[colorPicker])}} style={{backgroundColor: colors[colorPicker]}}>{`${categoriesData[i].toUpperCase()} JOKES`}</div>)
                    colorPicker+= 1
                }
                setCategoriesUI(loadedCategories) 
            }
            
            }, [categoriesData])
    
    const showSingleJoke= (joke)=>{
        setCurrentJoke(joke)
        setSingleJokeLoaded(true)
        setShowMultipleJokes(false)
    }


    const toggleJokes= ()=>{
        setShowMultipleJokes(true)
    }

    //handle view more jokes
    const viewMoreJokes= ()=>{
        if(currentCategory==='suggested'){
            var randomNumbers= []
            var newNumber= jokesNumber+6
            if(allData.length<newNumber){
                setShowViewAll(false)
                newNumber= allData.length
            }
            for(let j=0; j<newNumber;j++){
                var randomNumber= Math.floor(((Math.random()*allData.length)+(Math.random()*allData.length))/2)
                randomNumbers.push(randomNumber)
            }
            setJokesNumber(newNumber)
            var loadedJokes= []
            if(allData != null){
            for (let i = 0; i < randomNumbers.length; i++) {
                loadedJokes.push(
                    <div className='jokeContainer'>
                        <div className='jokeHeader'>
                            <img style={{height: '15px', marginTop: '4px', marginRight: '5px'}} src={BoltIcon}/>
                            <div className='jokeHeader'>
                                {`${allData[randomNumbers[i]].categories[0]?allData[randomNumbers[i]].categories[0].toUpperCase():'UNCATEGORIZED'} JOKE ` }
                            </div>
                        </div>
                        <div className='jokeContent'>
                                {allData[randomNumbers[i]].value.length> 400?`${allData[randomNumbers[i]].value.substring(0,400)}...` :allData[randomNumbers[i]].value}
                        </div>
                        <div onClick={()=>{showSingleJoke(allData[randomNumbers[i]])}} className='statsLink'>
                            <div className='statsLinkText'>
                                SEE STATS
                            </div>
                            <div className='statsLinkIconContainer'>
                                <img className='statsLinkIcon' src={RightArrow}>
                                </img>
                            </div>
                        </div>
                    </div>
                    )
                }
                setActiveJokes(loadedJokes);}
        }
        else if(currentCategory=='search result'){
            var number= jokesNumber + 6
            if (props.newSearch.length<number){
                number= props.newSearch.length;
                setShowViewAll(false)
            }
            const searchArray= []

                for (let i = 0; i < number; i++) {
                    searchArray.push(
                    <div className='jokeContainer'>
                        <div className='jokeHeader'>
                            <img style={{height: '15px', marginTop: '4px', marginRight: '5px'}} src={BoltIcon}/>
                            <div className='jokeHeader'>
                                {`${props.newSearch[i].categories[0]?props.newSearch[i].categories[0].toUpperCase():'UNCATEGORIZED'} JOKE ` }
                            </div>
                        </div>
                        <div className='jokeContent'>
                                {props.newSearch[i].value.length> 400?`${props.newSearch[i].value.substring(0,400)}...` :props.newSearch[i].value}
                        </div>
                        <div onClick={()=>{showSingleJoke(props.newSearch[i])}} className='statsLink'>
                            <div className='statsLinkText'>
                                SEE STATS
                            </div>
                            <div className='statsLinkIconContainer'>
                                <img className='statsLinkIcon' src={RightArrow}>
                                </img>
                            </div>
                        </div>
                    </div>
                    )
                }

                setActiveJokes(searchArray)
                setCurrentCategory('search result')
                setJokesNumber(number)
        }
        else{
        var currentJokesArray= []

        for (let j = 0; j < jokes.length; j++) {

            if(jokes[j][0]==currentCategory){
                var limit= jokesNumber+6
                if(jokes[j].length<limit){
                     limit= jokes[j].length
                     setShowViewAll(false)
                }
                setJokesNumber(limit)
                for (let index = 1; index < limit; index++) {
                    currentJokesArray.push(
                        <div className='jokeContainer'>
                            <div className='jokeHeader'>
                                <img style={{height: '15px', marginTop: '4px', marginRight: '5px'}} src={BoltIcon}/>
                                <div className='jokeHeader'>
                                    {`${jokes[j][index].categories[0]?jokes[j][index].categories[0].toUpperCase():'Uncategorized'} JOKE`}
                                </div>
                            </div>
                            <div className='jokeContent'>
                                    {jokes[j][index].value.length>400?`${jokes[j][index].value.substring(0,400)}...`:jokes[j][index].value }
                            </div>
                            <div className='statsLink' onClick={()=>{showSingleJoke(jokes[j][index])}}>
                                <div className='statsLinkText'>
                                    SEE STATS
                                </div>
                                <div className='statsLinkIconContainer'>
                                    <img className='statsLinkIcon' src={RightArrow}>
                                    </img>
                                </div>
                            </div>
                        </div>
                    )
                    
                }
                
            }
        }

        if(props.newSearch.lcurrentJokesArray.length== 0){
            setActiveJokes(
            <div style={{marginTop: '30px',
                marginBottom: '50px',
                marginLeft: '10%',
                fontSize: '16px',
                textAlign: 'left',
                lineHeight: '26px',
                fontWeight: '600',
                color: '#303030'}} 
                className='noJokes'
            >
                NO JOKES FOR THIS CATEGORY YET
            </div>)
        }else{
            setActiveJokes(currentJokesArray)
        }}
    }
    
    //render jokes based on category
    useEffect(
        ()=>{
                var currentJokesArray= []
                if(currentCategory==='search result'){
                    return
                }else{
                for (let j = 0; j < jokes.length; j++) {

                    if(jokes[j][0]==currentCategory){
                        var limit= 7
                        if(jokes[j].length<limit){
                             limit= jokes[j].length
                             setShowViewAll(false)
                        }
                        setJokesNumber(limit)
                        for (let index = 1; index < limit; index++) {
                            currentJokesArray.push(
                                <div className='jokeContainer'>
                                    <div className='jokeHeader'>
                                        <img style={{height: '15px', marginTop: '4px', marginRight: '5px'}} src={BoltIcon}/>
                                        <div className='jokeHeader'>
                                            {`${jokes[j][index].categories[0]?jokes[j][index].categories[0].toUpperCase():'Uncategorized'} JOKE`}
                                        </div>
                                    </div>
                                    <div className='jokeContent'>
                                        {jokes[j][index].value.length>400?`${jokes[j][index].value.substring(0,400)}...`: jokes[j][index].value}
                                    </div>
                                    <div className='statsLink' onClick={()=>{showSingleJoke(jokes[j][index])}}>
                                        <div className='statsLinkText'>
                                            SEE STATS
                                        </div>
                                        <div className='statsLinkIconContainer'>
                                            <img className='statsLinkIcon' src={RightArrow}>
                                            </img>
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        }
                        
                    }
                }
                
                if(currentJokesArray.length== 0){
                    setActiveJokes(
                    <div style={{marginTop: '30px',
                        marginBottom: '50px',
                        marginLeft: '10%',
                        fontSize: '16px',
                        textAlign: 'left',
                        lineHeight: '26px',
                        fontWeight: '600',
                        color: '#303030'}} 
                        className='noJokes'
                    >
                        NO JOKES FOR THIS CATEGORY YET
                    </div>)
                }else{
                    setActiveJokes(currentJokesArray)
                }
             }
            
            }, [currentCategory])

            
            
            
            useEffect(
                ()=>{
                    
                    axios
                    .get(`https://api.chucknorris.io/jokes/search?query=all`)
                    .then(data=>{
                        setAllData(data.data.result)
                    })
               
                    
                axios
                    .get(`https://api.chucknorris.io/jokes/categories`)
                    .then(data=>{
                    
                    setCategoriesData(data.data)
                    })

                    }, [])
        
                    

        useEffect(
            ()=>{
                var suggestedData= []
                var suggestedResultIds= []
                var suggestedDataLimit= 6
                for (let index = 0; index < suggestedDataLimit; index++) {
                    axios
                    .get(`https://api.chucknorris.io/jokes/random`)
                    .then(data=>{
                        if(suggestedResultIds.includes(data.id)){
                            suggestedDataLimit+= 1
                            return
                        }
                        suggestedData.push(data.data)
                        suggestedResultIds.push(data.data.id)
                      
                        }
                    )
                    }
                    
                    
          
    }, [])



    






    

    useEffect(
        ()=>{
            if(categoriesData != null){
            for (let i = 0; i < categoriesData.length; i++) {
                var currentArray= []
                var currentJokeIds= []
                currentArray.push(categoriesData[i])
                  for (let j = 0; j < allData.length; j++) {
                      
                      for (let k = 0; k < allData[j].categories.length; k++) {
                          if(currentJokeIds.includes(allData[j].id)){
                              return
                          }
                          if(allData[j].categories[k]===categoriesData[i]){
                              currentArray.push(allData[j])
                              currentJokeIds.push(allData[j].id)
                          }
                      }
                  }
                  jokes.push(currentArray)
              } 
              setLoadingJokes(false)
              var randomNumbers= []
            for(let j=0; j<6;j++){
                var randomNumber= Math.floor(((Math.random()*allData.length)+(Math.random()*allData.length))/2)
                randomNumbers.push(randomNumber)
            }
            setJokesNumber(6)
            var loadedJokes= []
            if(allData != null){
            for (let i = 0; i < randomNumbers.length; i++) {
                loadedJokes.push(
                    <div className='jokeContainer'>
                        <div className='jokeHeader'>
                            <img style={{height: '15px', marginTop: '4px', marginRight: '5px'}} src={BoltIcon}/>
                            <div className='jokeHeader'>
                                {`${allData[randomNumbers[i]].categories[0]?allData[randomNumbers[i]].categories[0].toUpperCase():'UNCATEGORIZED'} JOKE ` }
                            </div>
                        </div>
                        <div className='jokeContent'>
                                {allData[randomNumbers[i]].value}
                        </div>
                        <div onClick={()=>{showSingleJoke(allData[randomNumbers[i]])}} className='statsLink'>
                            <div className='statsLinkText'>
                                SEE STATS
                            </div>
                            <div className='statsLinkIconContainer'>
                                <img className='statsLinkIcon' src={RightArrow}>
                                </img>
                            </div>
                        </div>
                    </div>
                    )
                }
    
                setActiveJokes(loadedJokes);}
            }
            }, [allData])

       
    const colors=  ['#ff5b5b', '#ff915b', '#ffbe5b', '#ffdf5b', '#8fe360', '#57e690', '#57bdec']
    const check= (category, color)=>{
        setCurrentCategory(category)
        setCurrentBg(color)
    }
    const viewAll= ()=>{
        
        if(loadViewAll=='VIEW ALL'){
            setLoadViewAll('VIEW LESS')
            setDisplayIcon('none')
            var colorPicker= 0
            const loadedCategories= []
            if(categoriesData != null){
                for (let i = 0; i < categoriesData.length; i++) {
                    loadedCategories.push(<div key={categoriesData[i]} onClick={()=>{setCurrentCategory(categoriesData[i])}} style={{backgroundColor: colors[colorPicker]}}>{`${categoriesData[i].toUpperCase()} JOKES`}</div>)
                    colorPicker+= 1
                    if (colorPicker>6){
                        colorPicker= 0
                    }
                }
                
                setCategoriesUI(loadedCategories) 
                
            }   
        }else if(loadViewAll=='VIEW LESS'){
            setLoadViewAll('VIEW ALL')
            setDisplayIcon('block')
            var colorPicker= 0
            const loadedCategories= []
            if(categoriesData != null){
                for (let i = 0; i < 7; i++) {
                    loadedCategories.push(<div key={categoriesData[i]} onClick={()=>{setCurrentCategory(categoriesData[i]);setCurrentBg(colors[colorPicker])}} style={{backgroundColor: colors[colorPicker]}}>{`${categoriesData[i].toUpperCase()} JOKES`}</div>)
                    colorPicker+= 1
                }
                setCategoriesUI(loadedCategories) 
            }
        }
             
    }
    
    const newToggleJokes=(data)=>{
        //if(props.toggle){
            setShowMultipleJokes(true)
            setSingleJokeLoaded(false)
            //props.toggle(data)
        //}
    }

   
   

    if(showMultipleJokes){
        
  return (
    <div className='HomepageBody'>
      <div>
        <div className='multipleJokesContainer'>
            <div className='multipleJokes'>
                {categoriesUI}
                <div onClick={viewAll} className='viewAllLink'>
                <div className='viewAllLinkText' >
                    {loadViewAll}
                </div>
                <img style={{display: displayIcon}} src={DownArrow}>
                </img>
            </div>
        </div>
        </div>
      </div>
      <div>
            <div style={{padding: '5px'}}>
                {`${currentCategory.toUpperCase()} JOKES`}
            </div>
            <div className='loadedJokes'>
                {activeJokes}
            </div>{showViewAll &&
            <div className='viewMoreLinkContainer' onClick={viewMoreJokes}>
                <div className='viewMoreLink' >
                    <div className='viewMoreLinkText'>
                        VIEW MORE
                    </div>
                    <div>
                        <img src={DownArrow}/>
                    </div>
                </div>
            </div>
            }
      </div>
    </div>
  );
    }

    return(
        <div>
            {  singleJokeLoaded  &&   <SingleJoke data={allData} toggle={newToggleJokes} joke={currentJoke}/>}
        </div>
    )

}

export default HomepageBody;
