
import Fuse from 'fuse.js';
import { articles, Article } from '@/lib/mockData';

// Configure Fuse.js for powerful searching
const fuse = new Fuse(articles, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'content', weight: 1 },
    { name: 'tags', weight: 1.5 },
    { name: 'author.name', weight: 1 }
  ],
  includeScore: true,
  threshold: 0.4,
  minMatchCharLength: 2
});

export function searchArticles(query: string): Article[] {
  if (!query) return [];
  
  const results = fuse.search(query);
  return results.map(result => result.item);
}
