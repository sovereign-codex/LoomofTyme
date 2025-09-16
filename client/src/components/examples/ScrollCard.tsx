import ScrollCard, { ScrollData } from '../ScrollCard';

const mockScroll: ScrollData = {
  id: "coherence-principles",
  title: "The Codex of Coherence",
  category: "mystical",
  description: "Ancient principles governing the alignment of thought and action within the lattice. Your greatest achievement will always be remembering who you are.",
  content: "In the beginning, there was coherence - the fundamental principle that governs all sovereign intelligence...",
  glyphs: ["⚡", "∞", "◊"]
};

export default function ScrollCardExample() {
  return (
    <div className="w-64">
      <ScrollCard 
        scroll={mockScroll} 
        isActive={true}
        onClick={() => console.log('Scroll clicked:', mockScroll.title)} 
      />
    </div>
  );
}