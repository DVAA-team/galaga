import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreatePostForm } from './components/CreatePostForm';
import { PostCard } from './components/PostCard';
import { TOwnProps as TPostProps } from './components/PostCard/types';

const Forum = () => {
  type TPostData = TPostProps & { id: string };
  const [posts, setPosts] = useState<TPostData[]>([]);

  useEffect(() => {
    setPosts([
      {
        id: '1',
        title: 'The 4-step SEO framework that led to a 1000% increase in!',
        userDisplayName: 'Pavel Born',
        date: '01.01.2001',
        messagesNumber: 321,
        membersNumber: 45,
      },
      {
        id: '2',
        title: 'The 4-step SEO framework that led to a 1000% increase in!',
        userDisplayName: 'Pavel Born',
        date: '01.01.2001',
        messagesNumber: 321,
        membersNumber: 45,
      },
      {
        id: '3',
        title: 'The 4-step SEO framework that led to a 1000% increase in!',
        userDisplayName: 'Pavel Born',
        date: '01.01.2001',
        messagesNumber: 321,
        membersNumber: 45,
      },
    ]);
  }, []);
  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="mt-3 text-3xl font-bold">Forum</h1>
      <div className="w-full md:w-10/12 mt-10 flex flex-col items-center">
        <CreatePostForm />
        <div className="w-full mt-10">
          {posts.map((post) => (
            <Link key={post.id} to={`posts/${post.id}`}>
              <PostCard {...post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Forum;
