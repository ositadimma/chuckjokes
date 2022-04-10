import '../Styles/Footer.css'
import FooterImage from '../assets/assets_Homework_Front-End_01/bitmap_2.png'
import PathIcon from '../assets/assets_Homework_Front-End_01/path.png'



function Footer() {
  return (
    <div >      
       <div className='footer' style={{backgroundImage: `url(${FooterImage})`}}>
           <div className='footer-body'>
                <div className='footer-text'>
                        GOT JOKES? GET PAID FOR SUBMITTING!
                </div>
                <div className='footer-link'>
                    <div>
                        SUBMIT JOKE
                    </div> 
                    <div>
                        <img src={PathIcon}/>
                    </div>
                </div>
           </div>
       </div>
    </div>
  );
}

export default Footer;
