import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Bird } from '../entities/Bird';

const dbConnection = getConnection();

const birdsRepo = dbConnection.getRepository(Bird);

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
          message: 'The bird with the given id does not exists',
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
      name.length > 255 ||
      typeof description !== 'string'
    ) {
      return res.status(400).send({
        error: {
          message: "The request's body is invalid",
        },
      });
    }

    const bird = await birdsRepo.save({
      name,
      description,
    });

    return res.status(201).send({
      data: bird,
    });
  }

  static async updateBird(req: Request, res: Response) {
    const { birdId } = req.params;
    const { name, description } = req.body;

    if (
      (typeof name !== 'string' && typeof name !== 'undefined') ||
      (typeof name === 'string' && (name.length === 0 || name.length > 255)) ||
      (typeof description !== 'string' && typeof description !== 'undefined')
    ) {
      return res.status(400).send({
        error: {
          message: "The request's body is invalid",
        },
      });
    }

    const updatedData: {
      name?: string;
      description?: string;
    } = {};

    if (typeof name !== 'undefined') updatedData.name = name;
    if (typeof description !== 'undefined')
      updatedData.description = description;

    if (Object.entries(updatedData).length > 0) {
      await birdsRepo.update(
        {
          id: birdId,
        },
        updatedData,
      );
    }

    const bird = await birdsRepo.findOne({
      where: {
        id: birdId,
      },
    });

    if (!bird) {
      return res.status(404).send({
        error: {
          message: 'The bird with the given id does not exists',
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
          message: 'The bird with the given id does not exists',
        },
      });
    }

    return res.status(204).send();
  }
}
