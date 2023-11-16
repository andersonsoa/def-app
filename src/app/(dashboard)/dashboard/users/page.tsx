import { User, columns } from "@/app/(dashboard)/dashboard/users/columns";
import { DataTable } from "@/app/(dashboard)/dashboard/users/data-table";
import { PageContainer } from "@/components/PageContainer";

async function getUsers<T>() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}

export default async function UsersPage() {
  const users = await getUsers<User[]>();

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-2">Usuários</h1>

      <DataTable columns={columns} data={users} />
    </PageContainer>
  );
}
