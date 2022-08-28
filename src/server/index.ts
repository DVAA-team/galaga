import 'dotenv/config';

import { app } from '@/server/app';
import { port } from '@/server/config';
import { startServer } from '@/server/utils';

export default startServer(app, port);
