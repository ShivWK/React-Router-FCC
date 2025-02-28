// import { hasMany } from 'miragejs';
import React, {Component} from 'react'

export default class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasError : false,
            error: null
        }
    }
    componentDidCatch(error){
        this.setState = {
            hasError : true,
            error : error
        }
    }

    render(){
        if(this.state.hasError){
            return (
                <h1 className='text-xl font-semibold absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>`Something went wrong : ${this.state.error}`</h1>
                    )   
        }else{
            return this.props.children;
        }
        
    }
}