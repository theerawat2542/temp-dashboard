"use server";

export async function getTestData(id: number) {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  ).then((res) => res.json());

  return data;
}
