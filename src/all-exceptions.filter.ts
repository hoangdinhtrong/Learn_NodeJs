import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type MyReponseObject = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myReponseObj: MyReponseObject = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        };

        if (exception instanceof HttpException) {
            myReponseObj.statusCode = exception.getStatus();
            myReponseObj.response = exception.getResponse();
        }
        else if (exception instanceof PrismaClientValidationError) {
            myReponseObj.statusCode = 422;
            myReponseObj.response = exception.message.replaceAll(/\n/g, '');
        }
        else {
            myReponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myReponseObj.response = 'Internal Server Error';
        }

        response.status(myReponseObj.statusCode).json(myReponseObj);

        this.logger.error(myReponseObj.response, AllExceptionsFilter.name);

        super.catch(exception, host);
    }
}