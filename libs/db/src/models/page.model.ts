/*
 * @Author: Innei
 * @Date: 2020-12-29 19:46:49
 * @LastEditTime: 2021-02-05 11:39:08
 * @LastEditors: Innei
 * @FilePath: /server/libs/db/src/models/page.model.ts
 * @Mark: Coding with Love
 */
import { ApiProperty } from '@nestjs/swagger'
import { prop } from '@typegoose/typegoose'
import { IsNilOrString } from 'utils/validator-decorators/isNilOrString'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { Schema } from 'mongoose'

import { WriteBaseModel } from './base.model'
import { Transform } from 'class-transformer'

export const pageType = ['md', 'html', 'frame']

export default class Page extends WriteBaseModel {
  @ApiProperty({ description: 'Slug', required: true })
  @prop({ trim: 1, index: true, required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  slug!: string

  @ApiProperty({ description: 'SubTitle', required: false })
  @prop({ trim: true })
  @IsString()
  @IsOptional()
  @IsNilOrString()
  subtitle?: string | null

  @ApiProperty({ description: 'Order', required: false })
  @prop({ default: 1 })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  order!: number

  @ApiProperty({
    description: 'Type (MD | html | frame)',
    enum: pageType,
    required: false,
  })
  @prop({ default: 'md' })
  @IsEnum(pageType)
  @IsOptional()
  type?: string

  @ApiProperty({ description: 'Other Options', required: false })
  @prop({ type: Schema.Types.Mixed })
  @IsOptional()
  @IsObject()
  options?: Record<string, any>
}
