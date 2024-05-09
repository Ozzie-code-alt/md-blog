
import getPostMetadata from "@/utils/getPostMetadata";
import PostCard from "@/components/PostCard";
export default function Home() {
  const PostMetadata = getPostMetadata("recipes");
  return (
    <main>
      <div className="postsContainer">
        {
          PostMetadata.map((post, index) => {
            return(
              <PostCard key={index} post={post} />
            )
          })
        }
      </div>
    </main>
  );
}
