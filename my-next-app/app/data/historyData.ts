// Define the TypeScript interface for a single question object
export interface HistoryQuestion {
    id: number;
    title: string;
    imageUrl: string;
    questionText: string;
    fullAnswerText: string;
  }
  
  // The array of all questions
  export const allHistoryQuestions: HistoryQuestion[] = [
    {
      id: 1,
      title: "Source: Carpet",
      imageUrl: "/images/sources/carpet.webp",
      questionText: "What can you infer about a historical period using this source",
      
      // --- Answer 1: FULLY FORMATTED WITH BACKTICKS (Template Literal) ---
      fullAnswerText: `1. Economy & Labor
  
  The carpet’s complexity and uniformity show it was made by highly skilled, full-time artisans, not domestic weavers.
  Indicates a structured craft economy with specialization (weavers, dyers, designers).
  Reflects a society with economic surplus capable of producing luxury, non-essential goods.
  
  2. Technology & Trade
  
  The use of vivid natural dyes (madder, indigo, etc.) shows advanced chemical and dyeing knowledge.
  Implies access to trade networks for acquiring expensive raw materials.
  Suggests technological sophistication or international trade connections.
  
  3. Aesthetics & Culture
  
  The Persianate/Islamic motifs and medallion-border design reflect the elite aesthetic tastes of the period.
  Textiles were key status symbols and architectural decorations in elite or sacred spaces.
  Shows cultural refinement and artistic tradition associated with power and prestige.
  
  4. Provenance-Based Inferences
  
  Date of Manufacture: Determines whether it represents imperial court patronage (16th century) or commercial export production (19th century).
  Geographic Origin: Links the carpet to specific regional political or artistic centers (e.g., Isfahan, Tabriz, Kerman).
  Patron/Commissioner: Reveals whether it symbolized state authority, diplomacy, or private wealth.
  Trade & Ownership History: Traces global trade routes and the spread of Oriental luxury goods.
  
  5. Major Historical Themes
  
  Social Hierarchy: Demonstrates elite patronage and wealth inequality in the society.
  Economic Structure: Evidence of a prosperous, surplus-generating economy that supported luxury production and trade.
  Cultural Exchange: If exported, the carpet represents cross-cultural influence and global demand for Persian artistry.`,
    },
    {
      id: 2,
      title: "Source: Douglas Speech",
      imageUrl: "/images/sources/americanspeech.jpeg",
      questionText: "What does this speech tell us about the historical period?",
      
      // --- Answer 2: FULLY FORMATTED WITH BACKTICKS (Template Literal) ---
      fullAnswerText: `WHAT I CAN DETERMINE FROM THE SOURCE ITSELF
  
  Date & Occasion: The speech was delivered on July 4th (Independence Day) at what appears to be a public celebration. The speaker was invited to address an audience, suggesting he held some authority or reputation.
  
  Speaker's Identity: While the speaker isn't named in this excerpt, he identifies himself as part of an enslaved or formerly enslaved population ("those I represent," "the American bondman"). He's literate, eloquent, and comfortable addressing a large audience—which tells me this was an unusual and significant figure, likely someone who had escaped slavery or was freed.
  
  The Historical Problem: The core issue is slavery. The speaker is pointing out a fundamental contradiction: America claims to be founded on freedom and natural justice (the Declaration of Independence), yet millions of people are enslaved. He's saying this contradiction is so obvious and so offensive that it makes the nation's entire moral system hypocritical.
  
  The Argument: Slavery isn't just wrong for enslaved people—it corrupts everything it touches:
  - It makes the nation's republicanism "a sham"
  - It corrupts politicians and destroys moral authority
  - It stunts progress and education
  - It threatens the nation's unity and survival
  
  By arguing this way, he's trying to convince people who weren't enslaved that slavery harms them too.
  
  The Constitutional Angle: The speaker notes that slavery isn't even mentioned in the Constitution by name. He uses this to argue the Constitution should be read as a freedom document, not a pro-slavery one. This suggests slavery's defenders were using the Constitution to defend slavery, and he's reclaiming it.
  
  What This Tells Us About the Time Period:
  - Slavery was legal and widespread—the speaker refers to "millions" of enslaved people
  - There was active public debate about slavery's legitimacy (public speeches suggest this was contested)
  - There was enough opposition to slavery for abolitionists to hold public events
  - But slavery was still powerful enough that this kind of direct moral challenge was necessary and noteworthy
  
  The Overall Context: This is clearly a moment when the nation was deeply divided over slavery. The gap between American ideals and American reality had become impossible to ignore. This wasn't a settled question—it was urgent, divisive, and unresolved.`,
    },
    // Add more questions here
  ];