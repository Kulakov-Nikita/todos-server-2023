import { Metadata } from "next"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SingupForm from "../../components/SingupForm/SingupForm"
import Title from "../../components/PageTitle/PageTitle"

export const metadata: Metadata = {
	title: "Регистрация",
	description: "VSTU - Web - Lab 4",
}

export default async function Singip() {
    const cookieStore = await cookies()
	const token = cookieStore.get('token')

	if (token) {
		redirect('/')
	}

	return (
		<>
            <Title title="Регистрация"></Title>
			<SingupForm/>
		</>
	)
}
