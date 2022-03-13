import express from 'express';
import {BirdsController} from '../controllers/BirdsController';

/**
 * @swagger
 *   tags:
 *     - name: Birds
 *       description: Operations to retrieve and manipulate birds data
 */
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateBird:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The bird's name, its string length is > 0 AND <= 255.
 *           example: Eastern bluebird
 *         description:
 *           type: string
 *           description: The bird's description.
 *           example: The eastern bluebird is a small North American migratory thrush found in open woodlands, farmlands, and orchards
 *     NewBird:
 *       allOf:
 *         - $ref: '#/components/schemas/UpdateBird'
 *         - type: object
 *           required:
 *             - name
 *             - description
 *     Bird:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The bird's Identifier
 *               example: 1
 *             createdAt:
 *               type: string
 *               description: The date of the bird's creation in ISO string format
 *               example: 2022-03-13T12:17:10.000Z
 *             updatedAt:
 *               type: string
 *               description: The date of the last update operation to the bird's data in ISO string format
 *               example: 2022-03-13T12:43:20.000Z
 *           required:
 *             - id
 *             - createdAt
 *             - updatedAt
 *         - $ref: '#/components/schemas/NewBird'
 *   parameters:
 *     birdIdParam:
 *       name: birdId
 *       in: path
 *       required: true
 *       description: The bird's identifier
 *       schema:
 *         type: string
 *         example: 1
 *   responses:
 *     NotFoundBird:
 *       description: Bird Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'The bird with the given id does not exists'
 *     InvalidBirdBody:
 *       description: Invalid Bird Data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'The request body is not a valid bird data'
 */

/**
 * @swagger
 * /birds:
 *  get:
 *    tags:
 *      - Birds
 *    summary: Retrieve a list of birds
 *    responses:
 *      200:
 *        description: A list of birds
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Bird'
 */
router.get('/', BirdsController.getBirds);

/**
 * @swagger
 * /birds/{birdId}:
 *   get:
 *     tags:
 *       - Birds
 *     summary: Retrieve a single bird
 *     parameters:
 *       - $ref: '#/components/parameters/birdIdParam'
 *     responses:
 *       200:
 *         description: A single bird data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bird'
 *       404:
 *         $ref: '#/components/responses/NotFoundBird'
 */
router.get('/:birdId', BirdsController.getBird);

/**
 * @swagger
 * /birds:
 *   post:
 *     tags:
 *       - Birds
 *     summary: Create a new bird.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBird'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bird'
 *       400:
 *         $ref: '#/components/responses/InvalidBirdBody'
 */
router.post('/', BirdsController.createBird);

/**
 * @swagger
 * /birds/{birdId}:
 *   patch:
 *     tags:
 *       - Birds
 *     summary: Update an existing bird
 *     description: Update the name or description or both of a an existing bird
 *     parameters:
 *       - name: birdId
 *         in: path
 *         required: true
 *         description: The ID of bird to update
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBird'
 *     responses:
 *       200:
 *         description: A single bird data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bird'
 *       404:
 *         $ref: '#/components/responses/NotFoundBird'
 *       400:
 *         $ref: '#/components/responses/InvalidBirdBody'
 */
router.patch('/:birdId', BirdsController.updateBird);

/**
 * @swagger
 * /birds:
 *   delete:
 *     tags:
 *       - Birds
 *     summary: Delete an existing Bird.
 *     responses:
 *       204:
 *         description: Deleted
 *       400:
 *         $ref: '#/components/responses/InvalidBirdBody'
 */
router.delete('/:birdId', BirdsController.deleteBird);

export default router;
