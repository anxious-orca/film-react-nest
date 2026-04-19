import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('должен логировать форматированную строку JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test message', { foo: 'bar' });

    expect(spy).toHaveBeenCalledTimes(1);

    const logged = spy.mock.calls[0][0];
    const parsed = JSON.parse(logged);

    expect(parsed).toMatchObject({
      level: 'log',
      message: 'test message',
      optionalParams: [{ foo: 'bar' }],
    });

    expect(parsed.timestamp).toBeDefined();

    spy.mockRestore();
  });
});