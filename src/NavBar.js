import {connect} from "react-redux";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    const {currentUserRedux} = props;
    return (
        <nav className="navbar">
            <h1>Cosa Publica</h1>
            <div className="links">
                <Link to="/"  >Home</Link>
                <Link to={{ pathname:"/create", params:{type: "service"} }}
                    style={{
                        color: "white",
                        backgroundColor: '#028f1e',
                        borderRadius: '8px'
                    }}
                    
                >Publicar</Link>
                {currentUserRedux? <i className="fa fa-user-circle-o" style={{fontSize: "35px", backgroundColor:'#028f1e', borderRadius:'25px' }}></i>:''}
            </div>
        </nav>
    );
}

const mapStateToProps = (state) =>{
    return {
        currentUserRedux: state.currentUser
    }
}
export default connect(mapStateToProps)(NavBar);