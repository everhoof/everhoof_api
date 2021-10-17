import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSongVotesTable1634294256670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'song_votes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'azura_song_id',
            type: 'varchar',
            length: '32',
          },
          {
            name: 'rating',
            type: 'int',
          },
          {
            name: 'ip',
            type: 'varchar',
            length: '40',
          },
          {
            name: 'ts',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'song_votes',
      new TableForeignKey({
        name: 'song_votes_song_id_foreign',
        columnNames: ['azura_song_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'azura_songs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('song_votes', 'song_votes_song_id_foreign');
    await queryRunner.dropTable('song_votes');
  }
}
