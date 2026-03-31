import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteUser, getUserById } from './user-service';
import prisma from "@/shared/lib/prisma";

// Hacemos el mock (simulación) del prisma client para este test.
// Esto nos permite testear la lógica del servicio ("Server Action") sin golpear la BDD real.
vi.mock("@/shared/lib/prisma", () => ({
  default: {
    consultation: {
      deleteMany: vi.fn(),
    },
    user: {
      update: vi.fn(),
      findUnique: vi.fn(),
    }
  }
}));

describe('User Service (Integration Prisma Mock)', () => {
  // Limpiamos los "contadores" de llamadas antes de cada test para no cruzar información
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getUserById should fetch a user correctly from Prisma', async () => {
    const mockUser = { id: 'uuid-123', name: 'Test User', email: 'test@test.com' };
    
    // Le decimos a nuestro robot prisma ficticio qué debe responder
    (prisma.user.findUnique as any).mockResolvedValue(mockUser);

    const result = await getUserById('uuid-123');

    // Verificamos que se haya ejecutado el comando Prisma con los parámetros correctos
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'uuid-123' },
    });
    // Y verificamos la respuesta de la función
    expect(result).toEqual(mockUser);
  });

  it('deleteUser should delete consultations and deactivate user', async () => {
    const mockUpdatedUser = { id: 'uuid-123', isActive: false };
    
    (prisma.consultation.deleteMany as any).mockResolvedValue({ count: 5 });
    (prisma.user.update as any).mockResolvedValue(mockUpdatedUser);

    const result = await deleteUser('uuid-123');

    // Verifica que intentamos borrar las consultas del usuario
    expect(prisma.consultation.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'uuid-123' },
    });
    // Verifica que hicimos el soft-delete (isActive: false)
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'uuid-123' },
      data: { isActive: false },
    });
    expect(result).toEqual(mockUpdatedUser);
  });
});
