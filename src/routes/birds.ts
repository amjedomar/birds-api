import express from "express";

/**
 * @swagger
 *   tags:
 *     - name: Birds
 *       description: Operations to retrieve and manipulates birds data
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
 *           description: The bird's name.
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
 *           required:
 *             - id
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

let birdNumId = 1;

const birds = [
  {
    id: birdNumId++ + "",
    name: "Eastern bluebird",
    description:
      "The eastern bluebird is a small North American migratory thrush found in open woodlands, farmlands, and orchards",
  },
  {
    id: birdNumId++ + "",
    name: "Black-capped chickadee",
    description:
      "The black-capped chickadee is a small, nonmigratory, North American songbird that lives in deciduous and mixed forests",
  },
  {
    id: birdNumId++ + "",
    name: "Yellow-rumped warbler",
    description:
      "The yellow-rumped warbler is a regular North American bird species that can be commonly observed all across the continent",
  },
  {
    id: birdNumId++ + "",
    name: "House sparrow",
    description:
      "The house sparrow is a bird of the sparrow family Passeridae, found in most parts of the world.",
  },
];

/**
 * @swagger
 * /birds:
 *  get:
 *    tags:
 *      - Birds
 *    summary: Retrieve a list of birds
 *    description: Retrieve the names and descriptions of birds
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
router.get("/", (req, res) => {
  res.send({
    data: birds,
  });
});

/**
 * @swagger
 * /birds/{id}:
 *   get:
 *     tags:
 *       - Birds
 *     summary: Retrieve a single bird
 *     description: Retrieve the name and description of a single bird by its id
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
router.get("/:birdId", (req, res) => {
  const { birdId } = req.params;

  const bird = birds.find((bird) => bird.id === birdId);

  if (!bird) {
    return res.status(404).send("Bird not found");
  }

  res.send({
    data: bird,
  });
});

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
router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send("The posted bird data is invalid");
  }

  birds.push({
    id: birdNumId++ + "",
    name,
    description,
  });

  const bird = birds[birds.length - 1];

  res.status(200).send({
    data: bird,
  });
});

/**
 * @swagger
 * /birds/{id}:
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
router.put("/:birdId", (req, res) => {
  const { birdId } = req.params;
  const { name, description } = req.body;

  const birdIdx = birds.findIndex((bird) => bird.id === birdId);

  if (birdIdx < 0) {
    return res.status(404).send("Bird not found");
  }

  if (!name || !description) {
    return res.status(400).send("The posted bird data is invalid");
  }

  const puttedBird = {
    id: birdId,
    name,
    description,
  };

  birds[birdIdx] = puttedBird;

  res.send({
    data: puttedBird,
  });
});

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
router.delete("/:birdId", (req, res) => {
  const { birdId } = req.params;

  const birdIdx = birds.findIndex((bird) => bird.id === birdId);

  if (birdIdx < 0) {
    return res.status(404).send("Bird not found");
  }

  birds.splice(birdIdx, 1);

  res.status(204).send();
});

export default router;
