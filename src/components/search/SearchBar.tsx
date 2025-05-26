
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { searchArticles } from '@/services/search';
import { Article } from '@/lib/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (query) {
      const searchResults = searchArticles(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  // Listen for keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus the input when the popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleSelect = (articleId: string) => {
    setOpen(false);
    setQuery('');
    navigate(`/article/${articleId}`);
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full md:w-auto relative flex items-center pl-3 text-muted-foreground"
          role="combobox"
          aria-expanded={open}
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Search articles...</span>
          <span className="inline md:hidden">Search</span>
          {!isMobile && (
            <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs md:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={`w-screen ${!isMobile ? 'max-w-[500px]' : 'max-w-[350px]'} p-0`} 
        align={isMobile ? "center" : "start"}
        side={isMobile ? "bottom" : undefined}
      >
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              ref={inputRef}
              placeholder="Search articles..."
              value={query}
              onValueChange={setQuery} 
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="h-6 w-6 shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm">
              {query ? 'No results found.' : 'Type to search...'}
            </CommandEmpty>
            <CommandGroup heading="Articles">
              {results.slice(0, 5).map((article) => (
                <CommandItem
                  key={article.id}
                  onSelect={() => handleSelect(article.id)}
                  className="flex items-center py-3 px-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{article.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {article.content.substring(0, 50)}...
                    </span>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        {article.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 bg-muted rounded-full">
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{article.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
              {results.length > 5 && (
                <div className="py-2 px-3 text-xs text-center border-t">
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => {
                      navigate(`/explore?q=${encodeURIComponent(query)}`);
                      setOpen(false);
                    }}
                    className="w-full"
                  >
                    See all {results.length} results
                  </Button>
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
