interface BlogPostStateInput {
  draft: boolean;
  archived?: boolean;
}

export function isRoutablePost(archived = false) {
  return !archived;
}

export function isListVisiblePost({
  draft,
  archived = false,
  isProductionBuild,
}: BlogPostStateInput & { isProductionBuild: boolean }) {
  return isRoutablePost(archived) && (!isProductionBuild || !draft);
}

export function isDraftVisible(draft: boolean, archived = false) {
  return draft && !archived;
}
