import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from './data-source';
import { MachinesSeed } from './seeds/machines.seed';

void (async () => {
  await AppDataSource.initialize();

  await runSeeders(AppDataSource, {
    seeds: [MachinesSeed],
  });
})();
