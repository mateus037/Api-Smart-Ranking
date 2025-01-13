import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(CreatePlayerDto.name)

  constructor(@InjectModel('Player') private readonly jogadorModel: Model<Player>) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {

    const { email } = createPlayerDto;

    const hasPlayer = await this.jogadorModel.findOne({ email }).exec();

    if (hasPlayer) {
      throw new BadRequestException(`Player already exists for email ${email}`);
    }

    const player = new this.jogadorModel(createPlayerDto);

    await player.save();
    this.logger.log(`Create Player DTO: ${JSON.stringify(player)}`);

    return player;
  }

  findAll() {
    return this.jogadorModel.find().exec();
  }

  async findOne(_id: string) {
    
   const hasPlayer = await this.jogadorModel.findOne({ _id }).exec()
 
   if (!hasPlayer) {
     throw new NotFoundException(`Player not find for _id ${_id}`);
   }
     
    return hasPlayer
  }

  async update(_id: string, updatePlayerDto: UpdatePlayerDto) {
    console.log(_id)
    const hasPlayer = await this.jogadorModel.findOne({ _id }).exec();

    if (!hasPlayer) {
      throw new NotFoundException(`Player not find for _id ${_id}`);
    }

    return await this.jogadorModel.findByIdAndUpdate(_id, updatePlayerDto, { new: true }).exec();;
  }

  async remove(_id: string) {
    
    const hasPlayer = await this.jogadorModel.findOne({ _id }).exec();

    if (!hasPlayer) {
      throw new NotFoundException(`Player not find for _id ${_id}`);
    }

  await this.jogadorModel.findByIdAndDelete(_id).exec();
  }
}
