import './App.css';
import notFoundPic from './images/notfound.jpg'

function NotFound (){

    return (
        <div>
            <h1>404 Not Found</h1>
            <img  className="notFoundImage" src={notFoundPic} alt="404 not found"/>
        </div>
    )
}

export default NotFound;