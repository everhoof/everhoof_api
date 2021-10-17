import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CreateRecordingsTable1634210009174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recordings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'filename',
            type: 'varchar',
            length: '32',
          },
          {
            name: 'filesize',
            type: 'int',
          },
          {
            name: 'preview',
            type: 'varchar',
            length: '128',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'description_short',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'description_full',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'hide',
            type: 'boolean',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recordings');
  }
}
