import { DataTypes } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface TasksCreate {
  title: string;
  description: string;
  priority: string;
  expirationDate: Date;
  createAt: string;
  status: string;
  lastPutDate: Date;
  userCreateTask: number;
  responsiblePerson: number;
}

enum Priority {
  High = 'high',
  Middle = 'middle',
  Low = 'low',
}

enum TaskStatus {
  ToPerform = 'to perform',
  InProgress = 'in progress',
  IsDone = 'is done',
  Canceled = 'canceled',
}

@Table({ tableName: 'tasks' })
export class Tasks extends Model<Tasks, TasksCreate> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
  })
  title: string;

  @Column({
    type: DataTypes.STRING,
  })
  description: string;

  @Column({
    type: DataTypes.DATE,
  })
  expirationDate: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  createAt: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  lastPutDate: Date;

  @Column({
    type: DataTypes.ENUM(...Object.values(Priority)),
    allowNull: false,
  })
  priority: string; //enum high, middle, low

  @Column({
    type: DataTypes.ENUM(...Object.values(TaskStatus)),
    allowNull: false,
    defaultValue: TaskStatus.ToPerform,
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
  })
  userCreateTask: number;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  responsiblePerson: number;

  @BelongsTo(() => User, 'userCreateTaskId')
  userCreateTaskData: User;

  @BelongsTo(() => User, 'responsiblePersonId')
  responsiblePersonData: User;
}
