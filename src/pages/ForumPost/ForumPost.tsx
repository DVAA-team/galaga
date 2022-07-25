import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import styles from './ForumPost.module.css';
import { Message } from './components/Message';
import { TOwnProps } from './components/Message/types';
import { SendMessagePanel } from './components/SendMessagePanel';

type TMessageData = TOwnProps & {
  id: number;
};

const ForumPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState<TMessageData[]>([]);

  const sendMessage = () => (text: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        userDisplayName: 'Pavel Born',
        date: '01.01.2022',
        text,
        commentsNumber: 10,
      },
    ]);
  };

  useEffect(() => {
    if (postId) {
      setTitle('The 4-step SEO framework that led to a 1000% increase in!');
      setMessages([
        {
          id: 1,
          userDisplayName: 'Pavel Born',
          date: '01.01.2022',
          text: 'Привет, всем! Давайте обсудим эту важную тему :)',
          commentsNumber: 10,
        },
        {
          id: 2,
          userDisplayName: 'I am',
          date: '01.01.2022',
          text: 'Я думаю вот так!',
          commentsNumber: 11,
          isMine: true,
        },
        {
          id: 3,
          userDisplayName: 'Olya Born',
          date: '01.01.2022',
          text: 'Я со всеми согласна)',
          commentsNumber: 12,
        },
      ]);
    }
  }, [postId]);

  return (
    <div className="container mx-auto flex flex-col items-center h-screen">
      <h1 className="mt-3 text-3xl font-bold">Forum</h1>
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        {messages.map((item) => (
          <Message key={item.id} {...item} />
        ))}
      </div>

      <SendMessagePanel handleClick={sendMessage} />
    </div>
  );
};

export default ForumPost;
