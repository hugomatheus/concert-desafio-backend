import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './providers/database/database.provider.module';
import { EnvironmentProviderModule } from './providers/environment/environment.provider.module';
import { MachinesModule } from './modules/machines/machines.module';
import { TaskSchedulingProviderModule } from './providers/task-scheduling/task-scheduling.provider.module';

@Module({
  imports: [
    EnvironmentProviderModule,
    TaskSchedulingProviderModule,
    DatabaseProviderModule,
    MachinesModule,
  ],
})
export class AppModule {}
