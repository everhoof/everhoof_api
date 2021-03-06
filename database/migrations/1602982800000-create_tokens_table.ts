import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTokensTable1602982800000 implements MigrationInterface {
  name = 'CreateTokensTable1602982800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            width: 10,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'value',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'owner_id',
            type: 'int',
            unsigned: true,
            width: 10,
          },
          {
            name: 'created_at',
            type: 'datetime',
            width: 6,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'expires_at',
            type: 'datetime',
            width: 6,
            isNullable: true,
          },
          {
            name: 'used_at',
            type: 'datetime',
            width: 6,
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'tokens',
      new TableForeignKey({
        name: 'tokens_foreign_owner_id',
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tokens', 'tokens_foreign_owner_id');
    await queryRunner.dropTable('tokens');
  }
}
