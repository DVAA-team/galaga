import { appConstants } from '@/config';
import { AbstractHttpClient } from './AbstractHttpClient';
import { TForumComment, TForumMessage, TForumPost } from './types';

class ForumApi extends AbstractHttpClient {
  public constructor() {
    super(appConstants.localApiBaseURL);
  }

  public getAllPosts = () => this.instance.get('/posts');

  public createPost = (data: Pick<TForumPost, 'title'>) =>
    this.instance.post('/posts', data);

  public getPost = (data: TForumPost['id']) =>
    this.instance.get(`/posts/${data}`);

  public updatePost = (data: TForumPost) => {
    const { id, ...rest } = data;
    this.instance.put(`/posts/${id}`, rest);
  };

  public deletePost = (data: TForumPost['id']) =>
    this.instance.delete(`/posts/${data}`, {});

  public getMessagesForPost = (data: TForumPost['id']) =>
    this.instance.get(`/posts/${data}/messages`);

  public createMessageForPost = (
    data: Omit<TForumMessage, 'messageId' | 'user' | 'id' | 'userId'>
  ) => {
    const { postId, ...rest } = data;
    return this.instance.post(`/posts/${postId}/messages`, rest);
  };

  public getCommentsForMessage = ({
    postId,
    messageId,
  }: Pick<TForumComment, 'messageId' | 'postId'>) =>
    this.instance.get(`/posts/${postId}/messages/${messageId}/comments`);

  public createCommentForMessage = ({
    postId,
    messageId,
    text,
  }: Pick<TForumComment, 'messageId' | 'postId' | 'text'>) =>
    this.instance.post(`/posts/${postId}/messages/${messageId}/comments`, {
      messageId,
      text,
    });
}

export const forumApi = new ForumApi();
