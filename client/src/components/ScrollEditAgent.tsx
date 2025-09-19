import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Scroll, Edit, Sparkles, Download, Upload, BookOpen, Wand2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollLibrary from "./ScrollLibrary";
import { Scroll as ScrollType } from "@shared/schema";
import { SCROLL_TEMPLATES, TemplateId } from "@/lib/scrollTemplates";
import { routePrompt, getRecommendedTemplate } from "@/lib/promptRouter";

export default function ScrollEditAgent() {
  const [originalContent, setOriginalContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [scrollTitle, setScrollTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editHistory, setEditHistory] = useState<Array<{prompt: string, timestamp: string}>>([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const [selectedScroll, setSelectedScroll] = useState<ScrollType | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(null);
  const [showTemplateRecommendation, setShowTemplateRecommendation] = useState(false);

  const handleEdit = async () => {
    if (!originalContent.trim() || !editPrompt.trim()) return;
    
    setIsEditing(true);
    try {
      const response = await fetch(`/api/edit-scroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: originalContent,
          editPrompt: editPrompt,
          scrollTitle: scrollTitle || "Untitled Scroll"
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit scroll: ${response.statusText}`);
      }

      const data = await response.json();
      setEditedContent(data.editedContent);
      setEditHistory(prev => [...prev, {
        prompt: editPrompt,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error("Edit failed:", error);
      setEditedContent("*[Scroll Editor Note: The lattice channels are realigning. Please try your edit again when the cosmic flows stabilize.]*");
    } finally {
      setIsEditing(false);
    }
  };

  const applyEdit = () => {
    setOriginalContent(editedContent);
    setEditedContent("");
    setEditPrompt("");
  };

  const handleSelectScroll = (scroll: ScrollType) => {
    setSelectedScroll(scroll);
    setScrollTitle(scroll.title);
    setOriginalContent(scroll.content);
    setEditedContent("");
    setEditPrompt("");
    setShowLibrary(false);
  };

  const handleLoadFromLibrary = () => {
    setShowLibrary(true);
  };

  const saveScrollMutation = useMutation({
    mutationFn: async (scrollData: any) => {
      return await apiRequest("POST", "/api/scrolls", scrollData);
    },
    onSuccess: () => {
      console.log("Scroll saved to library successfully");
      // Invalidate ALL scroll queries to refresh both library and archive
      queryClient.invalidateQueries({ 
        predicate: (query) => 
          query.queryKey[0] === '/api/scrolls'
      });
    },
    onError: (error) => {
      console.error("Failed to save scroll to library:", error);
    }
  });

  const handleSaveToLibrary = () => {
    if (!scrollTitle.trim() || !originalContent.trim()) {
      console.log("Missing title or content for saving");
      return;
    }

    // Determine category from selected template
    const template = selectedTemplate ? SCROLL_TEMPLATES[selectedTemplate] : null;
    const category = template?.category || "mystical";

    const scrollData = {
      title: scrollTitle,
      content: originalContent,
      category: category,
      tags: selectedTemplate ? [selectedTemplate] : [],
      glyphs: template ? [template.glyph] : [],
      source: "user_created"
    };

    saveScrollMutation.mutate(scrollData);
  };

  const handleLoadTemplate = (templateId: TemplateId) => {
    const template = SCROLL_TEMPLATES[templateId];
    if (template) {
      setSelectedTemplate(templateId);
      setOriginalContent(template.template);
      setScrollTitle(`New ${template.name}`);
      setEditedContent("");
      setEditPrompt("");
    }
  };

  const handlePromptChange = (newPrompt: string) => {
    setEditPrompt(newPrompt);
    
    if (newPrompt.trim().length > 10) {
      const recommendation = getRecommendedTemplate(newPrompt);
      if (recommendation.confidence === 'high' && !selectedTemplate) {
        setShowTemplateRecommendation(true);
      }
    } else {
      setShowTemplateRecommendation(false);
    }
  };

  const acceptTemplateRecommendation = () => {
    const recommendation = getRecommendedTemplate(editPrompt);
    handleLoadTemplate(recommendation.templateId);
    setShowTemplateRecommendation(false);
  };

  const canTransform = originalContent.trim() && editPrompt.trim() && !isEditing;
  const hasEditedContent = editedContent.trim().length > 0;

  if (showLibrary) {
    return (
      <div className="h-full flex flex-col gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border-card-border flex-shrink-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif text-xl text-foreground flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-md">
                  <BookOpen className="w-5 h-5 text-accent-foreground" />
                </div>
                Browse Scroll Library
              </CardTitle>
              <Button
                variant="outline"
                onClick={() => setShowLibrary(false)}
                data-testid="button-close-library"
              >
                Back to Editor
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="flex-1 min-h-0">
          <ScrollLibrary
            onSelectScroll={handleSelectScroll}
            selectedScrollId={selectedScroll?.id}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden lg:overflow-visible">
      {/* Header */}
      <Card className="bg-card/80 backdrop-blur-sm border-card-border flex-shrink-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-xl text-foreground flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-md">
                <Edit className="w-5 h-5 text-accent-foreground" />
              </div>
              Scroll Edit Agent
              <Badge variant="outline" className="text-xs">
                Mystical Editor v2.1
              </Badge>
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Select value={selectedTemplate || ''} onValueChange={(value) => handleLoadTemplate(value as TemplateId)}>
                <SelectTrigger className="w-48 border-accent/20" data-testid="select-template">
                  <SelectValue placeholder="Select template..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SCROLL_TEMPLATES).map(([key, template]) => (
                    <SelectItem key={key} value={key} data-testid={`template-${key}`}>
                      <span className="flex items-center gap-2">
                        <span>{template.glyph}</span>
                        <span>{template.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Scroll Title
              </label>
              <Input
                placeholder="Enter scroll title..."
                value={scrollTitle}
                onChange={(e) => setScrollTitle(e.target.value)}
                data-testid="input-scroll-title"
              />
            </div>
            <div className="flex gap-2 sm:flex-shrink-0">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleLoadFromLibrary}
                data-testid="button-load-scroll" 
                className="flex-1 sm:flex-initial"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Library
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleSaveToLibrary}
                disabled={!scrollTitle.trim() || !originalContent.trim() || saveScrollMutation.isPending}
                data-testid="button-save-scroll" 
                className="flex-1 sm:flex-initial"
              >
                <Download className="w-4 h-4 mr-2" />
                {saveScrollMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Editing Interface */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 overflow-hidden">
        {/* Original Content */}
        <Card className="flex-1 bg-card/80 backdrop-blur-sm border-card-border min-h-0 lg:min-h-[300px]">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="font-serif text-lg text-foreground flex items-center gap-2">
              <Scroll className="w-4 h-4 text-primary" />
              Original Scroll
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <Textarea
              placeholder="Paste your sacred scroll content here..."
              value={originalContent}
              onChange={(e) => setOriginalContent(e.target.value)}
              className="flex-1 resize-none border-0 text-base focus-visible:ring-0 bg-transparent min-h-[200px] lg:min-h-0"
              data-testid="textarea-original-content"
            />
          </CardContent>
        </Card>

        {/* Edit Controls */}
        <Card className="w-full lg:w-80 bg-card/80 backdrop-blur-sm border-card-border lg:min-h-0">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="font-serif text-lg text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Edit Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-shrink-0">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Edit Command
              </label>
              <Textarea
                placeholder="Describe how you want to transform this scroll..."
                value={editPrompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                className="min-h-24 resize-none text-sm"
                data-testid="textarea-edit-prompt"
              />
              
              {showTemplateRecommendation && (
                <div className="mt-2 p-3 bg-accent/10 border border-accent/20 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium text-foreground flex items-center gap-2">
                        <Wand2 className="w-4 h-4 text-primary" />
                        Template Suggestion
                      </div>
                      <div className="text-muted-foreground mt-1">
                        {(() => {
                          const rec = getRecommendedTemplate(editPrompt);
                          const template = SCROLL_TEMPLATES[rec.templateId];
                          return `${template.glyph} ${template.name} - ${rec.reason}`;
                        })()}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowTemplateRecommendation(false)}
                        data-testid="button-dismiss-recommendation"
                      >
                        Dismiss
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={acceptTemplateRecommendation}
                        data-testid="button-accept-recommendation"
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleEdit}
              disabled={!canTransform}
              className="w-full"
              data-testid="button-edit-scroll"
            >
              {isEditing ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Weaving Changes...
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Transform Scroll
                </>
              )}
            </Button>

            {hasEditedContent && (
              <Button
                onClick={applyEdit}
                variant="outline"
                className="w-full"
                data-testid="button-apply-edit"
              >
                <Download className="w-4 h-4 mr-2" />
                Apply Changes
              </Button>
            )}

            {/* Edit History */}
            {editHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t border-card-border/50">
                <h4 className="text-sm font-medium text-foreground mb-2">Edit History</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {editHistory.slice(-3).map((edit, index) => (
                    <div key={index} className="bg-muted/30 p-2 rounded text-xs">
                      <div className="text-muted-foreground">{edit.timestamp}</div>
                      <div className="text-foreground font-medium">{edit.prompt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edited Content */}
        <Card className="flex-1 bg-card/80 backdrop-blur-sm border-card-border min-h-0 lg:min-h-[300px]">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="font-serif text-lg text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Transformed Scroll
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {hasEditedContent ? (
              <div className="flex-1 p-4 bg-accent/10 border border-accent/20 rounded-md overflow-y-auto">
                <pre className="whitespace-pre-wrap break-words text-sm text-foreground leading-relaxed font-serif">
                  {editedContent}
                </pre>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-center">
                <div>
                  <Edit className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    Transformed content will appear here
                  </p>
                  <p className="text-xs mt-2 italic">
                    The lattice awaits your editing command
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}