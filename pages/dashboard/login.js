import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useAuth } from "context/AuthContext"
import Layout from 'components/Layout'
import Link from 'next/link'
import { useRouter } from "next/router"
import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence  } from "firebase/auth"
import { auth } from 'utils/firebase'

const LoginPage = ({ site }) => {
  const methods = useForm({ mode: "onBlur" })
  const { logIn } = useAuth()
  const router = useRouter()

  const [showLogin] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password)
      
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...

          // New sign-in will be persisted with session persistence.
          signInWithEmailAndPassword(auth, data.email, data.password) // eslint-disable-line

          return router.push('/dashboard')

        })
        .catch((error) => {
          // Handle Errors here.
          console.log(error)
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })


    } catch (error) {
      console.log(error.message)
    }
  }

  const Content = () => {
    if(showLogin) return (
      <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">Log In</h2>
      <FormProvider {...methods}>
        <form action="" className="w-80 mx-auto pb-12 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">submit</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>

    )

    return <Link href="/dashboard">Dashboard</Link>
  }

  return (
    <Layout site={site}>
      <Layout.Main>
        <Content />
      </Layout.Main>
    </Layout>
  )
}

export default LoginPage