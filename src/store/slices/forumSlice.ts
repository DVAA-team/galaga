import { TForumMessage, TForumPost } from '@/api/types';
import { TForumUser } from '@/services/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TPostMessage = TForumMessage & {
  user: TForumUser;
};

export type TUserAvatar = {
  id: number;
  postId?: number;
  avatarUrl: string | null;
};

export type TPost = TForumPost & {
  user: TForumUser;
  messages?: TPostMessage[];
};

interface IState {
  posts: TPost[] | null;
  currentPost: TPost | null;
}

const initialState: IState = {
  posts: null,
  currentPost: null,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addPosts(state, action: PayloadAction<TPost>) {
      if (state.posts === null) {
        state.posts = [action.payload];
      } else {
        state.posts = [action.payload, ...state.posts];
      }
    },
    addCurrentPost(
      state,
      action: PayloadAction<Omit<TPost, 'userData'> | null>
    ) {
      state.currentPost = action.payload;
    },
    addUserAvatar(state, action: PayloadAction<TUserAvatar>) {
      if (state.posts) {
        state.posts = state.posts.map((post) => {
          const { id: postId } = post;
          const { id: payloadPostId, avatarUrl } = action.payload;
          if (postId === payloadPostId) {
            post.user.avatarUrl = avatarUrl;
          }
          return post;
        });
      }
    },
    addAllMessagesToPost(
      state,
      action: PayloadAction<{ postId: number; messages: TPostMessage[] }>
    ) {
      let { posts } = state;
      const { currentPost } = state;
      const { postId: payloadPostId, messages } = action.payload;

      if (posts !== null) {
        posts = posts.map((post) => {
          const { id: postId } = post;

          if (postId === payloadPostId) {
            post.messages = messages;
          }
          return post;
        });
      }

      if (currentPost !== null) {
        currentPost.messages = messages;
      }
    },
    addMessageToPost(
      state,
      action: PayloadAction<TPostMessage & { postId: number; user: TForumUser }>
    ) {
      let { posts } = state;
      const { currentPost } = state;
      const { postId: payloadPostId } = action.payload;

      if (posts !== null) {
        posts = posts.map((post) => {
          const { id: postId } = post;
          if (postId === payloadPostId) {
            const message = action.payload;
            if (post.messages) {
              post.messages.push(message);
            } else {
              post.messages = [message];
            }
          }
          return post;
        });
      }

      if (currentPost !== null) {
        if (currentPost.messages) {
          currentPost.messages.push(action.payload);
        } else {
          currentPost.messages = [action.payload];
        }
      }
    },
    addUserAvatarToMessage(state, action: PayloadAction<TUserAvatar>) {
      if (state.posts) {
        state.posts = state.posts.map((post) => {
          const { id: postId } = post;
          const {
            postId: payloadPostId,
            avatarUrl,
            id: payloadMessageId,
          } = action.payload;
          if (postId === payloadPostId) {
            const { messages } = post;

            if (messages) {
              messages.map((message) => {
                const { id: messageId } = message;

                if (messageId === payloadMessageId) {
                  message.user.avatarUrl = avatarUrl;
                }

                return message;
              });
            }
          }
          return post;
        });
      }
    },
  },
});

export const {
  addPosts,
  addCurrentPost,
  addUserAvatar,
  addAllMessagesToPost,
  addMessageToPost,
  addUserAvatarToMessage,
} = forumSlice.actions;

export default forumSlice.reducer;
