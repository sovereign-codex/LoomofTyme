import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Search, BookOpen, Sparkles, Tag, Clock } from "lucide-react";
import { Scroll } from "@shared/schema";

interface ScrollLibraryProps {
  onSelectScroll?: (scroll: Scroll) => void;
  selectedScrollId?: string;
}

export default function ScrollLibrary({ onSelectScroll, selectedScrollId }: ScrollLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: scrollsData, isLoading, error } = useQuery({
    queryKey: ['/api/scrolls', { search: searchQuery, category: selectedCategory }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/scrolls?${params}`);
      if (!response.ok) throw new Error('Failed to fetch scrolls');
      return response.json();
    },
  });

  const scrolls: Scroll[] = scrollsData?.scrolls || [];

  const categories = Array.from(new Set(scrolls.map(scroll => scroll.category)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "consciousness": return "⚮";
      case "protocols": return "◊";
      case "mystical": return "∞";
      case "technical": return "⚡";
      default: return "⚬";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (error) {
    return (
      <Card className="w-full bg-card/80 backdrop-blur-sm border-card-border">
        <CardContent className="p-6 text-center">
          <ScrollText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">Failed to load scroll library</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm border-card-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-xl text-foreground flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-md">
            <BookOpen className="w-5 h-5 text-accent-foreground" />
          </div>
          Scroll Library
          <Badge variant="outline" className="text-xs ml-auto">
            {scrolls.length} scrolls
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search wisdom scrolls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm"
              data-testid="input-search-scrolls"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant={!selectedCategory ? "default" : "ghost"}
              onClick={() => setSelectedCategory(null)}
              className="text-xs"
              data-testid="filter-all-categories"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className="text-xs"
                data-testid={`filter-category-${category}`}
              >
                <span className="mr-1">{getCategoryIcon(category)}</span>
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Scroll List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
              <p className="text-sm text-muted-foreground">Loading wisdom scrolls...</p>
            </div>
          ) : scrolls.length === 0 ? (
            <div className="text-center py-8">
              <ScrollText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-sm">
                {searchQuery ? 'No scrolls match your search.' : 'No scrolls found.'}
              </p>
            </div>
          ) : (
            scrolls.map((scroll) => (
              <Card
                key={scroll.id}
                className={`cursor-pointer transition-all duration-200 hover-elevate active-elevate-2 ${
                  selectedScrollId === scroll.id 
                    ? 'ring-2 ring-primary/50 bg-accent/10' 
                    : 'border-card-border/50'
                }`}
                onClick={() => onSelectScroll?.(scroll)}
                data-testid={`scroll-card-${scroll.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-foreground text-base mb-1">
                        {scroll.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <span>{getCategoryIcon(scroll.category)}</span>
                          {scroll.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(scroll.updatedAt.toString())}
                        </span>
                        {scroll.source && (
                          <span className="text-xs bg-muted/30 px-2 py-1 rounded">
                            {scroll.source.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {scroll.content.length > 150 
                      ? scroll.content.substring(0, 150) + "..." 
                      : scroll.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {scroll.glyphs && scroll.glyphs.length > 0 && (
                        <div className="flex items-center gap-1">
                          {scroll.glyphs.slice(0, 3).map((glyph, index) => (
                            <span key={index} className="text-primary text-sm font-bold">
                              {glyph}
                            </span>
                          ))}
                          {scroll.glyphs.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{scroll.glyphs.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {scroll.tags && scroll.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {scroll.tags.length} tags
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}