import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export class ValidationError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ConflictError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InternalServerError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string = 'Error interno del servidor') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
        this.isOperational = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler: ErrorRequestHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Error interno del servidor';

    console.error(`[${new Date().toISOString()}] Error ${statusCode}:`, {
        name: err.name,
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });

    res.status(statusCode).json({
        error: {
            name: err.name,
            message: message,
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
            path: req.path,
            method: req.method
        }
    });
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: {
            name: 'NotFoundError',
            message: `Ruta ${req.method} ${req.path} no encontrada`,
            statusCode: 404,
            timestamp: new Date().toISOString(),
            path: req.path,
            method: req.method
        }
    });
};

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
    });

    next();
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};