import { createToken as createJwtToken } from "../auth/jwt";

export const createToken = async (payload: Record<string, unknown>) => {
    return await createJwtToken(payload);
};