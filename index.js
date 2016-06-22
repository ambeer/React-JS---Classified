import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import MyHeader from './screens/App/screens/shared/components/header';
import MyFooter from './screens/App/screens/shared/components/footer';
import Home from './screens/App/screens/home/components/Home';
import Login from './screens/App/screens/login/components/login';
import SignUp from './screens/App/screens/signup/components/SignUp';
import AddList from './screens/App/screens/list/components/list';
import UserList from './screens/App/screens/list/components/individualList';
import PostAd from './screens/App/screens/postad/components/postad';
import ContactUs from './screens/App/screens/contactus/components/contactus';
import viewMyads from './screens/App/screens/list/components/viewMyads';
import LogOut from './screens/App/screens/logout/components/Logout';

import routes from './config/routes'

var App = React.createClass({
    render : function() {
        return (
            <div className="app">
                <header id="header">
                    <MyHeader />                             
                </header>
                {this.props.children}				
                <footer id="footer">
                    <MyFooter/>
                </footer>
            </div>
        );
    }
});


ReactDOM.render((
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home}/>
                <Route path="list" component={AddList}/>
                <Route path="login" component={Login}/>
                <Route path="signup" component={SignUp}/>
                <Route path="postad" component={PostAd}/>
                <Route path="contactus" component={ContactUs}/>
                <Route path="myads" component={viewMyads}/>
                <Route path="logout" component={LogOut}/>
                <Route path=":id" component={UserList}/>                
            </Route>
        </Router>
    ),
    document.getElementById('react-app')
);

export default App;