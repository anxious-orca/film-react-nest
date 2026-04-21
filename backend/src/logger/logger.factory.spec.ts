import { createLogger } from './logger.factory';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';
import { DevLogger } from './dev.logger';

describe('createLogger', () => {
  it('возвращает JsonLogger', () => {
    process.env.LOGGER_TYPE = 'json';
    expect(createLogger()).toBeInstanceOf(JsonLogger);
  });

  it('возвращает TskvLogger', () => {
    process.env.LOGGER_TYPE = 'tskv';
    expect(createLogger()).toBeInstanceOf(TskvLogger);
  });

  it('возвращает DevLogger по дефолту', () => {
    delete process.env.LOGGER_TYPE;
    expect(createLogger()).toBeInstanceOf(DevLogger);
  });
});
