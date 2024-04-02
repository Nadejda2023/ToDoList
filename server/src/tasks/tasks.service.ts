import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { CreateTaskDto } from './dto/create_tasks.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { UpdateStatusDto } from './dto/update-status-task.dto';
import { Op } from 'sequelize';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private taskRepository: typeof Tasks) {}

  async createTask(dto: CreateTaskDto, userId: number) {
    const task = await this.taskRepository.create({
      ...dto,
      userCreateTask: userId,
    });
    return task;
  }

  async getAllTasks() {
    const tasks = await this.taskRepository.findAll({ include: { all: true } });
    return tasks;
  }

  async getAllTasksSortedByLastPutDate() {
    return await this.taskRepository.findAll({
      order: [['lastPutDate', 'DESC']],
    });
  }

  async getTasksById(taskId: number) {
    const task = await this.taskRepository.findByPk(taskId);
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }
    return task;
  }

  async updateTaskById(taskId: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findByPk(taskId);
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    task.title = dto.title;
    task.description = dto.description;
    task.priority = dto.priority;
    task.expirationDate = dto.expirationDate;
    task.createAt = dto.createAt;
    task.lastPutDate = dto.lastPutDate;
    task.status = dto.status;
    task.userCreateTask = task.userCreateTask;
    task.responsiblePerson = dto.responsiblePerson;

    await task.save();
  }
  async updateStatusTask(taskId: number, dto: UpdateStatusDto) {
    const task = await this.taskRepository.findByPk(taskId);
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    task.status = dto.status;

    await task.save();
  }

  async getTasksGroupByDateForUser(userId: number) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayTasks = await this.getTasksForUserAndDateRange(
      userId,
      today,
      tomorrow,
    );
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekTasks = await this.getTasksForUserAndDateRange(
      userId,
      tomorrow,
      nextWeek,
    );

    const futureTasks = await this.taskRepository.findAll({
      where: {
        responsiblePerson: userId,
        expirationDate: { [Op.gte]: nextWeek },
      },
      order: [['lastPutDate', 'DESC']],
    });

    return {
      today: todayTasks,
      nextWeek: nextWeekTasks,
      future: futureTasks,
    };
  }

  async getTasksGroupByDateForAdmin() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayTasks = await this.taskRepository.findAll({
      where: {
        expirationDate: { [Op.gte]: today, [Op.lt]: tomorrow },
      },
      order: [['lastPutDate', 'DESC']],
    });

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const nextWeekTasks = await this.taskRepository.findAll({
      where: {
        expirationDate: { [Op.gte]: tomorrow, [Op.lt]: nextWeek },
      },
      order: [['lastPutDate', 'DESC']],
    });

    const futureTasks = await this.taskRepository.findAll({
      where: {
        expirationDate: { [Op.gte]: nextWeek },
      },
      order: [['lastPutDate', 'DESC']],
    });

    return {
      today: todayTasks,
      nextWeek: nextWeekTasks,
      future: futureTasks,
    };
  }

  private async getTasksForUserAndDateRange(
    userId: number,
    startDate: Date,
    endDate: Date,
  ) {
    return await this.taskRepository.findAll({
      where: {
        responsiblePerson: userId,
        expirationDate: { [Op.gte]: startDate, [Op.lt]: endDate },
      },
      order: [['lastPutDate', 'DESC']],
    });
  }

  async deleteTasksById(taskId: number) {
    const task = await this.taskRepository.findByPk(taskId);
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    await task.destroy();
  }
  async getTasksGroupByResponsiblePerson(userId: number) {
    const tasksGroupedByResponsiblePerson = await this.taskRepository.findAll({
      where: {
        responsiblePerson: userId,
      },
      group: [
        'id',
        'title',
        'description',
        'expirationDate',
        'createAt',
        'lastPutDate',
        'priority',
        'status',
        'userCreateTask',
        'responsiblePerson',
      ],
      order: [['lastPutDate', 'DESC']],
    });

    return tasksGroupedByResponsiblePerson;
  }
}
