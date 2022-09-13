import axios, { AxiosError } from 'axios';

import { forumApi } from '@/api/forumApi';

import { notifyError, notifySuccess } from '@/utils/notify';
import { TForumMessage, TForumPost } from '@/api/types';

type TServerError = { reason: string };

class ForumService {
  public lastError: Error | null = null;

  private _errorHandler = (e: AxiosError) => {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<TServerError>;
      const reason = error.response?.data?.reason;

      if (reason) {
        notifyError(reason);
      }
    }
    this.lastError = e;
    return null;
  };

  // eslint-disable-next-line class-methods-use-this
  public getAllPosts = () =>
    forumApi
      .getAllPosts()
      .then(({ data }) => data)
      .catch(() => []);

  // eslint-disable-next-line class-methods-use-this
  public getPost = (id: number) =>
    forumApi
      .getPost(id)
      .then(({ data }) => data)
      .catch(() => null);

  // eslint-disable-next-line class-methods-use-this
  public getMessagesForPost = (id: number) =>
    forumApi
      .getMessagesForPost(id)
      .then(({ data }) => data)
      .catch(() => []);

  public createPost = (d: Pick<TForumPost, 'title'>) =>
    forumApi
      .createPost(d)
      .then(({ data }) => {
        notifySuccess('Пост добавлен!');
        return data;
      })
      .catch(this._errorHandler);

  public createMessageForPost = (
    d: Omit<TForumMessage, 'messageId' | 'user' | 'id' | 'userId'>
  ) =>
    forumApi
      .createMessageForPost(d)
      .then(({ data }) => {
        notifySuccess('Комментарий добавлен!');
        return data;
      })
      .catch(this._errorHandler);
}

export default new ForumService();
