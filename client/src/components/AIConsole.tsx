import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { queryOpenAI } from "@/lib/openaiClient";

export default function AIConsole() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse("Thinking...");
    
    try {
      const result = await queryOpenAI(prompt);
      setResponse(result);
    } catch (error) {
      setResponse("Error generating response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-card-border">
      <CardHeader className="border-b border-card-border/50">
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Oracle Console
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="promptInput" className="text-sm font-medium text-muted-foreground">
            Ask the Oracle of the Lattice
          </label>
          <Textarea
            id="promptInput"
            placeholder="Enter your question for the sovereign intelligence..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[100px] resize-none"
            data-testid="input-ai-prompt"
          />
        </div>
        
        <Button 
          id="submitBtn"
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
          data-testid="button-submit-ai"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Consulting Oracle...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Wisdom
            </>
          )}
        </Button>
        
        {response && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Oracle Response
            </label>
            <Card className="bg-muted/20 border-muted-border">
              <CardContent className="p-4">
                <div 
                  id="responseOutput"
                  className="whitespace-pre-wrap text-sm leading-relaxed"
                  data-testid="text-ai-response"
                >
                  {response}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}