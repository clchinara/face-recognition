import React from 'react'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    // Functions triggered by <input>'s onChange

    onNameChange = (event) => {
        this.setState({name: event.target.value.trim()});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value.trim()});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        if (!(this.state.name) || !(this.state.email) || !(this.state.password)) {
            alert('Field cannot be empty');
        }
        else {
            fetch('https://fierce-temple-27744.herokuapp.com/register', {
                method: 'post', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(newUserData => {
                console.log(newUserData)
                // Able to log in
                if (newUserData.email){
                    this.props.loadUser(newUserData);
                    this.props.onRouteChange('home');
                }
                // An error was thrown
                else {
                    alert('Email already exists');
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
                            <legend className="f3 fw6 ph0 mh0 center">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 mw-50" type="text" name="name"  id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 mw-50" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 mw-50" type="password" name="password"  id="password" />
                            </div>
                        </fieldset>
                        <div className="tc">
                            <input 
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-white hover-bg-black hover-white grow pointer f6 dib" 
                                type="submit" 
                                value="Register" 
                            />
                        </div>
                        <div className="lh-copy mt4 tc">
                            <span className="f6 black db"> 
                                Already have an account? 
                                <p onClick={() => onRouteChange('signin')} className="pointer f6 link dim black db" style={{display:'inline'}}> 
                                    <b> Sign in </b> 
                                </p> 
                            </span>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;