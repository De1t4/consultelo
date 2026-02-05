import RegisterForm from "@client/components/RegisterForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro - Consultelo',
  description: 'Crea tu cuenta en Consultelo',
};

export default function RegisterPage() {
  return (
    <RegisterForm />
  );
}
