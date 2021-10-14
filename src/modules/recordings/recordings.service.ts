import { Injectable } from '@nestjs/common';
import got from 'got';
import { RecordingFile } from '@modules/recordings/types/recording';
import { Recording } from './entities/recordings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordingsService {

  constructor(
    @InjectRepository(Recording)
    private readonly recordingsRepository: Repository<Recording>
  ) { }

  async getRecordings(): Promise<RecordingFile[]> {
    const recordings = await this.recordingsRepository.find({
      order: { date: "DESC" },
      where: { hide: false }
    });

    return recordings.map<RecordingFile>(rec => ({
      desc: rec.descriptionShort,
      img: rec.preview,
      name: rec.filename,
      size: rec.filesize,
      year: rec.date.slice(0, 4)
    }));
  }

  async loadRecordingsFromLocalJson(): Promise<boolean> {
    const recordingsRaw = await got(`${process.env.RECORDINGS_URL}`).json<RecordingFile[]>();

    const recordings = recordingsRaw.map(rec => {
      const parsedDate = new Date(rec.name.replace("_LF", "").slice(0, -4)).toString();

      return this.recordingsRepository.create({
        hide: false,
        date: parsedDate, descriptionFull: "",
        descriptionShort: rec.desc,
        filename: rec.name,
        filesize: rec.size,
        preview: rec.img
      });
    });
    this.recordingsRepository.save(recordings);
    return true;
  }

}
