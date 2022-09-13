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

  useEffect(() => {
    if (!post) {
      forumService
        .getPost(postId)
        .then((r) => {
          if (r === null) {
            navigate('/404');
            return;
          }
          dispatch(addCurrentPost(r));
          forumService.getMessagesForPost(postId).then((m) => {
            m.forEach((message: TPostMessage) => {
              dispatch(addMessageToPost(message));
            });
          });
        })
        .catch(() => navigate('/404'));
    }
  }, [dispatch, navigate, post, postId]);

  useEffect(() => {
    setMessages(post?.messages);
  }, [post, messages]);

  return (
    <>
      <Header title="Форум" />
      <MainLayout>
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
      </MainLayout>
    </>
  );
};

export default ForumPost;
