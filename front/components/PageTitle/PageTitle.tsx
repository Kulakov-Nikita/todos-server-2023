import ThemeSwitcher from "../Theme/ThemeSwitcher/ThemeSwitcher"
import "./PageTitle.css"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function PageTitle({ title }: { title: string }) {
	async function handleLogout() {
		'use server'
		const cookieStore = await cookies()
		cookieStore.delete('token')
		redirect('/login')
	}

	const cookieStore = await cookies()
	const isAuthenticated = cookieStore.has('token')

	return (
		<div className="page-title">
			<h1>{title}</h1>
			{isAuthenticated && (
				<button className="logout-btn" onClick={handleLogout}>
					Выйти
				</button>
			)}
			<ThemeSwitcher />
		</div>
	)
}
