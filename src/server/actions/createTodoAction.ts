export async function createTodo(form: FormData) {
  "use server";

  const todo = form.get("todo");
  console.log({ todo });
}
