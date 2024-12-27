"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import "./SingupForm.css"
import Link from "next/link"

export default function LoginForm() {
	const [hasError, setHasError] = useState<boolean>(false)
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const router = useRouter()

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value)
		setHasError(event.target.value.trim().length === 0)
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value)
		setHasError(event.target.value.trim().length === 0)
	}

	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		
		const response = await fetch("https://the-most-fucking-awesome-lab-in-the-world.ru:3030/api/users/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password			  
				}),
				credentials: "include"
			})

			if(response.ok) {
				router.push("/")
			}
			else {
				setHasError(true)
			}
	}

	return (
		<form onSubmit={handleFormSubmit} className="form-container">
			<div className="card-title-field form-input-container">
				<label htmlFor="email">E-mail</label>
				<input
					type="text"
					id="email"
					className="custom-input"
					style={{ border: hasError ? "1px solid red" : "" }}
					onChange={handleEmailChange}
				/>
			</div>

			<div className="card-title-field form-input-container">
				<label htmlFor="password">Пароль</label>
				<input
					type="text"
					id="password"
					className="custom-input"
					style={{ border: hasError ? "1px solid red" : "" }}
					onChange={handlePasswordChange}
				/>
			</div>


			<button className="custom-btn" disabled={hasError} type="submit">
				Зарегистрироваться
			</button>
			<Link href="/login" className="custom-btn">
				Авторизоваться
			</Link>
		</form>
	)
}
