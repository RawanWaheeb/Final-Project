import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { userContext } from '../../../Context/User.context'
import toast from 'react-hot-toast'

export default function FormContact() {
    const { register, handleSubmit, formState, reset } = useForm()
    const { errors } = formState
    const { token } = useContext(userContext)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    async function submit(data) {
        if (!token) {
            toast.error("You must be logged in to contact us!");
            return;
        }

        try {
            const result = await axios.post("http://13.51.15.15/api/contact/", data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            setSuccessMessage("Your message has been sent successfully!")
            setErrorMessage('')  
            console.log(result)
            reset();  
        } catch (e) {
            setErrorMessage("Failed to send message. Please try again.")
            setSuccessMessage('')  
            console.log(e)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center w-full">
                <div className="mb-6 md:mb-8 text-center">
                    <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
                        Contact Us
                    </h4>
                    <div className="h-1 w-16 md:w-24 bg-[#2E5B41] mx-auto" />
                </div>

                <form onSubmit={handleSubmit(submit)} className="w-full max-w-[400px] space-y-4 md:space-y-6">
                    <input 
                        {...register("name", { required: "This Field is Required" })}
                        type="text"
                        placeholder="Your Name"
                        className="w-full rounded-xl bg-[#F4F4F4] border border-gray-300 h-12 p-3 text-sm md:text-base focus:border-primary focus:outline-none"
                    />
                    {errors?.name && <p className='text-red-500'> {errors?.name?.message} </p>}  

                    <input
                        {...register("email", { required: "This Field is Required" })}
                        type="email"
                        placeholder="Your Email"
                        className="w-full rounded-xl bg-[#F4F4F4] border border-gray-300 h-12 p-3 text-sm md:text-base focus:border-primary focus:outline-none"
                    />
                    {errors?.email && <p className='text-red-500'> {errors?.email?.message} </p>}  

                    <input
                        {...register("phone", { required: "This Field is Required" })}
                        type="tel"
                        placeholder="Your Phone"
                        className="w-full rounded-xl bg-[#F4F4F4] border border-gray-300 h-12 p-3 text-sm md:text-base focus:border-primary focus:outline-none"
                    />
                    {errors?.phone && <p className='text-red-500'> {errors?.phone?.message} </p>}  

                    <textarea
                        {...register("message", { required: "This Field is Required" })}
                        placeholder="Message"
                        className="w-full rounded-xl bg-[#F4F4F4] border border-gray-300 min-h-[120px] md:min-h-[160px] resize-none p-3 text-sm md:text-base focus:border-primary focus:outline-none"
                    />
                    {errors?.message && <p className='text-red-500'> {errors?.message?.message} </p>}  

                    {successMessage && <p className='text-green-500'>{successMessage}</p>}
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#2E5B41] hover:bg-[#234732] text-white h-12 text-base md:text-lg rounded-xl transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </>
    )
}
