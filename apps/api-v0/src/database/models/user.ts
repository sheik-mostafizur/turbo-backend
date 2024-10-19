import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  IsEmail,
  AllowNull,
  IsUUID,
  Index
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({
  tableName: 'users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @AllowNull(false)
  @Index
  @Column(DataType.STRING)
  name!: string;

  @Unique
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

}
