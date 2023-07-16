import { hash, compare } from 'bcrypt';

import IHashProvider from '../models/IHashProvider';

class BcryptProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }

  public async compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}

export default BcryptProvider;