import { LoginForm } from "@/app/(auth)/login/components/LoginForm";
import { LoginContainer } from "@/components/LoginContainer";

export default function Login() {
  return (
    <main className="flex min-h-screen justify-center p-24">
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
    </main>
  );
}
