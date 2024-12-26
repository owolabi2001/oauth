import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export interface Response<T>{
    status:number;
    message:string;
    data:T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => (
        {
            status: context.switchToHttp().getResponse().statusCode,
            message: 'Process successful',
            data
        }
    )));
  }
}