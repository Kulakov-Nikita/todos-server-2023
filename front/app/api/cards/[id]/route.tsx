import { CardData } from "@/components/TodoCard/CardData";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "cards.json");

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Ожидание промиса

  const numericId = Number(id);

  try {
    const data = await fs.readFile(dataFilePath, "utf8");

    if (numericId) {
      const card = JSON.parse(data).find(
        (card: CardData) => card.id === numericId
      );

      if (!card) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
      }

      return NextResponse.json(card, { status: 200 });
    }
    return NextResponse.json({ error: "Wrong id" }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load cards" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const numericId = Number(id);

  try {
    const data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
    const updatedCards = data.filter(
      (card: CardData) => card.id !== numericId
    );
    await fs.writeFile(dataFilePath, JSON.stringify(updatedCards, null, 2));
    return NextResponse.json({ message: "Card deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete card" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const numericId = Number(id);

  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const cards = JSON.parse(data);

    const updatedData = await req.json();

    const index = cards.findIndex((card: CardData) => card.id === numericId);

    if (index === -1) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    cards[index] = { ...cards[index], ...updatedData };
    await fs.writeFile(dataFilePath, JSON.stringify(cards, null, 2));

    return NextResponse.json({ message: "Card updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update card" },
      { status: 500 }
    );
  }
}
