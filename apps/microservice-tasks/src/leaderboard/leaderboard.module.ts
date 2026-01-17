// leaderboard.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { InfraModule } from '@microservice-tasks/infra/infra.module';
import { Leaderboard } from './entities/leaderboard.entity';
import { LeaderboardRepository } from '@microservice-tasks/infra/typeorm/leaderboard.repository';

@Module({
  imports: [
    InfraModule, 
    TypeOrmModule.forFeature([Leaderboard]),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService, LeaderboardRepository],
  exports: [LeaderboardService], 
})
export class LeaderboardModule {}