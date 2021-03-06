/*
 * @Author: Innei
 * @Date: 2020-11-24 16:20:37
 * @LastEditTime: 2021-03-21 18:13:17
 * @LastEditors: Innei
 * @FilePath: /server/apps/server/src/auth/roles.guard.ts
 * Mark: Coding with Love
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { IncomingMessage } from 'http'

/**
 * 区分游客和主人的守卫
 */

declare interface Request {
  [name: string]: any
}
@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    let isMaster = false
    if (request.headers['authorization']) {
      try {
        isMaster = (await super.canActivate(context)) as boolean
      } catch {}
    }
    request.isGuest = !isMaster
    request.isMaster = isMaster
    return true
  }
}

@Injectable()
export class RolesGQLGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request: IncomingMessage = ctx.getContext().req

    let isMaster = false
    if (request.headers['authorization']) {
      try {
        isMaster = (await super.canActivate(context)) as boolean
      } catch {}
    }
    // @ts-ignore
    request.isGuest = !isMaster
    // @ts-ignore
    request.isMaster = isMaster

    return true
  }
}
