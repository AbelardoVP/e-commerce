import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'


import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SigninAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser as setCurrentUserAction } from './redux/user/user.actions'


class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount() {

    const { setCurrentUser } = this.props;
    console.log({ setCurrentUser })
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          console.log(snapShot.data())
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      else {
        console.log("ELSE")
        console.log(this.props)
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SigninAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDistaptchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUserAction(user))
})

export default connect(null, mapDistaptchToProps)(App);
