import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Bird } from '../entities/Bird';

const dbConnection = getConnection();

const birdsRepo = dbConnection.getRepository(Bird);

// let birdNumId = 1;

// const birds = [
//   {
//     id: birdNumId++ + '',
//     name: 'Eastern bluebird',
//     description:
//       'The eastern bluebird is a small North American migratory thrush found in open woodlands, farmlands, and orchards',
//   },
//   {
//     id: birdNumId++ + '',
//     name: 'Black-capped chickadee',
//     description:
//       'The black-capped chickadee is a small, nonmigratory, North American songbird that lives in deciduous and mixed forests',
//   },
//   {
//     id: birdNumId++ + '',
//     name: 'Yellow-rumped warbler',
//     description:
//       'The yellow-rumped warbler is a regular North American bird species that can be commonly observed all across the continent',
//   },
//   {
//     id: birdNumId++ + '',
//     name: 'House sparrow',
//     description:
//       'The house sparrow is a bird of the sparrow family Passeridae, found in most parts of the world.',
//   },
// ];

export abstract class BirdsController {
  static async getBirds(req: Request, res: Response) {
    const birds = await birdsRepo.find();

    return res.send({ data: birds });
  }

  static async getBird(req: Request, res: Response) {
    const { birdId } = req.params;

    const bird = await birdsRepo.findOne({
      where: {
        id: birdId,
      },
    });

    if (!bird) {
      return res.status(404).send({
        error: {
          message: 'Bird not found',
        },
      });
    }

    return res.send({
      data: bird,
    });
  }

  static async createBird(req: Request, res: Response) {
    const { name, description } = req.body;

    if (
      typeof name !== 'string' ||
      name.length === 0 ||
      name.length >= 255 ||
      typeof description !== 'string'
    ) {
      return res.status(400).send({
        error: {
          message: 'The posted bird data is invalid',
        },
      });
    }

    const bird = await birdsRepo.save({
      name,
      description,
    });

    return res.status(200).send({
      data: bird,
    });
  }

  static async updateBird(req: Request, res: Response) {
    const { birdId } = req.params;
    const { name, description } = req.body;

    if (
      (typeof name !== 'string' && typeof name !== 'undefined') ||
      (typeof name === 'string' && (name.length === 0 || name.length >= 255)) ||
      (typeof description !== 'string' && typeof description !== 'undefined')
    ) {
      return res.status(400).send({
        error: {
          message: 'The patched bird data is invalid',
        },
      });
    }

    await birdsRepo.update(
      {
        id: birdId,
      },
      {
        name,
        description,
      },
    );

    const bird = await birdsRepo.findOne({
      where: {
        id: birdId,
      },
    });

    if (!bird) {
      return res.status(404).send({
        error: {
          message: 'Bird not found',
        },
      });
    }

    return res.send({
      data: bird,
    });
  }

  static async deleteBird(req: Request, res: Response) {
    const { birdId } = req.params;

    const deleteResult = await birdsRepo.delete({
      id: birdId,
    });

    if (deleteResult.affected === 0) {
      return res.status(404).send({
        error: {
          message: 'Bird not found',
        },
      });
    }

    return res.status(204).send();
  }
}
