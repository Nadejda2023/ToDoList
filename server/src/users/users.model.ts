import { DataTypes } from 'sequelize';
import { Model, Table, Column, HasMany } from 'sequelize-typescript';
import { BelongsToMany } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Tasks } from 'src/tasks/tasks.model';

interface UserCreate {
  loginOrEmail: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreate> {
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
  firstName: string;

  @Column({
    type: DataTypes.STRING,
  })
  lastName: string;

  @Column({
    type: DataTypes.STRING,
  })
  middleName: string;

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  loginOrEmail: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Tasks)
  tasks: Tasks[];
}
