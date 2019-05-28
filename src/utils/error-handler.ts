import HttpStatus from 'http-status-codes';
import { CustomError, ErrorCode } from './errors-factory';
import { FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import logger from './logger';

function formatResponse(errorCode: ErrorCode, message: string) {
  return {
    error: {
      code: ErrorCode[errorCode],
      message
    }
  };
}

function logCustomError(error: CustomError) {
  if (!error.httpCode || error.httpCode >= 500) {
    logger.error(error);
  } else {
    logger.warn(error);
  }
}

function logFastifyError(error: FastifyError) {
  if (!error.statusCode || error.statusCode >= 500) {
    logger.error(error);
  } else {
    logger.warn(error);
  }
}

export function notFoundHandler(
  request: FastifyRequest<IncomingMessage>,
  reply: FastifyReply<ServerResponse>
) {
  const error = <FastifyError>{
    statusCode: 404,
    message: 'Not found',
    name: 'NotFound'
  };
  errorHandler(error, request, reply);
}

export default function errorHandler(
  error: FastifyError,
  request: FastifyRequest<IncomingMessage>,
  reply: FastifyReply<ServerResponse>
) {
  if (error instanceof CustomError) {
    logCustomError(error);
    reply.code(error.httpCode);
    reply.send(formatResponse(error.errorCode, error.message));
  } else if ((<FastifyError>error).validation) {
    logFastifyError(error);
    reply.code(HttpStatus.BAD_REQUEST);
    reply.send(formatResponse(ErrorCode.Validation, error.message));
  } else {
    logFastifyError(error);
    reply.code(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    reply.send(formatResponse(ErrorCode.Internal, 'Internal Server Error'));
  }
}
