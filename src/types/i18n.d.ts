declare module '*.json' {
  const value: {
    [key: string]:
      | string
      | number
      | boolean
      | null
      | undefined
      | Record<string, unknown>;
  };
  export default value;
}
