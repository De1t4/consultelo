import { isRedirectError } from "next/dist/client/components/redirect-error";
import { STATUS_CODE } from "../constants/status-response";
import { getErrorMessage } from "./error-message-prisma";

export type ActionResponse<T> =
  | { data: T; error: null; success: true; status?: number }
  | { data: null; error: string; success: false; status?: number };

type Options<T> = {
  actionFn: () => Promise<T>;
};

const executeAction = async <T>({
  actionFn,
}: Options<T>): Promise<ActionResponse<T>> => {
  try {
    const data = await actionFn();
    return { data, error: null, success: true, status: STATUS_CODE.OK };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    const message = getErrorMessage(error);
    console.error("Action Error:", message);
    return {
      data: null,
      error: message,
      success: false,
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
    };
  }
};

export { executeAction };
