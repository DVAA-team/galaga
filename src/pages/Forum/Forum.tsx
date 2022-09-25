import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import { useEffect } from 'react';
import forumService from '@/services/forumService';
import { useForum } from '@/hooks/useForum';
import { useAppDispatch } from '@/hooks/store';
import { addCurrentPost, addPosts, TPost } from '@/store/slices/forumSlice';
import { useAuth } from '@/hooks/useAuth';
import { NeedLogin } from '@/components/NeedLogin';
import { PostCard } from './components/PostCard';
import { CreatePostForm } from './components/CreatePostForm';

const Forum = () => {
  const posts = useForum();
  const dispatch = useAppDispatch();
  const user = useAuth();

  useEffect(() => {
    if (posts === null || posts.length === 0) {
      forumService.getAllPosts().then((r) => {
        if (r.length) {
          r.forEach((post: TPost) => {
            dispatch(addPosts(post));
          });
        }
      });
    } else {
      dispatch(addCurrentPost(null));
    }
  }, [dispatch, posts]);

  return (
    <>
      <Header title="Форум" />
      <MainLayout>
        <div className="w-full md:w-10/12 mt-10 flex flex-col items-center text-white">
          {user ? (
            <>
              <CreatePostForm />
              <div className="w-full mt-10">
                {posts && posts.length > 0 ? (
                  posts.map((post) => {
                    return <PostCard key={post.id} {...post} />;
                  })
                ) : (
                  <div className="text-center">
                    Сообщений пока что нет. Напиши что-нибудь, чтобы форум не
                    скучал ;(
                  </div>
                )}
              </div>
            </>
          ) : (
            <NeedLogin text="Чтобы писать или просматривать посты на форуме" />
          )}
        </div>
      </MainLayout>
    </>
  );
};
export default Forum;
