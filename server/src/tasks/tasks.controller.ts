import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTaskDto } from './dto/create_tasks.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { UpdateStatusDto } from './dto/update-status-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req) {
    const userId = req.user.id;
    return this.taskService.createTask(dto, userId);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.taskService.getAllTasksSortedByLastPutDate();
  }

  @UseGuards(RolesGuard)
  @Get('/group-by-date')
  async getTasksGroupByDate(@Req() req) {
    const userId = req.user.id;
    const userRole = req.user.roles;
    if (userRole.includes('admin')) {
      return await this.taskService.getTasksGroupByDateForAdmin();
    } else {
      return await this.taskService.getTasksGroupByDateForUser(userId);
    }
  }
  @Get('group-by-responsible-person/:userId')
  async getTasksGroupByResponsiblePerson(@Param('userId') userId: number) {
    return await this.taskService.getTasksGroupByResponsiblePerson(userId);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':taskId')
  getTaskById(@Param('taskId') taskId: number) {
    return this.taskService.getTasksById(taskId);
  }

  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('/:taskId')
  updateTask(@Param('taskId') taskId: number, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTaskById(taskId, dto);
  }

  @UsePipes(ValidationPipe)
  @Patch(':taskId')
  updateStatus(@Param('taskId') taskId: number, @Body() dto: UpdateStatusDto) {
    return this.taskService.updateStatusTask(taskId, dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':taskId')
  deleteTaskById(@Param('taskId') taskId: number) {
    return this.taskService.deleteTasksById(taskId);
  }
}
