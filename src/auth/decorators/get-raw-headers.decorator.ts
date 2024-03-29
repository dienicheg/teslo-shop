import { ExecutionContext, createParamDecorator } from "@nestjs/common";



export const GetRawHeadres = createParamDecorator(
    (data, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest()

        return req.rawHeaders
    }
)