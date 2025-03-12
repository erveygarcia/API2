import path from 'path';
import { Router } from 'express';
const router = Router();
// TODO: Define route to serve index.html
router.get('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});
export default router;
