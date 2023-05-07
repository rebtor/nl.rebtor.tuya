import { TuyaTokensSave, TuyaTokenStorInterface } from '../interfaces';
declare class MemoryStore implements TuyaTokenStorInterface {
    private tokens;
    setTokens(tokens: TuyaTokensSave): Promise<boolean>;
    getAccessToken(): Promise<string | undefined>;
    getRefreshToken(): Promise<string | undefined>;
}
export default MemoryStore;
export { MemoryStore, };
