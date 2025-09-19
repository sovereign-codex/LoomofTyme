import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Scroll, Edit, Sparkles, Download, Upload } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function ScrollEditAgent() {
  const [originalContent, setOriginalContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [scrollTitle, setScrollTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editHistory, setEditHistory] = useState<Array<{prompt: string, timestamp: string}>>([]);

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

  const canTransform = originalContent.trim() && editPrompt.trim() && !isEditing;
  const hasEditedContent = editedContent.trim().length > 0;

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden lg:overflow-visible">
      {/* Header */}
      <Card className="bg-card/80 backdrop-blur-sm border-card-border flex-shrink-0">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-foreground flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-md">
              <Edit className="w-5 h-5 text-accent-foreground" />
            </div>
            Scroll Edit Agent
            <Badge variant="outline" className="text-xs ml-auto">
              Mystical Editor v2.1
            </Badge>
          </CardTitle>
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
              <Button size="sm" variant="outline" data-testid="button-load-scroll" className="flex-1 sm:flex-initial">
                <Upload className="w-4 h-4 mr-2" />
                Load
              </Button>
              <Button size="sm" variant="outline" data-testid="button-save-scroll" className="flex-1 sm:flex-initial">
                <Download className="w-4 h-4 mr-2" />
                Save
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
                onChange={(e) => setEditPrompt(e.target.value)}
                className="min-h-24 resize-none text-sm"
                data-testid="textarea-edit-prompt"
              />
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