import { useState } from 'react';
import { loginUser } from '../api';

export default function LogIn() {
    const [loginFormData, setLoginFormData] = useState({email : '', password : ''});

    function handleSubmit(e) {
        e.preventDefault();

        (async () => {
            try {
                let response = await loginUser(loginFormData);
                console.log(response);
            } 
            catch(error) {
                console.log(error.message);
            }
        })();
    }
     
    function handleChange(e) {
        const {name, value} = e.target;

        setLoginFormData(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }
    

    return <div className="login-container">
        <h1>Enter Your Credentials to signin</h1>
        <form onSubmit={handleSubmit} className='login-form'>
            <input 
                type="email" 
                name="email" 
                onChange={handleChange} 
                placeholder='Enter Email'
                value={loginFormData.email}    
            />
            <input 
                type="password" 
                name="password" 
                onChange={handleChange} 
                placeholder='Enter Password'
                value={loginFormData.password}    
            />
            <button>SignIn</button>
        </form>
    </div>
}