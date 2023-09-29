interface Props {
  userId: number;
}
const sleep = (time: number) => new Promise((res) => setTimeout(res, time));

export async function User(props: Props) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${props.userId}`
  );
  const userData = await response.json();

  return (
    <div className="border border-zinc-200 rounded p-4 h-24">
      <p>{userData.name}</p>
      <span className="text-xs text-zinc-500">{userData.email}</span>
    </div>
  );
}
