import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import { useEffect, useState } from 'react';
import forumService from '@/services/forumService';
import { TForumPost } from '@/api/types';
import { CreatePostForm } from './components/CreatePostForm';
import { PostCard } from './components/PostCard';

const Forum = () => {
  const [posts, setPosts] = useState<TForumPost[]>([]);

  useEffect(() => {
    forumService.getAllPosts().then((r) => setPosts(r.reverse()));
  }, []);

  const addNewPost = (post: TForumPost) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <>
      <Header title="Форум" />
      <MainLayout>
        <div className="w-full md:w-10/12 mt-10 flex flex-col items-center">
          <CreatePostForm addNewPost={addNewPost} />
          <div className="w-full mt-10">
            {posts.length ? (
              posts.map((post) => <PostCard key={post.id} {...post} />)
            ) : (
              <div className="text-center">
                Сообщений пока что нет. Напиши что-нибудь, чтобы форум не скучал
                ;(
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default Forum;
