import { Router, Request, Response } from 'express';
import { auth as authMiddleware } from '../middleware/auth';
import { admin as adminMiddleware } from '../middleware/admin';
import { messages } from '../utility/messages';
const Filters = require('../models/').filters;
const Paintings = require('../models').paintings;
const Favorites = require('../models').favorites;
const router = new Router();

router.get('/getFilters', async (req: Request, res: Response, next) => {
    try {
        const filters = await Filters.findAll();
        if (!filters) {
            return res.status(400).send({ message: 'Geen filters gevonden' });
        }
        return res.status(200).send({
            message: 'Succesfully received filters',
            filters: filters,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: messages.serverError });
    }
});

router.get('/getPaintings', async (req: Request, res: Response, next) => {
    try {
        const paintings = await Paintings.findAll({
            where: { isApproved: true },
        });
        const filters = await Filters.findAll();
        return res.status(200).send({
            message: 'Alle schilderijen opgehaald',
            paintings: paintings,
            filters: filters,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: messages.serverError });
    }
});

router.get('/getFavorites', async (req: Request, res: Response, next) => {
    try {
        const favorites = await Favorites.findAll({
            include: [{ model: Paintings }],
        });
        return res.status(200).send({
            message: 'Alle schilderijen opgehaald',
            favorites: favorites,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: messages.serverError });
    }
});

router.post(
    '/postPainting',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { painting } = req.body;
            if (!painting) return;
            const newPainting = await Paintings.create({ painting });
            return res
                .status(200)
                .send({ message: messages.serverError }, newPainting);
        } catch (error) {
            console.log(error);
        }
    },
);

module.exports = router;
