import TodoList from "@/components/TodoList/TodoList"
import { Metadata } from "next"
import Title from "../components/PageTitle/PageTitle"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: "Подслушка ВолГТУ",
	description: "VSTU - Web - Lab 4",
}

export default async function Home() {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')

	if (!token) {
		redirect('/login')
	}

	return (
		<div>
			<Title title="Подслушка ВолгГТУ - Цитаты Преподов"></Title>
			<TodoList />
		</div>
	)
}