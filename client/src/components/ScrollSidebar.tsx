import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ScrollCard, { ScrollData } from "./ScrollCard";
import { Search, Filter, Plus } from "lucide-react";
import { useState } from "react";

interface ScrollSidebarProps {
  title: string;
  scrolls: ScrollData[];
  activeScrollId?: string;
  onScrollSelect: (scroll: ScrollData) => void;
  category: "mystical" | "technical";
}

export default function ScrollSidebar({ 
  title, 
  scrolls, 
  activeScrollId, 
  onScrollSelect, 
  category 
}: ScrollSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredScrolls = scrolls.filter(scroll =>
    scroll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scroll.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="h-full bg-card/60 backdrop-blur-sm border-card-border flex flex-col">
      <CardHeader className="border-b border-card-border/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-lg text-foreground flex items-center gap-2">
            {title}
            <Badge variant="outline" className="text-xs">
              {scrolls.length}
            </Badge>
          </CardTitle>
          
          <div className="flex gap-1">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-filter"
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => console.log('Add new scroll to', category)}
              data-testid="button-add-scroll"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search scrolls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
            data-testid="input-search-scrolls"
          />
        </div>

        {showFilters && (
          <div className="space-y-2 pt-2 border-t border-card-border/30">
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs cursor-pointer hover-elevate">
                Recent
              </Badge>
              <Badge variant="secondary" className="text-xs cursor-pointer hover-elevate">
                Favorites
              </Badge>
              <Badge variant="secondary" className="text-xs cursor-pointer hover-elevate">
                Unread
              </Badge>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredScrolls.length > 0 ? (
            filteredScrolls.map((scroll) => (
              <ScrollCard
                key={scroll.id}
                scroll={scroll}
                isActive={scroll.id === activeScrollId}
                onClick={() => onScrollSelect(scroll)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">
                {searchTerm ? 'No scrolls match your search.' : 'No scrolls available.'}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={() => console.log('Create first scroll for', category)}
                data-testid="button-create-first-scroll"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Scroll
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}