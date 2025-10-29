// tests/helpers/auth.ts
import { api } from "./api";
import { makeUser } from "../factories/user-factory";
import { makeGerente } from "../factories/gerente-factory";

export async function seedUserAndLogin({
  email,
  senha = "senha123",
  role = "Gerente",
  criarPerfil = true,
}: {
  email?: string;
  senha?: string;
  role?: string;
  criarPerfil?: boolean;
} = {}) {
  const user = await makeUser({ email, senha, role } as any);
  if (criarPerfil && role === "Gerente") {
    await makeGerente(user);
  }

  const resp = await api()
    .post("/api/login")
    .send({ email: user.email, senha });

  // Asserte aqui para falhar cedo se o login quebrar
  expect(resp.status).toBe(200);
  expect(resp.type).toMatch(/json/);
  expect(resp.body).toHaveProperty("token");

  return { user, token: resp.body.token };
}
