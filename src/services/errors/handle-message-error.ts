import { ErrorNamespace } from "./error-namespace.enum";
import coreMessagesRaw from './00-core.json' assert { type: 'json' };


type ErrorMessages = Record<
    string,
    string | { messageClient: string }
>;

const coreMessages: Record<string, string> = coreMessagesRaw;

export class HandleMessageError {
    private entityMessages: ErrorMessages = {};

    private constructor(private namespace: ErrorNamespace, entityMessages: ErrorMessages) {
        this.entityMessages = entityMessages;
    }

    static async create(namespace: ErrorNamespace): Promise<HandleMessageError> {
        try {
            const module = await import(`./${namespace}.json`, { assert: { type: 'json' } });
            return new HandleMessageError(namespace, module.default);
        } catch {
            console.warn(`Archivo de errores no encontrado para la entidad: ${namespace}`);
            return new HandleMessageError(namespace, {});
        }
    }

    handle(error: any): never {
        const internalCode = error?.response?.data?.errors?.[0]?.internalCode;
        const fallbackMessage = error?.response?.data?.errors?.[0]?.message ?? 'Ha ocurrido un error desconocido';

        if (internalCode) {
            const entityMsg = this.entityMessages[internalCode];
            const coreMsg = coreMessages[internalCode as keyof typeof coreMessages];
            console.log({ coreMsg, entityMsg });

            if (typeof entityMsg === 'string') throw new Error(entityMsg);
            if (typeof entityMsg === 'object' && entityMsg.messageClient) throw new Error(entityMsg.messageClient);
            if (typeof coreMsg === 'string') throw new Error(coreMsg);
        }

        throw new Error(fallbackMessage);
    }
}