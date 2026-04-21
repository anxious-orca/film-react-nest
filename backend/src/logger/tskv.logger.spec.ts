import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('должен логировать в формате TSKV', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('hello', { a: 1 });

    const output = spy.mock.calls[0][0];

    expect(output).toContain('level=log');
    expect(output).toContain('message=hello');
    expect(output).toContain('param0={"a":1}');
    expect(output).toContain('time=');

    spy.mockRestore();
  });
});
