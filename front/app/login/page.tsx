import { Metadata } from "next"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from "../../components/LoginForm/LoginForm"
import Title from "../../components/PageTitle/PageTitle"

export const metadata: Metadata = {
	title: "Авторизация",
	description: "VSTU - Web - Lab 4",
}

export default async function Login() {
    const cookieStore = await cookies()
	const token = cookieStore.get('token')

	if (token) {
		redirect('/')
	}

	return (
		<>
            <Title title="Авторизация"></Title>
			<LoginForm/>
		</>
	)
}
