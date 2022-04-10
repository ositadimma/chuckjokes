import '../Styles/Dropdown.css'
import headerImage from '../assets/assets_Homework_Front-End_01/bitmap.png'
import searchImage from '../assets/assets_Homework_Front-End_01/search-copy.png'

function Dropdown() {
  return (
    <div className='dropdown-container'>   
        <div className='pointer'>
      </div>   
       <div className='dropdown'>
            <div >
                My published jokes
            </div>
            <hr/>
            <div>
                My saved jokes
            </div>
            <hr/>
            <div>
                Account information
            </div>
            <hr/>
            <div>
                Publish new joke
            </div>
       </div>
       
    </div>
  );
}

export default Dropdown;
