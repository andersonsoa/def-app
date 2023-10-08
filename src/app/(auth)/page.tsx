import { LoginContainer } from "@/components/LoginContainer";
import { LoginForm } from "@/app/(auth)/components/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen justify-center p-24">
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
    </main>
  );
}
