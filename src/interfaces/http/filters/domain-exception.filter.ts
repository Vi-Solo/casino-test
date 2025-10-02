import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError, NotFoundError, ConflictError, ValidationError } from '../../../domain/shared/errors';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError | HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } = this.mapException(exception);

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private mapException(exception: DomainError | HttpException): { status: number; message: string } {
    if (exception instanceof NotFoundError) {
      return { status: HttpStatus.NOT_FOUND, message: exception.message };
    }
    if (exception instanceof ConflictError) {
      return { status: HttpStatus.CONFLICT, message: exception.message };
    }
    if (exception instanceof ValidationError) {
      return { status: HttpStatus.BAD_REQUEST, message: exception.message };
    }
    return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
  }
} 