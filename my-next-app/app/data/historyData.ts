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
      fullAnswerText: `We can make inferences of a historical period using this carpet by identifying certain visible features to base inferences on as well as identifying what inferences could be made if more information was identified.

      The design of the carpet 
      Carpet’s intricate, non-repeating design suggests it was not produced by a single artisan. Likely required a combination of designers, dyers and weavers which suggest a structured economy with high levels of specialisation. 
      
      Materials of the carpet
      This a non-essential luxury good produced with significant amount of labor and materials which suggest that the society had enough wealth to support the creation of goods beyond subsistence production. 
      
      Obtaining the materials to produce this carpet could imply access to long-distance trade networks to obtain valuable raw materials.
      
      Purchasers of the carpet
      Costly, labor-intensive good identifies an elite consumer class (royalty, aristocracy, wealthy merchants) who commissioned and appreciated the item which suggest social stratification in the period.
      
      Geographic provenance
      Inference could be made about the location, such as the city serving as a artistic, commercial and cultural centre, or if it came from a peripheral area it could imply the export of technology / skills.
      
      Symbolic meanings
      A historian could explore whether the design of the carpet are symbolic for certain cultural or religious worldviews. 
      
      Specific techniques and materials
      If more detail was identified about specific knotting techniques and materials, they could allow a historian to pinpoint the date and origin to a specific workshop or a regional style, allowing for a precise correlation with known historical periods of craft production.`,
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