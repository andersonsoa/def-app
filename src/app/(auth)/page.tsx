import { LoginContainer } from "@/components/LoginContainer";

export default function Login() {
  return (
    <main className="flex min-h-screen justify-center p-24">
      <LoginContainer>
        <form className="p-8 space-y-2 bg-zinc-50 ring-1 ring-zinc-300 shadow">
          <label className="block">
            <span className="text-xs text-zinc-600">e-mail</span>
            <input
              type="text"
              className="w-full px-2 py-1 bg-zinc-50 shadow ring-1 ring-zinc-300 outline-none"
              placeholder="foo@example.com"
            />
          </label>

          <label className="block">
            <span className="text-xs text-zinc-600">password</span>
            <input
              type="password"
              className="w-full px-2 py-1 bg-zinc-50 shadow ring-1 ring-zinc-300 outline-none"
            />
          </label>
        </form>
      </LoginContainer>
    </main>
  );
}
