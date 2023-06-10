import CreateCommentDto from './dto/create-comment.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';

export interface CommentServiceInterface {
  /**
   * Создать комментарий
   * @param dto данные для создания комментария
   */
  createComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null>

  /**
   * Найти все комментарии для оффера с id `offerId`
   * @param offerId идентификатор оффера
   */
  findCommentsByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null>
}
