// tests/factories/gerente-factory.ts
import Gerente from "../../src/models/gerente-model";
import type User from "../../src/models/user-model";

export async function makeGerente(user: User, attrs?: Partial<Gerente>) {
  return Gerente.create({
    userId: user.id,
    nome: attrs?.nome ?? user.nome,
  } as any);
}
