import React from 'react'

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // Functions triggered by <input>'s onChange

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value.trim()});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        if (!(this.state.signInEmail) || !(this.state.signInPassword)) {
            alert('Field cannot be empty');
        }
        else {
            fetch('https://fierce-temple-27744.herokuapp.com/signin', {
                method: 'post', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(userData => {
                // Check if user exists
                if (userData.id){
                    this.props.loadUser(userData);
                    this.props.onRouteChange('home');
                }
                // If error occurs
                else if (userData.statusCode) {
                    if (userData.statusCode === '401') {
                        alert('Wrong email or password');
                    }
                    else {
                        alert('User does not exist');
                    }
                }
            })
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="animated animatedFadeInUp fadeInUp shadow-4 br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center tl pa3 mv6 mh3" style={{width:'85%', height:'40%'}}>
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                        </fieldset>
                        <div className="tc">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black grow bg-white pointer f6 dib hover-bg-black hover-white" 
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt4 tc">
                            <span className="f6 black db"> Don't have an account? <p onClick={() => onRouteChange('register')} className="pointer f6 link dim black db" style={{display:'inline'}}> <b> Register </b> </p> </span>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;