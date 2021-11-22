import { useState } from "react/cjs/react.development";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState('false');
    const [currentUserLocal, setCurrentUserLocal] = useState(null)

    const { currentUserRedux } = props;

    const history = useHistory();

    // useEffect(() => {
    //     const loggedUserJson = localStorage.getItem('currentUser');
    //     if (loggedUserJson) {
    //         const localStoreUser = JSON.parse(loggedUserJson);
    //         setCurrentUserLocal(localStoreUser);
    //         props.updateCurrentUser(localStoreUser);
    //     }
    // }, [])

    const handleSubmit=(e)=>{
        e.preventDefault();
        const credentials={'user':{email, password}}
        console.log(credentials)
        setIsPending(true);
        
        fetch('http://localhost:3000/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then((res)=>{
            console.log('response from rails');
            setIsPending(false);
            console.log(res.status);
            if(res.status==='created'){
                console.log('user logged');
                console.log(res.user);
                props.updateCurrentUser(res.user);
                // save user en localStore
                localStorage.setItem('currentUser', JSON.stringify(res.user));
                history.push('/');
            }
        })
    }

    const handleLogout = (e) => {
        e.preventDefault();
        props.updateCurrentUser(null);
        localStorage.setItem('currentUser',[]);
    }

    if(currentUserRedux){
        console.log(currentUserLocal,currentUserRedux)
        return(
            <div className="logout">
                <button onClick={handleLogout}>Log Out</button>
            </div>
        )
      } else{
        console.log(currentUserLocal,currentUserRedux)
        return(
            <div className="login-container animated fadeInDown bootstrap snippets bootdeys">
                <div className="loginbox bg-white">
                    <div className="loginbox-title">SIGN IN</div>
                    <div className="loginbox-social">
                        <div className="social-title ">Connect with Your Social Accounts</div>
                        <div className="social-buttons">
                            <a href="" className="button-facebook">
                                <i className="social-icon fa fa-facebook"></i>
                            </a>
                            <a href="" className="button-twitter">
                                <i className="social-icon fa fa-twitter"></i>
                            </a>
                            <a href="" className="button-google">
                                <i className="social-icon fa fa-google-plus"></i>
                            </a>
                        </div>
                    </div>
                    <div className="loginbox-or">
                        <div className="or-line"></div>
                        <div className="or">OR</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="loginbox-textbox">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={email}
                                placeholder="Username"
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginbox-textbox">
                            <input 
                                type="text" 
                                className="form-control"
                                value={password}
                                placeholder="Password"
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <div className="loginbox-forgot">
                            <a href="">Forgot Password?</a>
                        </div>
                        <div className="loginbox-submit">
                            <input type="submit" className="btn btn-primary btn-block" value="Login"/>
                        </div>
                    </form>
                    <div className="loginbox-signup">
                        <a href="#register.html">Sign Up With Email</a>
                    </div>
                </div>
                <div className="logobox">
                </div>
            </div>
        ); 
      };

}

const mapStateToProps = (state) =>{
    return {
        currentUserRedux: state.currentUser
    }
}
const mapDispatchToProps = (distpach) => {
    return {
        updateCurrentUser: (currentUser) => { distpach({type: 'UPDATE_CURRENT_USER', currentUser: currentUser})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)