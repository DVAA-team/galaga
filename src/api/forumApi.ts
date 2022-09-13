import { appConstants } from '@/config';
import { AbstractHttpClient } from './AbstractHttpClient';
import { TForumMessage, TForumPost } from './types';

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
}

export const forumApi = new ForumApi();
