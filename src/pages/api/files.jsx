import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    try {
        const publicDirectory = path.join(process.cwd(), 'public/img/detail-svg');
        const files = await fs.readdir(publicDirectory);
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read files' });
    }
}