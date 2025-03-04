import { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const [loginFormData, setLoginFormData] = useState({email : '', password : ''});
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        setStatus("submitting");
        setError(null);

        navigate("/host", {replace : true})

        (async () => {
            try {
                let response = await loginUser(loginFormData);
                console.log(response);
            } 
            catch(error) {
                setError(error.message);
            }
            finally {
                setStatus("idel");
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
        <h1 className='font-bold text-2xl'>LogIn to your account</h1>
        {error && <h2 className='text-red-600 font-semibold font-serif mt-1'>{error}</h2>}
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
            <button disabled={status === "submitting"}>
                {status === "submitting" ? "Logging in..." : "LogIn"}
            </button>
        </form>
    </div>
}