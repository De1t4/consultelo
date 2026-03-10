import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getErrorMessage } from "./error-message-prisma";

export type ActionResponse<T> =
  | { data: T; error: null; success: true }
  | { data: null; error: string; success: false };

type Options<T> = {
  actionFn: () => Promise<T>;
};

const executeAction = async <T>({
  actionFn,
}: Options<T>): Promise<ActionResponse<T>> => {
  try {
    const data = await actionFn();
    return { data, error: null, success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    const message = getErrorMessage(error);
    console.error("Action Error:", message);
    return { data: null, error: message, success: false };
  }
};

export { executeAction };
