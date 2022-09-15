import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import forumService from '@/services/forumService';
import { TForumMessage } from '@/api/types';
import { useForumPost } from '@/hooks/useForumPost';
import { useAppDispatch } from '@/hooks/store';
import {
  addMessageToPost,
  addCurrentPost,
  TPostMessage,
} from '@/store/slices/forumSlice';
import { useAuth } from '@/hooks/useAuth';
import { NeedLogin } from '@/components/NeedLogin';
import styles from './ForumPost.module.css';
import { Message } from './components/Message';
import { SendMessageForm } from './components/SendMessageForm';

const ForumPost = () => {
  const routeParams = useParams();
  const postId = Number(routeParams.postId);
  const post = useForumPost(postId);
  const [messages, setMessages] = useState<TForumMessage[] | undefined>(
    post?.messages
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAuth();

  useEffect(() => {
    if (!post) {
      forumService.getPost(postId).then((r) => {
        if (r === null) {
          return;
        }
        dispatch(addCurrentPost(r));
        forumService.getMessagesForPost(postId).then((m) => {
          m.forEach((message: TPostMessage) => {
            dispatch(addMessageToPost(message));
          });
        });
      });
    }
  }, [dispatch, navigate, post, postId]);

  useEffect(() => {
    setMessages(post?.messages);
  }, [post, messages]);

  return (
    <>
      <Header title="Форум" />
      <MainLayout>
        {user ? (
          <div className="container mx-auto flex flex-col items-center h-screen text-white">
            <div className={styles.body}>
              <h2 className={styles.title}>{post?.title}</h2>
              {messages && messages.length ? (
                messages.map((item) => <Message key={item.id} {...item} />)
              ) : (
                <div className="text-center">
                  Комментариев пока что нет, будь первым 💪🏻
                </div>
              )}
            </div>
            <SendMessageForm postId={postId} />
          </div>
        ) : (
          <div className="container mx-auto flex flex-col justify-center items-center text-white">
            <NeedLogin text="Чтобы комментировать или просматривать посты на форуме" />
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default ForumPost;
