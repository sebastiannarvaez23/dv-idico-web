import coreMessagesRaw from './00-core.json' assert { type: 'json' };

type ErrorMessages = Record<
    string,
    string | { messageClient: string }
>;

const coreMessages: Record<string, string> = coreMessagesRaw;

export class HandleMessageError {
    private constructor(private entityMessages: ErrorMessages) { }

    static async create(entityMessages: ErrorMessages): Promise<HandleMessageError> {
        return new HandleMessageError(entityMessages);
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
