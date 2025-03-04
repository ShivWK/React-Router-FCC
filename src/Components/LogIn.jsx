import { useState } from 'react';
import { loginUser } from '../api';
import { useActionData, Form, redirect, useNavigation} from 'react-router-dom';

export async function loginAction({ request }) {
    const formData = await request.formData();
    let email = formData.get("email");
    let password = formData.get("password");

    try {
        let response = await loginUser({email, password});
        localStorage.setItem("isLoggedIn" , true)

        throw redirect("/host", {replace : true});
    } catch(error) {
        return error.message;
    }
}

export default function LogIn() {
    // const [loginFormData, setLoginFormData] = useState({email : '', password : ''});
    // const [status, setStatus] = useState("idle");
    // const [error, setError] = useState(null);
    const navigate = useNavigation();
    const error = useActionData();
    const isSubmitting = navigate.state === "submitting";


    // function handleSubmit(e) {
    //     e.preventDefault();
    //     setStatus("submitting");
    //     setError(null);

    //     navigate("/host", {replace : true})

    //     (async () => {
    //         try {
    //             let response = await loginUser(loginFormData);
    //             console.log(response);
    //         } 
    //         catch(error) {
    //             setError(error.message);
    //         }
    //         finally {
    //             setStatus("idel");
    //         }
    //     })();
    // }
     
    // function handleChange(e) {
    //     const {name, value} = e.target;

    //     setLoginFormData(prev => {
    //         return {
    //             ...prev,
    //             [name] : value
    //         }
    //     })
    // }
    

    return <div className="login-container">
        <h1 className='font-bold text-2xl'>LogIn to your account</h1>
         {error && <h2 className='text-red-600 font-semibold font-serif mt-1'>{error}</h2>} 
        <Form method="POST" className='login-form'>
            <input 
                type="email" 
                name="email" 
                
                placeholder='Enter Email'
                 
            />
            <input 
                type="password" 
                name="password" 
                
                placeholder='Enter Password'
                   
            />
            <button disabled={isSubmitting}>
                { isSubmitting ? "Logging..." : "LogIn"}
            </button>

        </Form>
    </div>
}