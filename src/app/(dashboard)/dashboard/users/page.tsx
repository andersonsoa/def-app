import { User, columns } from "@/app/(dashboard)/dashboard/users/columns";
import { DataTable } from "@/app/(dashboard)/dashboard/users/data-table";
import { sampleData } from "@/app/(dashboard)/dashboard/users/sample-data";
import { PageContainer } from "@/components/PageContainer";

async function getUsers() {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(sampleData);
    }, 300);
  });
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-2">Usuários</h1>

      <DataTable columns={columns} data={users} />
    </PageContainer>
  );
}
