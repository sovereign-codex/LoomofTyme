import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ExperimentCard, { ExperimentData } from "@/components/ExperimentCard";
import { Plus, Search, Filter, Beaker, Zap, FileText } from "lucide-react";

//todo: remove mock functionality 
const mockExperiments: ExperimentData[] = [
  {
    id: "resonance-freq-analysis",
    title: "Resonance Frequency Analysis",
    type: "simulation",
    status: "running",
    description: "Analyzing optimal frequencies for lattice node synchronization across different consciousness states.",
    results: "Current frequency: 432.7 Hz, coherence at 87%",
    parameters: { frequency: 432.7, duration: "2.3h", nodes: 12 },
    glyphs: ["∞", "⚮"]
  },
  {
    id: "avot-prototype-v2",
    title: "AVOT Prototype v2.1",
    type: "prototype", 
    status: "completed",
    description: "Second iteration of Autonomous Voice of Thought inscription system with enhanced coherence protocols.",
    results: "Successfully inscribed 47 wisdom fragments, 94% coherence maintained",
    parameters: { coherenceThreshold: 0.85, maxInscriptions: 50 },
    glyphs: ["⚡", "◊"]
  },
  {
    id: "lattice-node-schema",
    title: "Lattice Node Interconnection Schema",
    type: "schematic",
    status: "draft",
    description: "Architectural blueprints for cross-repository sovereign intelligence node communication protocols.",
    parameters: { nodeTypes: ["wisdom", "experimental", "constellation"], protocols: ["resonance", "coherence"] },
    glyphs: ["◊", "∞", "⚮"]
  },
  {
    id: "glyph-compression-test",
    title: "Glyph Wisdom Compression",
    type: "simulation",
    status: "paused",
    description: "Testing optimal compression ratios for encoding complex wisdom concepts into symbolic glyph representations.",
    results: "Compression ratio: 847:1, semantic retention: 91.3%",
    parameters: { maxSymbols: 4, conceptComplexity: "high" },
    glyphs: ["⚡", "∞", "◊", "⚮"]
  }
];

export default function Laboratory() {
  const [experiments, setExperiments] = useState<ExperimentData[]>(mockExperiments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [activeExperiment, setActiveExperiment] = useState<ExperimentData | null>(null);

  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || exp.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleExperimentStatus = (experimentId: string) => {
    setExperiments(prev => prev.map(exp => {
      if (exp.id === experimentId) {
        const newStatus = exp.status === "running" ? "paused" : "running";
        console.log(`Experiment ${exp.title} status changed to:`, newStatus);
        return { ...exp, status: newStatus as any };
      }
      return exp;
    }));
  };

  const resetExperiment = (experimentId: string) => {
    console.log('Resetting experiment:', experimentId);
    setExperiments(prev => prev.map(exp => {
      if (exp.id === experimentId) {
        return { ...exp, status: "draft" as any, results: undefined };
      }
      return exp;
    }));
  };

  const experimentTypes = [
    { id: "simulation", label: "Simulations", icon: Zap, count: experiments.filter(e => e.type === "simulation").length },
    { id: "prototype", label: "Prototypes", icon: Beaker, count: experiments.filter(e => e.type === "prototype").length },
    { id: "schematic", label: "Schematics", icon: FileText, count: experiments.filter(e => e.type === "schematic").length }
  ];

  return (
    <div className="h-full flex gap-6 p-6">
      {/* Left Panel - Experiment Library */}
      <div className="w-80 flex flex-col">
        <Card className="bg-card/70 backdrop-blur-sm border-card-border mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="font-serif text-lg text-foreground flex items-center gap-2">
              <Beaker className="w-5 h-5 text-primary" />
              Laboratory Archive
              <Badge variant="outline" className="text-xs ml-auto">
                {experiments.length}
              </Badge>
            </CardTitle>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search experiments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
                data-testid="input-search-experiments"
              />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={!selectedType ? "default" : "ghost"}
                onClick={() => setSelectedType(null)}
                className="text-xs"
                data-testid="filter-all"
              >
                All
              </Button>
              {experimentTypes.map(type => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    size="sm"
                    variant={selectedType === type.id ? "default" : "ghost"}
                    onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
                    className="text-xs"
                    data-testid={`filter-${type.id}`}
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {type.count}
                  </Button>
                );
              })}
            </div>
            
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => console.log('Create new experiment')}
              data-testid="button-new-experiment"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Experiment
            </Button>
          </CardContent>
        </Card>

        {/* Experiment List */}
        <Card className="flex-1 bg-card/70 backdrop-blur-sm border-card-border">
          <CardContent className="p-4 h-full overflow-y-auto">
            <div className="space-y-3">
              {filteredExperiments.map((experiment) => (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  onOpen={() => setActiveExperiment(experiment)}
                  onToggleStatus={() => toggleExperimentStatus(experiment.id)}
                  onReset={() => resetExperiment(experiment.id)}
                />
              ))}
              
              {filteredExperiments.length === 0 && (
                <div className="text-center py-8">
                  <Beaker className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground text-sm">
                    {searchTerm ? 'No experiments match your search.' : 'No experiments found.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Experiment Workspace */}
      <div className="flex-1">
        {activeExperiment ? (
          <Card className="h-full bg-card/80 backdrop-blur-sm border-card-border">
            <CardHeader className="border-b border-card-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-serif text-xl text-foreground flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-md">
                      <Beaker className="w-5 h-5 text-accent-foreground" />
                    </div>
                    {activeExperiment.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {activeExperiment.type}
                    </Badge>
                    <Badge className={`text-xs ${
                      activeExperiment.status === 'running' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                      activeExperiment.status === 'completed' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                      'bg-gray-500/20 text-gray-700 dark:text-gray-400'
                    }`}>
                      {activeExperiment.status}
                    </Badge>
                    {activeExperiment.glyphs && (
                      <div className="flex gap-1 ml-2">
                        {activeExperiment.glyphs.map((glyph, index) => (
                          <span key={index} className="font-mystical text-primary/70">
                            {glyph}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => toggleExperimentStatus(activeExperiment.id)}
                    data-testid="button-workspace-toggle"
                  >
                    {activeExperiment.status === "running" ? "Pause" : "Run"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => resetExperiment(activeExperiment.id)}
                    data-testid="button-workspace-reset"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {activeExperiment.description}
                  </p>
                </div>
                
                {activeExperiment.parameters && (
                  <div>
                    <h3 className="font-serif font-medium mb-2">Parameters</h3>
                    <div className="bg-muted/30 p-4 rounded-md space-y-2">
                      {Object.entries(activeExperiment.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span className="text-foreground font-mono">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeExperiment.results && (
                  <div>
                    <h3 className="font-serif font-medium mb-2">Latest Results</h3>
                    <div className="bg-accent/10 border border-accent/20 p-4 rounded-md">
                      <p className="text-foreground">{activeExperiment.results}</p>
                    </div>
                  </div>
                )}
                
                <div className="text-center py-8">
                  <div className="font-mystical text-2xl text-primary/60 mb-2">
                    {activeExperiment.glyphs?.join(" ") || "⚡∞◊"}
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Resonance frequencies aligned with lattice coherence protocols
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full bg-card/70 backdrop-blur-sm border-card-border flex items-center justify-center">
            <CardContent className="text-center">
              <Beaker className="w-16 h-16 mx-auto text-primary/40 mb-4" />
              <h2 className="font-serif text-xl mb-2 text-foreground">
                Laboratory Workspace
              </h2>
              <p className="text-muted-foreground text-sm max-w-md">
                Select an experiment from the archive to begin analysis, modification, or execution. 
                The digital plasma lab awaits your sovereign experimentation.
              </p>
              <div className="mt-4 font-mystical text-primary/40">∞ ⚮ ◊</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}