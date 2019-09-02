// Styles
import "../styles/index.css";
import "../styles/form.css";
import "../styles/button.css";

// Fontawesome icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Index() {
    return (<div className="container">
        <nav>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Create Account</span>
        </nav>
        <form>
            <div className="formWrapper">
                <input placeholder="Fist Name" />
            </div>
            <div className="formWrapper">
                <input placeholder="Last Name" />
            </div>
            <div className="formWrapper">
                <input placeholder="Email" />
            </div>
            <div className="formWrapper">
                <input placeholder="Default Address 1" />
            </div>
            <div className="formWrapper">
                <input placeholder="Default Address 2" />
            </div>
            <div className="formWrapper">
                <input placeholder="City" />
            </div>
            <div className="formWrapper">
                <input placeholder="Zip" />
            </div>
            <div className="formWrapper">
                <input placeholder="State" />
            </div>
        </form>
        <button className="button button-primary">
            Create Account
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    </div>)
}
  
export default Index