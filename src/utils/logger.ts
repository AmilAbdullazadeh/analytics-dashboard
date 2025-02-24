type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogArgs = (string | number | boolean | object | null | undefined)[];

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string): string {
    return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
  }

  debug(message: string, ...args: LogArgs): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  info(message: string, ...args: LogArgs): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  warn(message: string, ...args: LogArgs): void {
    if (this.isDevelopment) {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  error(message: string, error?: Error, ...args: LogArgs): void {
    if (this.isDevelopment) {
      console.error(this.formatMessage('error', message), error, ...args);
    }
  }
}

export const logger = new Logger();
