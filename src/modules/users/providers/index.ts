import { container } from 'tsyringe';

import BcryptProvider from './HashProvider/implementations/BcryptProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptProvider);