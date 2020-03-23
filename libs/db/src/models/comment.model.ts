import { prop, Ref, arrayProp, pre, modelOptions } from '@typegoose/typegoose'
import Post from './post.model'
import { BaseModel } from './base.model'

function autoPopulateSubs(next) {
  this.populate('children')
  next()
}

@pre<Comment>('findOne', autoPopulateSubs)
@pre<Comment>('find', autoPopulateSubs)
export default class Comment extends BaseModel {
  @prop({ ref: 'Post', required: true })
  pid!: Ref<Post>

  @prop({ trim: true, required: true })
  author!: string

  @prop({ trim: true })
  mail?: string

  @prop({ trim: true })
  url?: string

  @prop({ required: true })
  text!: string

  @prop({ default: 0 })
  state?: number

  @prop({ default: false })
  hasParent?: boolean

  @arrayProp({ itemsRef: this })
  children?: Ref<this>[]

  @prop({ default: 0 })
  commentsIndex?: number
  @prop()
  key?: string
  @prop()
  ip?: string

  @prop()
  agent?: string
}
