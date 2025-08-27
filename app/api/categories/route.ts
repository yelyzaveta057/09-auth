import { NextResponse } from "next/server";
import { api } from "../api";

export async function GET() {
  const { data } = await api("/categories");

  if (data) {
    // Повертаємо те, що відповів бекенд через метод json
    return NextResponse.json(data);
  }

  // У випадку помилки — повертаємо обʼєкт з помилкою
  return NextResponse.json(
    { error: "Failed to fetch categories" },
    { status: 500 }
  );
}