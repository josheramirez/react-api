import NavBar from './NavBar';
import Home from './Home';
import UsersList from './UsersList';
import PostList from './PostList';
import Post from './Post';
import PostDetails from './PostDetails';

import './App.css';
import Login from './Login';
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
//hooks
import { useState, useEffect } from 'react';
import TargetDetails from './TargetDetails';

function App(props) {
  const [users, setUsers] = useState([
    {id:'1', name:'joshe', email:'joshe@gmail.com', phone:'123123123'},
    {id:'2', name:'paty', email:'paty@gmail.com', phone:'123123123'},
    {id:'3', name:'carlos', email:'carlo@gmail.com', phone:'123123123'}
  ]);

  // const [posts, setPosts] = useState([
  //   {id:'1', title:'post_1', content:'description of this post', user_id:'3'},
  //   {id:'2', title:'post_2', content:'description of this post', user_id:'2'},
  //   {id:'3', title:'post_3', content:'description of this post', user_id:'2'},
  //   {id:'4', title:'post_4', content:'description of this post', user_id:'3'},
  //   {id:'5', title:'post_5', content:'description of this post', user_id:'1'}
  // ])

  const [posts, setPosts] = useState(null);


  const [currentUserLocal, setCurrentUserLocal] = useState(null)
  const [isPending, setIsPending] = useState(false)

  // check if user has open sesion in localStorage and save in redux
  useEffect(() => {
    setIsPending(true);
    // get logged user
    const loggedUserJson = localStorage.getItem('currentUser');
    if (loggedUserJson) {
        const localStoreUser = JSON.parse(loggedUserJson);
        setCurrentUserLocal(localStoreUser);
        //past user to store redux
        props.updateCurrentUser(localStoreUser);
    }

    // get last post from db
    fetch('http://localhost:3000/posts',{
      method:'GET',
      headers:{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then((res)=>{
        console.log('response from rails: get all post');
        setIsPending(false);

        // console.log(res);
        // console.log(res.length);
        setPosts(res);
    })

  }, [])


  return (



    <Router>
      <div className="App">
        <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script src="../public/bootstrap.min.js"></script>
        <script src="../public/jquery-1.11.1.min.js"></script>
        <NavBar></NavBar>
        {/* <Home></Home> */}
        <div className="content">
          <Switch>
            <Route exact path="/">
             <PostList posts={posts}></PostList>

            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/create" render={(props) => <Home myProp="value" {...props}/>}/>
            {/* <Route path='/create'> */}
             {/* <Home></Home> */}
              {/* <Post></Post> */}
            {/* </Route> */}
            <Route path='/post/:id'>
              <PostDetails></PostDetails>
            </Route>
            <Route path='/target/:id'>
              <TargetDetails></TargetDetails>
            </Route>
          </Switch>
        </div>
        {/* <Home></Home>
        <UsersList users={users}></UsersList> */}
      </div>
    </Router>
  );
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

export default connect(mapStateToProps,mapDispatchToProps)(App);
