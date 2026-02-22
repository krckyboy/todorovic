import { buildBlogPostCardViewModel } from './blogPostCardViewModel';
import type { SerializedBlogPost } from './blogPostTypes';

export function presentClientBlogPostCard(post: SerializedBlogPost) {
  return buildBlogPostCardViewModel(post);
}
