import { DataTypes } from 'sequelize';
import { Model, Table, Column } from 'sequelize-typescript';
import { BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreate {
  value: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreate> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
