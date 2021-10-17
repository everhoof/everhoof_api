import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CreateSongVotesTable implements MigrationInterface {
  name = 'CreateSongVotesTable1634294256668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'azura_songs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '32',
            isPrimary: true,
          },
          {
            name: 'artist',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '128',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('azura_songs');
  }
}
