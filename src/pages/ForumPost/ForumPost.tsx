import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import forumService from '@/services/forumService';
import { TForumMessage } from '@/api/types';
import styles from './ForumPost.module.css';
import { Message } from './components/Message';
import { SendMessageForm } from './components/SendMessageForm';

const ForumPost = () => {
  const routeParams = useParams();
  const postId = Number(routeParams.postId);
  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState<TForumMessage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    forumService.getMessagesForPost(postId).then((m) => {
      setMessages(m);
    });

    forumService
      .getPost(postId)
      .then((post) => {
        const { title: postTitle } = post;
        setTitle(postTitle);
      })
      .catch(() => navigate('/404'));
  }, [navigate, postId]);

  const addMessage = (m: TForumMessage) => {
    setMessages((prev) => [...prev, m]);
  };

  return (
    <>
      <Header title="Форум" />
      <MainLayout>
        <div className="container mx-auto flex flex-col items-center h-screen">
          <div className={styles.body}>
            <h2 className={styles.title}>{title}</h2>
            {messages.length ? (
              messages.map((item, index) => (
                <Message isMine={index % 2 !== 0} key={item.id} {...item} />
              ))
            ) : (
              <div className="text-center">
                Комментариев пока что нет, будь первым 💪🏻
              </div>
            )}
          </div>
          <SendMessageForm postId={postId} sendCallback={addMessage} />
        </div>
      </MainLayout>
    </>
  );
};

export default ForumPost;
