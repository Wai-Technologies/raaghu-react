describe('warnDeprecatedProp', () => {
  const originalEnv = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.restoreAllMocks();
  });

  const load = () => {
    let fn!: typeof import('./deprecation').warnDeprecatedProp;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- fresh module instance per test
      fn = require('./deprecation').warnDeprecatedProp;
    });
    return fn;
  };

  it('warns only once per component prop', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const warnDeprecatedProp = load();
    warnDeprecatedProp('RdsX', 'oldProp', '`newProp`');
    warnDeprecatedProp('RdsX', 'oldProp', '`newProp`');
    warnDeprecatedProp('RdsX', 'otherProp', '`newProp`');
    expect(warn).toHaveBeenCalledTimes(2);
    expect(warn.mock.calls[0][0]).toContain('[RdsX] The `oldProp` prop is deprecated');
  });

  it('is silent in production', () => {
    process.env.NODE_ENV = 'production';
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    load()('RdsX', 'oldProp', '`newProp`');
    expect(warn).not.toHaveBeenCalled();
  });
});

describe('resolveDeprecatedProp', () => {
  const originalEnv = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.restoreAllMocks();
  });

  const load = () => {
    let fn!: typeof import('./deprecation').resolveDeprecatedProp;
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- fresh module instance per test
      fn = require('./deprecation').resolveDeprecatedProp;
    });
    return fn;
  };

  it('returns canonical when both are set and still warns about legacy', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const resolveDeprecatedProp = load();
    expect(resolveDeprecatedProp(true, false, 'RdsX', 'isDisabled', '`disabled`')).toBe(true);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('isDisabled');
  });

  it('returns legacy and warns when only legacy is set', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const resolveDeprecatedProp = load();
    expect(resolveDeprecatedProp(undefined, 'small', 'RdsX', 'selectSize', '`size`')).toBe('small');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('selectSize');
  });

  it('returns undefined when neither is set', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(load()(undefined, undefined, 'RdsX', 'old', '`new`')).toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
  });
});
