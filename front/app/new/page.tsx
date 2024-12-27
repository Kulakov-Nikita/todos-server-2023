import NewCardForm from "@/components/NewCardForm/NewCardForm"
import PageTitle from "@/components/PageTitle/PageTitle"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Пишем донос",
	description: "VSTU - Web - Lab 4",
}

export default function NewCard() {
	return (
		<>
			<Link href="/">
				<button className="small-custom-btn">Отказаться</button>
			</Link>
			<PageTitle title="Пишем новый донос" />
			<NewCardForm />
		</>
	)
}
