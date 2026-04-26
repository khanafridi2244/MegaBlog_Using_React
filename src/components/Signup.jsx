import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in-up">
        <div className='mx-auto w-full max-w-lg bg-bg-card rounded-2xl p-10 shadow-card border border-border'>
            <div className="mb-6 flex justify-center">
                <span className="inline-block w-full max-w-[120px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-text-primary">
                Create your account
            </h2>
            <p className="mt-2 text-center text-base text-text-secondary">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary hover:text-primary-hover transition-colors duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && (
                <p className="text-danger mt-6 text-center bg-danger-light py-2 px-4 rounded-lg text-sm">
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit(create)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup

