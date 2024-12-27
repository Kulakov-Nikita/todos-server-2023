import { CardData } from "@/components/TodoCard/CardData"

export async function getCards() {
	// const ans = await fetch("http://localhost:3030/api/users/login", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify({
	// 		email: "test1@mail.ru",
	// 		password: "123456"			  
	// 	}),
	// 	credentials: "include"
	// })
	// console.log(ans)
	// const ans2 = await fetch("http://localhost:3030/api/todos", {
	// 	credentials: "include"
	// })
	// console.log(ans2)
	// const response = await fetch("/api/cards")
	// if (!response.ok) {
	// 	throw new Error("Failed to load data")
	// } else {
	// 	return (await response.json()).cards
	// }
	const response = await await fetch("http://localhost:3030/api/todos", {
		credentials: "include"
	})
	if (!response.ok) {
		throw new Error("Failed to load data")
	} else {
		const data = await response.json()
		const cards: CardData[] = []
		for(let i = 0; i < data.length; i++) {
			const card: CardData = {
				id: data[i].id,
				title: data[i].title,
				description: data[i].desc,
				completed: data[i].completed
			}
			cards.push(card)
		}

		return cards
	}
}

export async function getCardsWithFilter(filter: string) {
	const response = await await fetch("http://localhost:3030/api/todos", {
		credentials: "include"
	})
	if (!response.ok) {
		throw new Error("Failed to load data")
	} else {
		const data = await response.json()
		const cards: CardData[] = []
		for(let i = 0; i < data.length; i++) {
			const card: CardData = {
				id: data[i].id,
				title: data[i].title,
				description: data[i].desc,
				completed: data[i].completed
			}
			if(card.completed === true && filter === "true") cards.push(card)
			if(card.completed === false && filter === "false") cards.push(card)
			if(filter === "all") cards.push(card)
		}

		return cards
	}
}

export async function getCardById(id: number) {
	const response = await await fetch("http://localhost:3030/api/todos", {
		credentials: "include"
	})
	if (!response.ok) {
		throw new Error("Failed to load data")
	} else {
		const data = await response.json()
		for(let i = 0; i < data.length; i++) {
			const card: CardData = {
				id: data[i].id,
				title: data[i].title,
				description: data[i].desc,
				completed: data[i].completed
			}
			if(card.id === id) return card
		}
	}
}

export async function editCard(newCard: CardData): Promise<void> {
	try {
		const response = await fetch(`http://localhost:3030/api/todos/${newCard.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCard),
			credentials: "include"
		})

		if (!response.ok) {
			const errorData = await response.json()
			console.error("Failed to update card with id = " + newCard.id, errorData)
			throw new Error(`Error: ${errorData.error || "Unknown error"}`)
		}
	} catch (error) {
		console.error("An error occurred while updating the card:", error)
	}
}


export async function removeCard(id: number) {
	const response = await fetch(`/api/cards/${id}`, { method: "DELETE" })

	if (!response.ok) {
		console.error("Failed to delete card with id = " + id)
	}
}

export async function createCard(newCard: CardData) {
	const cards = await getCards()
	newCard.id = cards.length + 1

	const response = await fetch(`http://localhost:3030/api/todos/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"title": newCard.title,
			"desc": newCard.description,
			"completed": newCard.completed
		}),
		credentials: "include"
	})

	if (!response.ok) {
		const errorData = await response.json()
		console.error("Failed to update card with id = " + newCard.id, errorData)
		throw new Error(`Error: ${errorData.error || "Unknown error"}`)
	}
}
