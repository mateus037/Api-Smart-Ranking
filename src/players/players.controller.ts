import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerValidationParameterPipe } from './pipes/player-validation-parameter.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playersService.create(createPlayerDto);
  }

  @Get()
  async findAll() {
    return await this.playersService.findAll();
  }

  @Get(':_id')
  async findOne(@Param('_id', PlayerValidationParameterPipe) _id: string) {
    return await this.playersService.findOne(_id);
  }

  @Patch(':_id')
  @UsePipes(ValidationPipe)
  async update(@Param('_id', PlayerValidationParameterPipe) _id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return await this.playersService.update(_id, updatePlayerDto);
  }

  @Delete(':_id')
  async remove(@Param('_id', PlayerValidationParameterPipe) _id: string) {
    return await this.playersService.remove(_id);
  }
}
