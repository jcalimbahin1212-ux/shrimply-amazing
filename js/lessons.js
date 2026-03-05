/* ============================================
   shrimpify — lesson & quiz catalog
   ============================================ */

// Each subject has categories, each category has lessons.
// Each lesson has a title, content (HTML), and a quiz array.
// Quiz questions: { q, options[], answer (0-indexed) }

// ======================== MATH ========================
const MATH_LESSONS = [
  // ---- Arithmetic Foundations ----
  { cat: "Arithmetic", title: "Addition & Subtraction Basics", content: "<p>Addition combines two or more numbers into a sum. Subtraction finds the difference between numbers.</p><p><strong>Key properties:</strong></p><ul><li><b>Commutative:</b> a + b = b + a</li><li><b>Associative:</b> (a + b) + c = a + (b + c)</li><li><b>Identity:</b> a + 0 = a</li></ul><p><strong>Example:</strong> 347 + 258 = 605. Line up place values and carry when a column exceeds 9.</p><p>For subtraction, borrow from the next column when the top digit is smaller: 605 − 347 = 258.</p>",
    quiz: [
      { q: "What is 347 + 258?", options: ["595", "605", "615", "505"], answer: 1 },
      { q: "Which property says a + b = b + a?", options: ["Associative", "Distributive", "Commutative", "Identity"], answer: 2 },
      { q: "What is 1000 − 387?", options: ["613", "623", "713", "603"], answer: 0 },
      { q: "What is the identity element for addition?", options: ["1", "0", "-1", "10"], answer: 1 }
    ]
  },
  { cat: "Arithmetic", title: "Multiplication Fundamentals", content: "<p>Multiplication is repeated addition. 4 × 5 means adding 4 five times: 4 + 4 + 4 + 4 + 4 = 20.</p><p><strong>Properties:</strong></p><ul><li><b>Commutative:</b> a × b = b × a</li><li><b>Associative:</b> (a × b) × c = a × (b × c)</li><li><b>Distributive:</b> a × (b + c) = a×b + a×c</li><li><b>Identity:</b> a × 1 = a</li><li><b>Zero property:</b> a × 0 = 0</li></ul><p><strong>Long multiplication example:</strong> 23 × 17 = 23×7 + 23×10 = 161 + 230 = 391.</p>",
    quiz: [
      { q: "What is 23 × 17?", options: ["381", "391", "401", "371"], answer: 1 },
      { q: "a × (b + c) = a×b + a×c is the ___ property.", options: ["Commutative", "Associative", "Distributive", "Identity"], answer: 2 },
      { q: "What is any number multiplied by 0?", options: ["The number itself", "1", "0", "Undefined"], answer: 2 },
      { q: "What is 12 × 12?", options: ["124", "134", "144", "154"], answer: 2 }
    ]
  },
  { cat: "Arithmetic", title: "Division & Remainders", content: "<p>Division splits a number into equal parts. 20 ÷ 4 = 5 because 4 × 5 = 20.</p><p><strong>Key terms:</strong></p><ul><li><b>Dividend:</b> the number being divided (20)</li><li><b>Divisor:</b> the number you divide by (4)</li><li><b>Quotient:</b> the result (5)</li><li><b>Remainder:</b> what's left over if division isn't exact</li></ul><p><strong>Example with remainder:</strong> 23 ÷ 5 = 4 remainder 3, because 5 × 4 = 20 and 23 − 20 = 3.</p><p>Division by zero is <b>undefined</b> — you cannot divide by zero.</p>",
    quiz: [
      { q: "What is 156 ÷ 12?", options: ["12", "13", "14", "15"], answer: 1 },
      { q: "In 23 ÷ 5, what is the remainder?", options: ["1", "2", "3", "4"], answer: 2 },
      { q: "What do you call the result of division?", options: ["Product", "Quotient", "Sum", "Remainder"], answer: 1 },
      { q: "What is any number divided by zero?", options: ["0", "1", "Infinity", "Undefined"], answer: 3 }
    ]
  },
  { cat: "Arithmetic", title: "Order of Operations (PEMDAS)", content: "<p>When an expression has multiple operations, follow <b>PEMDAS</b>:</p><ol><li><b>P</b>arentheses first</li><li><b>E</b>xponents (powers, roots)</li><li><b>M</b>ultiplication and <b>D</b>ivision (left to right)</li><li><b>A</b>ddition and <b>S</b>ubtraction (left to right)</li></ol><p><strong>Example:</strong> 3 + 4 × 2 = 3 + 8 = 11 (not 14).</p><p><strong>Example with parentheses:</strong> (3 + 4) × 2 = 7 × 2 = 14.</p><p><strong>Complex example:</strong> 2 + 3 × (4² − 6) = 2 + 3 × (16 − 6) = 2 + 3 × 10 = 2 + 30 = 32.</p>",
    quiz: [
      { q: "What is 3 + 4 × 2?", options: ["14", "11", "10", "12"], answer: 1 },
      { q: "What does the P in PEMDAS stand for?", options: ["Powers", "Parentheses", "Products", "Primes"], answer: 1 },
      { q: "Evaluate: 2 × 3² + 1", options: ["19", "37", "13", "31"], answer: 0 },
      { q: "Evaluate: (8 − 3) × 2 + 1", options: ["11", "9", "13", "10"], answer: 0 }
    ]
  },
  { cat: "Arithmetic", title: "Factors, Multiples & Primes", content: "<p><b>Factors</b> of a number divide it evenly. Factors of 12: 1, 2, 3, 4, 6, 12.</p><p><b>Multiples</b> are products of a number. Multiples of 5: 5, 10, 15, 20, 25 …</p><p><b>Prime numbers</b> have exactly two factors: 1 and themselves. First ten primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.</p><p><b>Composite numbers</b> have more than two factors (e.g., 12).</p><p><b>GCF</b> (Greatest Common Factor): largest factor shared by two numbers. GCF(12, 18) = 6.</p><p><b>LCM</b> (Least Common Multiple): smallest multiple shared. LCM(4, 6) = 12.</p>",
    quiz: [
      { q: "Which of these is a prime number?", options: ["9", "15", "17", "21"], answer: 2 },
      { q: "What is the GCF of 12 and 18?", options: ["3", "6", "9", "12"], answer: 1 },
      { q: "What is the LCM of 4 and 6?", options: ["8", "10", "12", "24"], answer: 2 },
      { q: "How many factors does 1 have?", options: ["0", "1", "2", "Infinite"], answer: 1 }
    ]
  },
  // ---- Fractions & Decimals ----
  { cat: "Fractions & Decimals", title: "Understanding Fractions", content: "<p>A <b>fraction</b> represents part of a whole: <b>numerator / denominator</b>.</p><p>3/4 means 3 out of 4 equal parts.</p><p><strong>Types:</strong></p><ul><li><b>Proper fraction:</b> numerator &lt; denominator (3/4)</li><li><b>Improper fraction:</b> numerator ≥ denominator (7/4)</li><li><b>Mixed number:</b> whole + fraction (1 3/4)</li></ul><p><b>Equivalent fractions:</b> 1/2 = 2/4 = 3/6 = 4/8. Multiply or divide both parts by the same number.</p><p><b>Simplifying:</b> Divide numerator and denominator by their GCF. 8/12 → ÷4 → 2/3.</p>",
    quiz: [
      { q: "Which is a proper fraction?", options: ["7/4", "5/3", "3/5", "9/9"], answer: 2 },
      { q: "Simplify 8/12.", options: ["4/6", "2/3", "3/4", "2/4"], answer: 1 },
      { q: "Convert 7/4 to a mixed number.", options: ["1 1/2", "1 3/4", "2 1/4", "1 1/4"], answer: 1 },
      { q: "Which fraction is equivalent to 1/2?", options: ["2/3", "3/6", "4/7", "5/9"], answer: 1 }
    ]
  },
  { cat: "Fractions & Decimals", title: "Adding & Subtracting Fractions", content: "<p><b>Same denominator:</b> Add/subtract numerators, keep denominator. 2/7 + 3/7 = 5/7.</p><p><b>Different denominators:</b> Find the LCD (Least Common Denominator), convert, then add/subtract.</p><p><strong>Example:</strong> 1/3 + 1/4</p><ol><li>LCD of 3 and 4 = 12</li><li>1/3 = 4/12, 1/4 = 3/12</li><li>4/12 + 3/12 = 7/12</li></ol><p><strong>Subtraction example:</strong> 3/4 − 1/6. LCD = 12. → 9/12 − 2/12 = 7/12.</p>",
    quiz: [
      { q: "What is 1/3 + 1/4?", options: ["2/7", "7/12", "1/7", "5/12"], answer: 1 },
      { q: "What is 5/8 − 1/8?", options: ["4/8", "1/2", "4/0", "Both A and B"], answer: 3 },
      { q: "What is the LCD of 3 and 5?", options: ["8", "15", "3", "5"], answer: 1 },
      { q: "What is 2/3 + 1/6?", options: ["3/9", "5/6", "1/2", "3/6"], answer: 1 }
    ]
  },
  { cat: "Fractions & Decimals", title: "Multiplying & Dividing Fractions", content: "<p><b>Multiplication:</b> Multiply numerators together and denominators together.</p><p>2/3 × 4/5 = 8/15</p><p><b>Division:</b> Multiply by the reciprocal (flip the second fraction).</p><p>2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6</p><p><strong>Mixed numbers:</strong> Convert to improper fractions first.</p><p>1 1/2 × 2/3 = 3/2 × 2/3 = 6/6 = 1</p>",
    quiz: [
      { q: "What is 2/3 × 4/5?", options: ["6/8", "8/15", "8/8", "6/15"], answer: 1 },
      { q: "What is the reciprocal of 3/7?", options: ["3/7", "7/3", "-3/7", "1/3"], answer: 1 },
      { q: "What is 1/2 ÷ 1/4?", options: ["1/8", "1/2", "2", "4"], answer: 2 },
      { q: "What is 3/4 × 2/3?", options: ["6/12", "1/2", "5/7", "Both A and B"], answer: 3 }
    ]
  },
  { cat: "Fractions & Decimals", title: "Decimals & Place Value", content: "<p>Decimals represent parts using powers of ten.</p><p><b>Place values:</b> ones . tenths hundredths thousandths</p><p>3.456 → 3 ones, 4 tenths, 5 hundredths, 6 thousandths</p><p><b>Converting fraction → decimal:</b> Divide numerator by denominator. 3/8 = 0.375</p><p><b>Converting decimal → fraction:</b> 0.75 = 75/100 = 3/4</p><p><b>Comparing decimals:</b> Line up decimal points and compare digit by digit from left. 0.45 > 0.449.</p>",
    quiz: [
      { q: "What is 3/8 as a decimal?", options: ["0.375", "0.38", "0.35", "0.3"], answer: 0 },
      { q: "What is 0.75 as a fraction (simplified)?", options: ["75/100", "3/4", "7/10", "15/20"], answer: 1 },
      { q: "In 4.567, what digit is in the hundredths place?", options: ["5", "6", "7", "4"], answer: 1 },
      { q: "Which is greater: 0.7 or 0.69?", options: ["0.69", "0.7", "They're equal", "Cannot determine"], answer: 1 }
    ]
  },
  { cat: "Fractions & Decimals", title: "Percents", content: "<p>A <b>percent</b> means 'per hundred.' 25% = 25/100 = 0.25.</p><p><strong>Conversions:</strong></p><ul><li>Percent → decimal: divide by 100 (45% = 0.45)</li><li>Decimal → percent: multiply by 100 (0.8 = 80%)</li><li>Fraction → percent: divide then multiply by 100 (3/5 = 0.6 = 60%)</li></ul><p><strong>Finding a percent of a number:</strong> 30% of 200 = 0.30 × 200 = 60.</p><p><strong>Percent increase/decrease:</strong> Change ÷ Original × 100%. Price went from $50 to $60 → increase = 10/50 × 100 = 20%.</p>",
    quiz: [
      { q: "What is 25% as a decimal?", options: ["2.5", "0.025", "0.25", "25.0"], answer: 2 },
      { q: "What is 30% of 200?", options: ["30", "60", "90", "6"], answer: 1 },
      { q: "Convert 3/5 to a percent.", options: ["35%", "53%", "60%", "65%"], answer: 2 },
      { q: "A price increases from $40 to $50. What is the percent increase?", options: ["10%", "20%", "25%", "50%"], answer: 2 }
    ]
  },
  // ---- Pre-Algebra ----
  { cat: "Pre-Algebra", title: "Integers & the Number Line", content: "<p><b>Integers</b> include positive numbers, negative numbers, and zero: … −3, −2, −1, 0, 1, 2, 3 …</p><p><strong>Rules for operations:</strong></p><ul><li>Adding positive: move right on number line</li><li>Adding negative: move left</li><li>Subtracting = adding the opposite: 5 − (−3) = 5 + 3 = 8</li><li>Negative × Negative = Positive</li><li>Negative × Positive = Negative</li></ul><p><strong>Absolute value</strong> |−7| = 7 (distance from zero, always positive).</p>",
    quiz: [
      { q: "What is 5 − (−3)?", options: ["2", "8", "-8", "-2"], answer: 1 },
      { q: "What is (−4) × (−6)?", options: ["-24", "-10", "24", "10"], answer: 2 },
      { q: "What is |−12|?", options: ["-12", "12", "0", "1"], answer: 1 },
      { q: "What is (−3) + (−8)?", options: ["11", "5", "-5", "-11"], answer: 3 }
    ]
  },
  { cat: "Pre-Algebra", title: "Variables & Expressions", content: "<p>A <b>variable</b> is a letter representing an unknown value. In the expression 3x + 5:</p><ul><li><b>3</b> is the coefficient</li><li><b>x</b> is the variable</li><li><b>5</b> is a constant</li><li><b>3x</b> and <b>5</b> are terms</li></ul><p><b>Evaluating expressions:</b> Substitute the value and compute. If x = 4: 3(4) + 5 = 12 + 5 = 17.</p><p><b>Like terms:</b> Terms with the same variable and exponent. 3x + 5x = 8x. You cannot combine 3x + 5y.</p>",
    quiz: [
      { q: "In 3x + 5, what is the coefficient of x?", options: ["x", "5", "3", "3x"], answer: 2 },
      { q: "If x = 4, what is 3x + 5?", options: ["12", "17", "20", "35"], answer: 1 },
      { q: "Simplify: 5x + 3x", options: ["8x", "15x", "8x²", "53x"], answer: 0 },
      { q: "Which are like terms?", options: ["3x and 3y", "5x and 2x", "x and x²", "2 and 2x"], answer: 1 }
    ]
  },
  { cat: "Pre-Algebra", title: "Solving One-Step Equations", content: "<p>An <b>equation</b> has an equal sign. Solve by isolating the variable using inverse operations.</p><p><strong>Addition/Subtraction:</strong></p><ul><li>x + 7 = 12 → x = 12 − 7 → x = 5</li><li>x − 3 = 10 → x = 10 + 3 → x = 13</li></ul><p><strong>Multiplication/Division:</strong></p><ul><li>4x = 20 → x = 20 ÷ 4 → x = 5</li><li>x/3 = 6 → x = 6 × 3 → x = 18</li></ul><p>Always check your answer by plugging it back in!</p>",
    quiz: [
      { q: "Solve: x + 7 = 15", options: ["x = 7", "x = 8", "x = 22", "x = 9"], answer: 1 },
      { q: "Solve: 5x = 35", options: ["x = 5", "x = 6", "x = 7", "x = 30"], answer: 2 },
      { q: "Solve: x/4 = 9", options: ["x = 13", "x = 36", "x = 5", "x = 2.25"], answer: 1 },
      { q: "Solve: x − 11 = 3", options: ["x = 8", "x = 14", "x = -8", "x = 33"], answer: 1 }
    ]
  },
  { cat: "Pre-Algebra", title: "Solving Two-Step Equations", content: "<p>Two-step equations require two inverse operations. Always undo addition/subtraction first, then multiplication/division.</p><p><strong>Example:</strong> 2x + 5 = 13</p><ol><li>Subtract 5: 2x = 8</li><li>Divide by 2: x = 4</li></ol><p><strong>Example:</strong> (x/3) − 4 = 2</p><ol><li>Add 4: x/3 = 6</li><li>Multiply by 3: x = 18</li></ol><p><strong>With negatives:</strong> −3x + 7 = 1 → −3x = −6 → x = 2.</p>",
    quiz: [
      { q: "Solve: 2x + 5 = 13", options: ["x = 4", "x = 9", "x = 3", "x = 6"], answer: 0 },
      { q: "Solve: 3x − 7 = 14", options: ["x = 7", "x = 3", "x = 21", "x = 6"], answer: 0 },
      { q: "Solve: x/4 + 3 = 8", options: ["x = 20", "x = 44", "x = 2", "x = 11"], answer: 0 },
      { q: "Solve: −2x + 10 = 4", options: ["x = -3", "x = 3", "x = 7", "x = -7"], answer: 1 }
    ]
  },
  { cat: "Pre-Algebra", title: "Inequalities", content: "<p>An <b>inequality</b> compares values: &lt; (less than), &gt; (greater than), ≤ (less than or equal), ≥ (greater than or equal).</p><p>Solved like equations, except: <b>flip the sign when multiplying/dividing by a negative number</b>.</p><p><strong>Example:</strong> x + 3 > 7 → x > 4. Any number greater than 4 is a solution.</p><p><strong>Example with flip:</strong> −2x < 6 → x > −3 (divided by −2, flip sign).</p><p>On a number line: open circle for &lt; and &gt;, closed circle for ≤ and ≥.</p>",
    quiz: [
      { q: "Solve: x + 5 > 12", options: ["x > 7", "x > 17", "x < 7", "x > 6"], answer: 0 },
      { q: "Solve: −3x ≤ 9", options: ["x ≤ -3", "x ≥ -3", "x ≤ 3", "x ≥ 3"], answer: 1 },
      { q: "When do you flip an inequality sign?", options: ["Adding a negative", "Subtracting", "Multiplying/dividing by a negative", "Never"], answer: 2 },
      { q: "Which graph uses an open circle?", options: ["x ≥ 3", "x ≤ 3", "x > 3", "x = 3"], answer: 2 }
    ]
  },
  { cat: "Pre-Algebra", title: "Ratios & Proportions", content: "<p>A <b>ratio</b> compares two quantities. 3 to 5 can be written 3:5 or 3/5.</p><p>A <b>proportion</b> says two ratios are equal: a/b = c/d.</p><p><b>Cross-multiplication:</b> a × d = b × c. Used to solve for unknowns.</p><p><strong>Example:</strong> 3/5 = x/20 → 3 × 20 = 5 × x → 60 = 5x → x = 12.</p><p><b>Unit rates:</b> Ratio per one unit. 240 miles in 4 hours = 60 mph.</p>",
    quiz: [
      { q: "Solve: 3/5 = x/20", options: ["x = 10", "x = 12", "x = 15", "x = 4"], answer: 1 },
      { q: "What is the unit rate of 240 miles in 4 hours?", options: ["40 mph", "60 mph", "80 mph", "120 mph"], answer: 1 },
      { q: "In cross-multiplication, a/b = c/d becomes:", options: ["a+d = b+c", "a×d = b×c", "a×b = c×d", "a−d = b−c"], answer: 1 },
      { q: "Simplify the ratio 12:8", options: ["6:4", "3:2", "4:3", "12:8"], answer: 1 }
    ]
  },
  // ---- Algebra ----
  { cat: "Algebra", title: "Linear Equations & Graphing", content: "<p>A <b>linear equation</b> graphs as a straight line. Standard form: <b>y = mx + b</b> (slope-intercept form).</p><ul><li><b>m</b> = slope (rise over run)</li><li><b>b</b> = y-intercept (where line crosses y-axis)</li></ul><p><strong>Slope formula:</strong> m = (y₂ − y₁) / (x₂ − x₁)</p><p><strong>Example:</strong> Points (1, 2) and (3, 8): m = (8−2)/(3−1) = 6/2 = 3.</p><p>Positive slope: line goes up. Negative slope: line goes down. Zero slope: horizontal. Undefined: vertical.</p>",
    quiz: [
      { q: "In y = 3x + 2, what is the slope?", options: ["2", "3", "5", "x"], answer: 1 },
      { q: "In y = 3x + 2, what is the y-intercept?", options: ["3", "2", "0", "5"], answer: 1 },
      { q: "Find the slope between (2, 4) and (6, 12).", options: ["2", "4", "8", "3"], answer: 0 },
      { q: "A horizontal line has ___ slope.", options: ["Positive", "Negative", "Zero", "Undefined"], answer: 2 }
    ]
  },
  { cat: "Algebra", title: "Systems of Linear Equations", content: "<p>A <b>system</b> has two or more equations with the same variables. The solution is where they intersect.</p><p><strong>Substitution method:</strong></p><ol><li>Solve one equation for a variable</li><li>Substitute into the other equation</li></ol><p><strong>Example:</strong> y = 2x + 1 and y = −x + 7</p><p>Set equal: 2x + 1 = −x + 7 → 3x = 6 → x = 2. Then y = 2(2)+1 = 5. Solution: (2, 5).</p><p><strong>Elimination:</strong> Add/subtract equations to eliminate a variable.</p>",
    quiz: [
      { q: "Solve: y = 2x + 1 and y = −x + 7. What is x?", options: ["1", "2", "3", "4"], answer: 1 },
      { q: "What does the solution of a system represent graphically?", options: ["Parallel lines", "The y-intercept", "Point of intersection", "The slope"], answer: 2 },
      { q: "If two lines are parallel, how many solutions?", options: ["0", "1", "2", "Infinite"], answer: 0 },
      { q: "If two equations are the same line, how many solutions?", options: ["0", "1", "2", "Infinite"], answer: 3 }
    ]
  },
  { cat: "Algebra", title: "Exponents & Powers", content: "<p>An exponent tells how many times to use the base as a factor. 2³ = 2 × 2 × 2 = 8.</p><p><strong>Rules:</strong></p><ul><li>aᵐ × aⁿ = aᵐ⁺ⁿ (Product rule)</li><li>aᵐ / aⁿ = aᵐ⁻ⁿ (Quotient rule)</li><li>(aᵐ)ⁿ = aᵐˣⁿ (Power rule)</li><li>a⁰ = 1 (any non-zero base)</li><li>a⁻ⁿ = 1/aⁿ (Negative exponent)</li></ul><p><strong>Example:</strong> 3² × 3⁴ = 3⁶ = 729.</p><p><strong>Example:</strong> 5⁻² = 1/25.</p>",
    quiz: [
      { q: "What is 2⁵?", options: ["16", "32", "64", "10"], answer: 1 },
      { q: "Simplify: x³ × x⁴", options: ["x⁷", "x¹²", "x¹", "2x⁷"], answer: 0 },
      { q: "What is 7⁰?", options: ["0", "7", "1", "Undefined"], answer: 2 },
      { q: "What is 3⁻²?", options: ["-9", "1/9", "-6", "9"], answer: 1 }
    ]
  },
  { cat: "Algebra", title: "Polynomials", content: "<p>A <b>polynomial</b> is a sum of terms with variables raised to whole-number exponents.</p><ul><li><b>Monomial:</b> 1 term (5x²)</li><li><b>Binomial:</b> 2 terms (3x + 4)</li><li><b>Trinomial:</b> 3 terms (x² + 3x + 2)</li></ul><p><b>Degree:</b> Highest exponent. Degree of 4x³ + 2x − 1 is 3.</p><p><b>Adding:</b> Combine like terms. (3x² + 2x) + (5x² − x) = 8x² + x.</p><p><b>Multiplying:</b> FOIL for binomials. (x+2)(x+3) = x² + 3x + 2x + 6 = x² + 5x + 6.</p>",
    quiz: [
      { q: "What is the degree of 4x³ + 2x − 1?", options: ["1", "2", "3", "4"], answer: 2 },
      { q: "Expand (x+2)(x+3):", options: ["x²+5x+6", "x²+6x+5", "x²+5x+5", "2x+6"], answer: 0 },
      { q: "What type of polynomial is 3x + 4?", options: ["Monomial", "Binomial", "Trinomial", "Quadrinomial"], answer: 1 },
      { q: "Simplify: (2x² + 3x) + (4x² − x)", options: ["6x² + 2x", "6x² + 4x", "8x² + 2x", "6x⁴ + 2x"], answer: 0 }
    ]
  },
  { cat: "Algebra", title: "Factoring Polynomials", content: "<p><b>Factoring</b> is the reverse of multiplying. Break a polynomial into a product of simpler expressions.</p><p><strong>GCF first:</strong> 6x² + 9x = 3x(2x + 3)</p><p><strong>Factoring trinomials (x² + bx + c):</strong> Find two numbers that multiply to c and add to b.</p><p>x² + 5x + 6: numbers are 2 and 3 → (x+2)(x+3).</p><p><strong>Difference of squares:</strong> a² − b² = (a+b)(a−b). Example: x² − 9 = (x+3)(x−3).</p><p><strong>Perfect square trinomial:</strong> a² + 2ab + b² = (a+b)². Example: x² + 6x + 9 = (x+3)².</p>",
    quiz: [
      { q: "Factor: x² + 5x + 6", options: ["(x+1)(x+6)", "(x+2)(x+3)", "(x+5)(x+1)", "(x−2)(x−3)"], answer: 1 },
      { q: "Factor: x² − 16", options: ["(x+4)(x−4)", "(x+8)(x−2)", "(x−4)²", "(x+16)(x−1)"], answer: 0 },
      { q: "Factor out the GCF: 10x³ + 15x²", options: ["5x(2x²+3x)", "5x²(2x+3)", "10x²(x+1.5)", "x²(10x+15)"], answer: 1 },
      { q: "Factor: x² + 10x + 25", options: ["(x+5)(x+5)", "(x+10)(x+2.5)", "(x+25)(x+1)", "(x+5)(x−5)"], answer: 0 }
    ]
  },
  { cat: "Algebra", title: "Quadratic Equations", content: "<p>A <b>quadratic equation</b> has the form ax² + bx + c = 0.</p><p><strong>Solving methods:</strong></p><ol><li><b>Factoring:</b> x² − 5x + 6 = 0 → (x−2)(x−3) = 0 → x = 2 or x = 3</li><li><b>Quadratic formula:</b> x = (−b ± √(b²−4ac)) / 2a</li><li><b>Completing the square</b></li></ol><p><b>Discriminant</b> (b²−4ac) tells the number of solutions:</p><ul><li>Positive: 2 real solutions</li><li>Zero: 1 real solution</li><li>Negative: no real solutions</li></ul>",
    quiz: [
      { q: "Solve: x² − 5x + 6 = 0", options: ["x=1, x=6", "x=2, x=3", "x=-2, x=-3", "x=5, x=1"], answer: 1 },
      { q: "What is the quadratic formula?", options: ["x = -b/2a", "x = (-b ± √(b²-4ac))/2a", "x = b² - 4ac", "x = -b ± √c"], answer: 1 },
      { q: "If the discriminant is negative, how many real solutions?", options: ["0", "1", "2", "Infinite"], answer: 0 },
      { q: "What is the vertex form of a quadratic?", options: ["y = ax² + bx + c", "y = a(x-h)² + k", "y = mx + b", "y = a/x"], answer: 1 }
    ]
  },
  // ---- Geometry ----
  { cat: "Geometry", title: "Points, Lines & Angles", content: "<p><b>Point:</b> A location with no size, labeled with a capital letter (A).</p><p><b>Line:</b> Extends infinitely in both directions. Named by two points (AB) or a lowercase letter.</p><p><b>Ray:</b> Starts at a point, extends infinitely in one direction.</p><p><b>Line segment:</b> Part of a line between two endpoints.</p><p><strong>Angle types:</strong></p><ul><li><b>Acute:</b> less than 90°</li><li><b>Right:</b> exactly 90°</li><li><b>Obtuse:</b> between 90° and 180°</li><li><b>Straight:</b> exactly 180°</li></ul><p><b>Complementary angles</b> add to 90°. <b>Supplementary angles</b> add to 180°.</p>",
    quiz: [
      { q: "An angle of 45° is classified as:", options: ["Right", "Obtuse", "Acute", "Straight"], answer: 2 },
      { q: "Complementary angles add up to:", options: ["90°", "180°", "270°", "360°"], answer: 0 },
      { q: "What is a line segment?", options: ["Extends infinitely both ways", "Has one endpoint", "Has two endpoints", "A curved path"], answer: 2 },
      { q: "The supplement of a 60° angle is:", options: ["30°", "90°", "120°", "300°"], answer: 2 }
    ]
  },
  { cat: "Geometry", title: "Triangles", content: "<p><strong>By sides:</strong></p><ul><li><b>Equilateral:</b> all 3 sides equal, all angles 60°</li><li><b>Isosceles:</b> 2 sides equal</li><li><b>Scalene:</b> no sides equal</li></ul><p><strong>By angles:</strong></p><ul><li><b>Acute:</b> all angles &lt; 90°</li><li><b>Right:</b> one angle = 90°</li><li><b>Obtuse:</b> one angle &gt; 90°</li></ul><p><b>Angle sum:</b> The three interior angles always add to <b>180°</b>.</p><p><b>Area = ½ × base × height.</b> If b = 10 and h = 6, area = ½ × 10 × 6 = 30.</p><p><b>Pythagorean theorem</b> (right triangles): a² + b² = c² where c is the hypotenuse.</p>",
    quiz: [
      { q: "The angles in a triangle add up to:", options: ["90°", "180°", "270°", "360°"], answer: 1 },
      { q: "A triangle with all sides equal is:", options: ["Scalene", "Isosceles", "Equilateral", "Right"], answer: 2 },
      { q: "What is the area of a triangle with base 8 and height 5?", options: ["40", "20", "13", "30"], answer: 1 },
      { q: "In a right triangle with legs 3 and 4, the hypotenuse is:", options: ["5", "7", "6", "12"], answer: 0 }
    ]
  },
  { cat: "Geometry", title: "Circles", content: "<p><b>Radius (r):</b> Distance from center to edge. <b>Diameter (d):</b> Distance across through center = 2r.</p><p><b>π (pi)</b> ≈ 3.14159...</p><p><strong>Formulas:</strong></p><ul><li><b>Circumference</b> = 2πr = πd</li><li><b>Area</b> = πr²</li></ul><p><strong>Example:</strong> r = 5 → Circumference = 2π(5) = 10π ≈ 31.4. Area = π(5²) = 25π ≈ 78.5.</p><p><b>Chord:</b> Line segment with endpoints on the circle. <b>Arc:</b> Part of the circumference. <b>Sector:</b> Pie-slice area = (θ/360)πr².</p>",
    quiz: [
      { q: "What is the area of a circle with radius 4?", options: ["8π", "16π", "4π", "64π"], answer: 1 },
      { q: "What is the circumference of a circle with diameter 10?", options: ["5π", "10π", "20π", "100π"], answer: 1 },
      { q: "The diameter is ___ times the radius.", options: ["π", "1", "2", "4"], answer: 2 },
      { q: "A chord passes through the center. What is it called?", options: ["Radius", "Arc", "Diameter", "Tangent"], answer: 2 }
    ]
  },
  { cat: "Geometry", title: "Area & Perimeter", content: "<p><strong>Rectangle:</strong> Area = l × w. Perimeter = 2l + 2w.</p><p><strong>Square:</strong> Area = s². Perimeter = 4s.</p><p><strong>Parallelogram:</strong> Area = base × height.</p><p><strong>Trapezoid:</strong> Area = ½(b₁ + b₂) × h.</p><p><strong>Triangle:</strong> Area = ½ × base × height.</p><p><strong>Circle:</strong> Area = πr². Circumference = 2πr.</p><p><strong>Composite shapes:</strong> Break into simpler shapes, calculate each, then add/subtract.</p>",
    quiz: [
      { q: "What is the area of a rectangle 8 × 5?", options: ["26", "40", "13", "80"], answer: 1 },
      { q: "What is the perimeter of a square with side 7?", options: ["14", "28", "49", "7"], answer: 1 },
      { q: "Area of a trapezoid with bases 6 and 10, height 4?", options: ["24", "32", "40", "16"], answer: 1 },
      { q: "Area of a parallelogram with base 9 and height 3?", options: ["12", "27", "18", "6"], answer: 1 }
    ]
  },
  { cat: "Geometry", title: "Volume & Surface Area", content: "<p><strong>Rectangular prism:</strong> V = l × w × h. SA = 2(lw + lh + wh).</p><p><strong>Cube:</strong> V = s³. SA = 6s².</p><p><strong>Cylinder:</strong> V = πr²h. SA = 2πr² + 2πrh.</p><p><strong>Sphere:</strong> V = (4/3)πr³. SA = 4πr².</p><p><strong>Cone:</strong> V = (1/3)πr²h.</p><p><strong>Pyramid:</strong> V = (1/3) × base area × h.</p><p><strong>Example:</strong> Cube with side 3: V = 27, SA = 54.</p>",
    quiz: [
      { q: "Volume of a cube with side 4?", options: ["16", "64", "48", "96"], answer: 1 },
      { q: "Volume of a cylinder with r=3, h=10?", options: ["30π", "90π", "60π", "9π"], answer: 1 },
      { q: "Surface area of a cube with side 5?", options: ["25", "125", "150", "100"], answer: 2 },
      { q: "Volume of a sphere with r=3?", options: ["36π", "27π", "113.1", "Both A and C"], answer: 0 }
    ]
  },
  { cat: "Geometry", title: "Transformations", content: "<p><b>Translation:</b> Slide a shape without changing size or orientation. (x, y) → (x+a, y+b).</p><p><b>Reflection:</b> Flip over a line (axis of symmetry). Over x-axis: (x, y) → (x, −y). Over y-axis: (x, y) → (−x, y).</p><p><b>Rotation:</b> Turn around a point. 90° clockwise: (x, y) → (y, −x). 180°: (x, y) → (−x, −y).</p><p><b>Dilation:</b> Resize by a scale factor k. (x, y) → (kx, ky). k &gt; 1 enlarges, 0 &lt; k &lt; 1 shrinks.</p><p>Translations, reflections, and rotations are <b>rigid motions</b> (preserve size). Dilations are not.</p>",
    quiz: [
      { q: "Reflecting (3, 4) over the x-axis gives:", options: ["(-3, 4)", "(3, -4)", "(-3, -4)", "(4, 3)"], answer: 1 },
      { q: "Which transformation changes the size?", options: ["Translation", "Reflection", "Rotation", "Dilation"], answer: 3 },
      { q: "A translation is also called a:", options: ["Flip", "Turn", "Slide", "Stretch"], answer: 2 },
      { q: "Rotating (1, 0) by 90° counterclockwise gives:", options: ["(0, 1)", "(0, -1)", "(-1, 0)", "(1, 0)"], answer: 0 }
    ]
  },
  // ---- Statistics & Probability ----
  { cat: "Statistics & Probability", title: "Mean, Median, Mode & Range", content: "<p><b>Mean (average):</b> Sum of all values ÷ number of values. {2, 4, 6, 8, 10}: mean = 30/5 = 6.</p><p><b>Median:</b> Middle value when sorted. Odd count: middle number. Even count: average of two middle numbers.</p><p><b>Mode:</b> Most frequent value. Can have no mode, one mode, or multiple modes.</p><p><b>Range:</b> Maximum − Minimum. {2, 4, 6, 8, 10}: range = 10 − 2 = 8.</p><p><b>Outliers</b> are extreme values that can heavily affect the mean but not the median.</p>",
    quiz: [
      { q: "Mean of {3, 5, 7, 9, 11}?", options: ["5", "7", "8", "9"], answer: 1 },
      { q: "Median of {2, 4, 7, 8, 12}?", options: ["4", "7", "8", "6"], answer: 1 },
      { q: "Mode of {3, 5, 5, 7, 8, 5}?", options: ["3", "5", "7", "8"], answer: 1 },
      { q: "Which measure is most affected by outliers?", options: ["Mean", "Median", "Mode", "Range"], answer: 0 }
    ]
  },
  { cat: "Statistics & Probability", title: "Probability Basics", content: "<p><b>Probability</b> = favorable outcomes / total possible outcomes. Always between 0 and 1 (or 0% to 100%).</p><p>P(event) = 0 means impossible. P(event) = 1 means certain.</p><p><strong>Coin flip:</strong> P(heads) = 1/2 = 50%.</p><p><strong>Dice roll:</strong> P(rolling a 3) = 1/6 ≈ 16.7%.</p><p><b>Complement:</b> P(not A) = 1 − P(A). If P(rain) = 0.3, P(no rain) = 0.7.</p><p><b>Independent events:</b> P(A and B) = P(A) × P(B). Two coins: P(both heads) = 1/2 × 1/2 = 1/4.</p>",
    quiz: [
      { q: "Probability of rolling a 5 on a fair die?", options: ["1/5", "1/6", "1/3", "5/6"], answer: 1 },
      { q: "If P(rain) = 0.4, what is P(no rain)?", options: ["0.4", "0.6", "1.0", "0.04"], answer: 1 },
      { q: "P(both heads) with two fair coins?", options: ["1/2", "1/3", "1/4", "1/8"], answer: 2 },
      { q: "A probability of 0 means the event is:", options: ["Certain", "Likely", "Unlikely", "Impossible"], answer: 3 }
    ]
  },
  // ---- Trigonometry ----
  { cat: "Trigonometry", title: "Intro to Trigonometry (SOH-CAH-TOA)", content: "<p>In a right triangle, the three primary trig ratios relate an angle θ to side lengths:</p><ul><li><b>SOH:</b> sin(θ) = Opposite / Hypotenuse</li><li><b>CAH:</b> cos(θ) = Adjacent / Hypotenuse</li><li><b>TOA:</b> tan(θ) = Opposite / Adjacent</li></ul><p><strong>Example:</strong> Right triangle with angle θ, opposite = 3, hypotenuse = 5.</p><p>sin(θ) = 3/5 = 0.6, cos(θ) = 4/5 = 0.8, tan(θ) = 3/4 = 0.75.</p><p><b>Special angles:</b> sin(30°) = 1/2, cos(60°) = 1/2, tan(45°) = 1.</p>",
    quiz: [
      { q: "sin(θ) equals:", options: ["Adjacent/Hypotenuse", "Opposite/Hypotenuse", "Opposite/Adjacent", "Hypotenuse/Opposite"], answer: 1 },
      { q: "What is tan(45°)?", options: ["0", "1/2", "1", "√2"], answer: 2 },
      { q: "In SOH-CAH-TOA, CAH stands for:", options: ["Cosine = Adj/Hyp", "Cosine = Adj/Opp", "Cotangent = Adj/Hyp", "Cosine = Hyp/Adj"], answer: 0 },
      { q: "What is sin(30°)?", options: ["0", "1/2", "√2/2", "√3/2"], answer: 1 }
    ]
  },
  { cat: "Trigonometry", title: "Unit Circle & Radians", content: "<p>The <b>unit circle</b> has radius 1 centered at origin. Any point on it is (cos θ, sin θ).</p><p><b>Radians</b> measure angles using the radius. Full circle = 2π radians = 360°.</p><p><strong>Conversions:</strong></p><ul><li>Degrees → radians: multiply by π/180</li><li>Radians → degrees: multiply by 180/π</li></ul><p><strong>Key angles:</strong> 0° = 0, 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π, 360° = 2π.</p>",
    quiz: [
      { q: "90° in radians is:", options: ["π", "π/2", "2π", "π/4"], answer: 1 },
      { q: "On the unit circle, cos(0°) = ?", options: ["0", "1", "-1", "1/2"], answer: 1 },
      { q: "How many radians in a full circle?", options: ["π", "2π", "π/2", "4π"], answer: 1 },
      { q: "Convert 60° to radians:", options: ["π/6", "π/4", "π/3", "π/2"], answer: 2 }
    ]
  }
];

// ======================== PLACEHOLDER FOR OTHER SUBJECTS ========================
// Will be added incrementally: PHYSICS_LESSONS, CHEMISTRY_LESSONS, etc.

// ======================== ELA / READING ========================
const ELA_LESSONS = [
  // ---- Grammar ----
  { cat: "Grammar", title: "Parts of Speech", content: "<p>Every word in English belongs to a <b>part of speech</b>. There are eight main ones:</p><ul><li><b>Noun:</b> person, place, thing, or idea (dog, city, freedom)</li><li><b>Pronoun:</b> replaces a noun (he, she, they, it)</li><li><b>Verb:</b> action or state of being (run, is, think)</li><li><b>Adjective:</b> describes a noun (tall, blue, happy)</li><li><b>Adverb:</b> describes a verb, adjective, or adverb (quickly, very, well)</li><li><b>Preposition:</b> shows relationship (in, on, between, under)</li><li><b>Conjunction:</b> connects words/clauses (and, but, or, because)</li><li><b>Interjection:</b> expresses emotion (wow, ouch, hey)</li></ul>",
    quiz: [
      { q: "Which part of speech describes a noun?", options: ["Adverb", "Adjective", "Conjunction", "Verb"], answer: 1 },
      { q: "'Quickly' is what part of speech?", options: ["Adjective", "Noun", "Adverb", "Verb"], answer: 2 },
      { q: "Which word is a preposition?", options: ["Run", "Between", "Happy", "And"], answer: 1 },
      { q: "'Wow!' is an example of a(n):", options: ["Conjunction", "Noun", "Interjection", "Adverb"], answer: 2 }
    ]
  },
  { cat: "Grammar", title: "Subject & Predicate", content: "<p>Every complete sentence has two main parts:</p><p><b>Subject:</b> Who or what the sentence is about. The <b>simple subject</b> is the main noun/pronoun. The <b>complete subject</b> includes all modifiers.</p><p><b>Predicate:</b> What the subject does or is. The <b>simple predicate</b> is the main verb. The <b>complete predicate</b> includes the verb and all its modifiers/objects.</p><p><strong>Example:</strong> 'The tall woman | ran quickly to the store.'</p><ul><li>Complete subject: 'The tall woman'</li><li>Simple subject: 'woman'</li><li>Complete predicate: 'ran quickly to the store'</li><li>Simple predicate: 'ran'</li></ul>",
    quiz: [
      { q: "In 'The cat slept on the mat,' what is the simple subject?", options: ["The cat", "cat", "mat", "slept"], answer: 1 },
      { q: "The predicate contains the:", options: ["Noun", "Adjective", "Verb", "Subject"], answer: 2 },
      { q: "In 'My older brother plays guitar,' what is the complete subject?", options: ["brother", "My older brother", "plays guitar", "guitar"], answer: 1 },
      { q: "What is the simple predicate in 'She quickly ate lunch'?", options: ["quickly", "ate", "lunch", "quickly ate"], answer: 1 }
    ]
  },
  { cat: "Grammar", title: "Types of Sentences", content: "<p>Sentences are classified by <b>purpose</b> and <b>structure</b>.</p><p><strong>By purpose:</strong></p><ul><li><b>Declarative:</b> Makes a statement. 'The sky is blue.'</li><li><b>Interrogative:</b> Asks a question. 'Is the sky blue?'</li><li><b>Imperative:</b> Gives a command. 'Close the door.'</li><li><b>Exclamatory:</b> Expresses strong emotion. 'What a beautiful day!'</li></ul><p><strong>By structure:</strong></p><ul><li><b>Simple:</b> One independent clause.</li><li><b>Compound:</b> Two independent clauses joined by a conjunction.</li><li><b>Complex:</b> One independent + one dependent clause.</li><li><b>Compound-Complex:</b> Two+ independent + one+ dependent clauses.</li></ul>",
    quiz: [
      { q: "'Close the door' is what type of sentence?", options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"], answer: 2 },
      { q: "A compound sentence has:", options: ["One clause", "Two independent clauses", "One dependent clause", "No conjunctions"], answer: 1 },
      { q: "'What a great day!' is:", options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"], answer: 3 },
      { q: "A complex sentence contains:", options: ["Two independent clauses", "One independent and one dependent clause", "Only dependent clauses", "No clauses"], answer: 1 }
    ]
  },
  { cat: "Grammar", title: "Verb Tenses", content: "<p>Verbs change form to show <b>when</b> an action occurs.</p><p><strong>Simple tenses:</strong></p><ul><li><b>Past:</b> I walked, she ran</li><li><b>Present:</b> I walk, she runs</li><li><b>Future:</b> I will walk, she will run</li></ul><p><strong>Progressive (continuous):</strong></p><ul><li><b>Past:</b> I was walking</li><li><b>Present:</b> I am walking</li><li><b>Future:</b> I will be walking</li></ul><p><strong>Perfect:</strong></p><ul><li><b>Past:</b> I had walked</li><li><b>Present:</b> I have walked</li><li><b>Future:</b> I will have walked</li></ul><p><b>Irregular verbs</b> don't follow standard -ed pattern: go/went/gone, eat/ate/eaten.</p>",
    quiz: [
      { q: "'She has eaten' is in what tense?", options: ["Simple past", "Present perfect", "Past perfect", "Future"], answer: 1 },
      { q: "'I was running' is:", options: ["Simple past", "Past progressive", "Present progressive", "Future"], answer: 1 },
      { q: "Which is the past tense of 'go'?", options: ["Goed", "Gone", "Went", "Going"], answer: 2 },
      { q: "'They will have finished' is:", options: ["Simple future", "Future progressive", "Future perfect", "Present perfect"], answer: 2 }
    ]
  },
  { cat: "Grammar", title: "Punctuation Rules", content: "<p><strong>Period (.):</strong> Ends a declarative or imperative sentence.</p><p><strong>Comma (,):</strong></p><ul><li>Separates items in a list: 'apples, bananas, and oranges'</li><li>After introductory phrases: 'After dinner, we left.'</li><li>Before conjunctions in compound sentences: 'I ran, but he walked.'</li><li>Around non-essential info: 'My sister, who is 10, loves math.'</li></ul><p><strong>Semicolon (;):</strong> Connects two related independent clauses: 'I love reading; she prefers writing.'</p><p><strong>Colon (:):</strong> Introduces a list or explanation.</p><p><strong>Apostrophe ('):</strong> Shows possession (dog's bone) or contraction (don't).</p>",
    quiz: [
      { q: "When do you use a semicolon?", options: ["Before a list", "To connect related independent clauses", "After a greeting", "To show possession"], answer: 1 },
      { q: "Where does the comma go? 'After school we played'", options: ["After 'After'", "After 'school'", "After 'we'", "No comma needed"], answer: 1 },
      { q: "The apostrophe in 'dog's' shows:", options: ["Plural", "Possession", "Contraction", "Exclamation"], answer: 1 },
      { q: "Which is correct?", options: ["Its raining", "It's raining", "Its' raining", "Raining it's"], answer: 1 }
    ]
  },
  { cat: "Grammar", title: "Common Grammar Mistakes", content: "<p><strong>Their/There/They're:</strong></p><ul><li><b>Their:</b> possessive ('their car')</li><li><b>There:</b> place ('over there')</li><li><b>They're:</b> contraction of 'they are'</li></ul><p><strong>Your/You're:</strong> Your = possessive; You're = you are.</p><p><strong>Its/It's:</strong> Its = possessive; It's = it is.</p><p><strong>Affect/Effect:</strong> Affect = verb (to influence); Effect = noun (the result).</p><p><strong>Then/Than:</strong> Then = time; Than = comparison.</p><p><strong>Subject-verb agreement:</strong> Singular subjects take singular verbs: 'He runs' (not 'He run').</p>",
    quiz: [
      { q: "Which is correct? '___ going to the store.'", options: ["Their", "There", "They're", "Thier"], answer: 2 },
      { q: "'The rain did not ___ our plans.'", options: ["effect", "affect", "affection", "effecting"], answer: 1 },
      { q: "Which is correct?", options: ["Your welcome", "You're welcome", "Yore welcome", "Ur welcome"], answer: 1 },
      { q: "'She is taller ___ her brother.'", options: ["then", "than", "that", "the"], answer: 1 }
    ]
  },
  // ---- Writing ----
  { cat: "Writing", title: "The Writing Process", content: "<p>Good writing follows a process:</p><ol><li><b>Prewriting:</b> Brainstorm, research, outline. Decide your topic, audience, and purpose.</li><li><b>Drafting:</b> Write your first draft. Focus on getting ideas on paper — don't worry about perfection.</li><li><b>Revising:</b> Improve content, organization, and clarity. Add, remove, reorder.</li><li><b>Editing:</b> Fix grammar, spelling, and punctuation errors.</li><li><b>Publishing:</b> Create the final version to share.</li></ol><p>The process is <b>recursive</b> — you can go back to any step at any time.</p>",
    quiz: [
      { q: "Which step comes first?", options: ["Drafting", "Editing", "Prewriting", "Publishing"], answer: 2 },
      { q: "During which step do you fix grammar errors?", options: ["Prewriting", "Drafting", "Revising", "Editing"], answer: 3 },
      { q: "What does 'recursive' mean in writing?", options: ["You only go forward", "You can go back to earlier steps", "You skip steps", "Each step takes equal time"], answer: 1 },
      { q: "Drafting focuses on:", options: ["Perfect grammar", "Getting ideas on paper", "Final formatting", "Correcting spelling"], answer: 1 }
    ]
  },
  { cat: "Writing", title: "Thesis Statements", content: "<p>A <b>thesis statement</b> is the central argument or main idea of an essay. It typically appears at the end of the introduction paragraph.</p><p><strong>A good thesis is:</strong></p><ul><li><b>Specific:</b> Not too broad or vague</li><li><b>Arguable:</b> Someone could disagree</li><li><b>Supported:</b> You can back it with evidence</li><li><b>One sentence:</b> Clear and concise</li></ul><p><strong>Weak:</strong> 'Dogs are cool.' (Too vague)</p><p><strong>Strong:</strong> 'Schools should allow therapy dogs because they reduce student stress, improve attendance, and create a more positive learning environment.'</p>",
    quiz: [
      { q: "Where does a thesis typically appear?", options: ["Beginning of body", "End of introduction", "Conclusion", "Title"], answer: 1 },
      { q: "A good thesis should be:", options: ["Broad and general", "Factual and inarguable", "Specific and arguable", "One word"], answer: 2 },
      { q: "Which is a stronger thesis?", options: ["History is interesting", "The Industrial Revolution transformed society by...", "I like history class", "History has many events"], answer: 1 },
      { q: "How many sentences should a thesis be?", options: ["One", "Two", "Three", "It depends"], answer: 0 }
    ]
  },
  { cat: "Writing", title: "Essay Structure (5-Paragraph)", content: "<p>The <b>five-paragraph essay</b> is a foundational format:</p><ol><li><b>Introduction:</b> Hook → background → thesis statement</li><li><b>Body Paragraph 1:</b> Topic sentence → evidence → analysis → transition</li><li><b>Body Paragraph 2:</b> Topic sentence → evidence → analysis → transition</li><li><b>Body Paragraph 3:</b> Topic sentence → evidence → analysis → transition</li><li><b>Conclusion:</b> Restate thesis → summarize points → final thought/call to action</li></ol><p><b>Topic sentences</b> introduce each paragraph's main idea and connect back to the thesis.</p><p><b>Transitions</b> link ideas: furthermore, however, in addition, consequently, etc.</p>",
    quiz: [
      { q: "What comes first in an introduction?", options: ["Thesis", "Background", "Hook", "Evidence"], answer: 2 },
      { q: "How many body paragraphs in a 5-paragraph essay?", options: ["2", "3", "4", "5"], answer: 1 },
      { q: "A topic sentence starts a:", options: ["Essay", "Body paragraph", "Conclusion", "Title"], answer: 1 },
      { q: "'Furthermore' is an example of a:", options: ["Thesis", "Hook", "Transition", "Citation"], answer: 2 }
    ]
  },
  { cat: "Writing", title: "Types of Evidence", content: "<p>Evidence supports your claims in an essay. Types include:</p><ul><li><b>Statistics:</b> Numerical data ('73% of students...')</li><li><b>Quotes:</b> Direct words from a source</li><li><b>Paraphrasing:</b> Restating someone's idea in your own words</li><li><b>Examples:</b> Specific instances that illustrate your point</li><li><b>Expert testimony:</b> Statements from authorities on the topic</li><li><b>Anecdotes:</b> Brief personal stories (less formal)</li></ul><p><b>Citing sources</b> gives credit and builds credibility. Always cite quotes and paraphrased ideas.</p><p><b>Analysis</b> (your own commentary) must follow evidence — don't just drop quotes without explaining them.</p>",
    quiz: [
      { q: "Restating someone's idea in your own words is:", options: ["Quoting", "Paraphrasing", "Summarizing", "Plagiarizing"], answer: 1 },
      { q: "Why is citing sources important?", options: ["Makes the essay longer", "Gives credit and builds credibility", "Teachers require it", "It looks professional"], answer: 1 },
      { q: "What should follow a quote in an essay?", options: ["Another quote", "A new paragraph", "Your analysis", "Nothing"], answer: 2 },
      { q: "Which is the strongest type of evidence for a research paper?", options: ["Personal opinion", "Statistics from a study", "An anecdote", "A rumor"], answer: 1 }
    ]
  },
  // ---- Reading Comprehension ----
  { cat: "Reading Comprehension", title: "Main Idea & Supporting Details", content: "<p>The <b>main idea</b> is the central point of a passage — what it's mostly about.</p><p><b>Supporting details</b> are facts, examples, or reasons that back up the main idea.</p><p><strong>Finding the main idea:</strong></p><ol><li>Read the whole passage</li><li>Ask: 'What is this mostly about?'</li><li>Check if details support your answer</li><li>Look at the first and last sentences — they often state the main idea</li></ol><p><b>Implied main idea:</b> Not directly stated; you must infer it from the details.</p><p><b>Topic</b> ≠ main idea. Topic = subject (one or two words). Main idea = what the author says about the topic (a sentence).</p>",
    quiz: [
      { q: "The main idea is:", options: ["The first sentence", "What the passage is mostly about", "A detail in the passage", "The title"], answer: 1 },
      { q: "Supporting details:", options: ["Introduce the topic", "Back up the main idea", "Are always statistics", "Appear only in conclusions"], answer: 1 },
      { q: "An implied main idea means:", options: ["Directly stated in the text", "Not stated, must be inferred", "Found in the title", "Repeated multiple times"], answer: 1 },
      { q: "How does topic differ from main idea?", options: ["They are the same", "Topic is a subject, main idea is what's said about it", "Main idea is shorter", "Topic is always a question"], answer: 1 }
    ]
  },
  { cat: "Reading Comprehension", title: "Making Inferences", content: "<p>An <b>inference</b> is a logical conclusion based on evidence and reasoning — reading 'between the lines.'</p><p><strong>How to make inferences:</strong></p><ol><li>Look at what the text <b>says</b> (evidence)</li><li>Think about what you already <b>know</b> (background knowledge)</li><li>Combine them to draw a conclusion</li></ol><p><strong>Example:</strong> 'Sarah grabbed her umbrella before leaving.' Inference: It is raining or might rain — even though the text doesn't say so.</p><p><b>Inferences</b> must be supported by text evidence. They are not random guesses.</p>",
    quiz: [
      { q: "An inference is:", options: ["A fact stated in the text", "A random guess", "A conclusion based on evidence", "The author's opinion"], answer: 2 },
      { q: "'He wiped the sweat from his forehead.' You can infer:", options: ["He is cold", "He is hot or exerted", "He is sleeping", "He is angry"], answer: 1 },
      { q: "Inferences must be supported by:", options: ["Opinions", "Text evidence", "Feelings", "Other inferences"], answer: 1 },
      { q: "Making inferences is often called:", options: ["Skimming", "Reading between the lines", "Speed reading", "Summarizing"], answer: 1 }
    ]
  },
  { cat: "Reading Comprehension", title: "Author's Purpose", content: "<p>Authors write for three main purposes, often remembered as <b>PIE</b>:</p><ul><li><b>P — Persuade:</b> Convince the reader (editorials, advertisements, speeches)</li><li><b>I — Inform:</b> Teach or explain (textbooks, news articles, manuals)</li><li><b>E — Entertain:</b> Amuse or engage (novels, poems, comics)</li></ul><p>A text can have <b>multiple purposes</b>. A memoir might entertain AND inform.</p><p><strong>Clues to purpose:</strong></p><ul><li>Persuade: strong opinions, call to action, emotional language</li><li>Inform: facts, data, neutral tone</li><li>Entertain: descriptive language, humor, narrative structure</li></ul>",
    quiz: [
      { q: "PIE stands for:", options: ["Purpose, Idea, Evidence", "Persuade, Inform, Entertain", "Personal, Informational, Educational", "Primary, Implied, Explicit"], answer: 1 },
      { q: "A textbook's primary purpose is to:", options: ["Persuade", "Inform", "Entertain", "Confuse"], answer: 1 },
      { q: "Which text is most likely persuasive?", options: ["A novel", "A dictionary", "An editorial", "A recipe"], answer: 2 },
      { q: "Emotional language suggests the purpose is:", options: ["Inform", "Entertain", "Persuade", "Describe"], answer: 2 }
    ]
  },
  { cat: "Reading Comprehension", title: "Context Clues", content: "<p><b>Context clues</b> help you figure out unknown words using the surrounding text.</p><p><strong>Types of context clues:</strong></p><ul><li><b>Definition:</b> The word is defined right in the sentence. 'A <i>habitat</i>, the natural home of an animal...'</li><li><b>Synonym:</b> A similar word is nearby. 'She was <i>elated</i>, or happy, about the news.'</li><li><b>Antonym:</b> An opposite word is nearby. 'Unlike her <i>timid</i> sister, she was bold.'</li><li><b>Example:</b> Examples help clarify. '<i>Citrus</i> fruits, such as oranges and lemons...'</li><li><b>Inference:</b> You figure it out from the overall context.</li></ul>",
    quiz: [
      { q: "'She was elated, or happy, about the news.' What clue type is this?", options: ["Antonym", "Synonym", "Example", "Definition"], answer: 1 },
      { q: "'Unlike the timid rabbit, the lion was bold.' Timid means:", options: ["Brave", "Shy/fearful", "Strong", "Fast"], answer: 1 },
      { q: "Context clues help you:", options: ["Read faster", "Figure out unknown words", "Find the main idea", "Write better"], answer: 1 },
      { q: "'Canines such as dogs and wolves...' What clue type is this?", options: ["Definition", "Antonym", "Example", "Inference"], answer: 2 }
    ]
  },
  { cat: "Reading Comprehension", title: "Fact vs. Opinion", content: "<p><b>Fact:</b> A statement that can be proven true or false with evidence. 'Water boils at 100°C.'</p><p><b>Opinion:</b> A belief, feeling, or judgment that cannot be proven. 'Chocolate ice cream is the best.'</p><p><strong>Signal words for opinions:</strong> I think, I believe, best, worst, should, most, beautiful, probably, in my opinion.</p><p><strong>Signal words for facts:</strong> according to, research shows, studies indicate, data, statistics.</p><p>Be careful — opinions can be disguised as facts: 'Everyone knows that...' is still an opinion if it can't be verified.</p>",
    quiz: [
      { q: "Which is a fact?", options: ["Pizza is delicious", "The Earth orbits the Sun", "Blue is the best color", "School is boring"], answer: 1 },
      { q: "Which signal word indicates an opinion?", options: ["According to", "Research shows", "I believe", "Studies indicate"], answer: 2 },
      { q: "'Everyone knows dogs are better than cats' is:", options: ["Fact", "Opinion", "Both", "Neither"], answer: 1 },
      { q: "A fact can be:", options: ["Proven with evidence", "Based on feelings", "Different for everyone", "Always positive"], answer: 0 }
    ]
  },
  // ---- Vocabulary & Word Study ----
  { cat: "Vocabulary", title: "Prefixes & Suffixes", content: "<p>A <b>prefix</b> is added to the beginning of a word to change its meaning. A <b>suffix</b> is added to the end.</p><p><strong>Common prefixes:</strong></p><ul><li><b>un-:</b> not (unhappy)</li><li><b>re-:</b> again (redo)</li><li><b>pre-:</b> before (preview)</li><li><b>mis-:</b> wrong (misunderstand)</li><li><b>dis-:</b> not/opposite (disagree)</li><li><b>bi-:</b> two (bicycle)</li><li><b>tri-:</b> three (triangle)</li></ul><p><strong>Common suffixes:</strong></p><ul><li><b>-tion/-sion:</b> act of (creation)</li><li><b>-able/-ible:</b> can be (readable)</li><li><b>-less:</b> without (hopeless)</li><li><b>-ful:</b> full of (hopeful)</li><li><b>-ly:</b> in a manner (quickly)</li></ul>",
    quiz: [
      { q: "The prefix 'un-' means:", options: ["Again", "Before", "Not", "After"], answer: 2 },
      { q: "The suffix '-less' means:", options: ["Full of", "Without", "Like", "More"], answer: 1 },
      { q: "What does 'preview' mean?", options: ["View again", "View before", "View after", "Not view"], answer: 1 },
      { q: "The prefix 'bi-' means:", options: ["One", "Two", "Three", "Half"], answer: 1 }
    ]
  },
  { cat: "Vocabulary", title: "Root Words", content: "<p>A <b>root word</b> (or base word) is the core part of a word that carries meaning. Many English roots come from Latin and Greek.</p><p><strong>Common roots:</strong></p><ul><li><b>aud:</b> hear (audience, audio)</li><li><b>dict:</b> say (predict, dictionary)</li><li><b>graph/gram:</b> write (autograph, telegram)</li><li><b>port:</b> carry (transport, export)</li><li><b>rupt:</b> break (erupt, interrupt)</li><li><b>scrib/script:</b> write (describe, manuscript)</li><li><b>vis/vid:</b> see (vision, video)</li><li><b>bio:</b> life (biology, biography)</li><li><b>geo:</b> earth (geography, geology)</li><li><b>phon:</b> sound (telephone, phonics)</li></ul>",
    quiz: [
      { q: "The root 'aud' means:", options: ["See", "Hear", "Write", "Carry"], answer: 1 },
      { q: "Which word contains the root meaning 'write'?", options: ["Transport", "Predict", "Autograph", "Vision"], answer: 2 },
      { q: "The root 'rupt' means:", options: ["Break", "Build", "Carry", "Say"], answer: 0 },
      { q: "'Biology' contains a root meaning:", options: ["Earth", "Sound", "Life", "Water"], answer: 2 }
    ]
  },
  { cat: "Vocabulary", title: "Figurative Language", content: "<p><b>Figurative language</b> uses words beyond their literal meaning for creative effect.</p><ul><li><b>Simile:</b> Compares using 'like' or 'as.' 'Fast as lightning.'</li><li><b>Metaphor:</b> Direct comparison without like/as. 'Time is money.'</li><li><b>Personification:</b> Gives human traits to non-human things. 'The wind whispered.'</li><li><b>Hyperbole:</b> Extreme exaggeration. 'I've told you a million times.'</li><li><b>Onomatopoeia:</b> Words that imitate sounds. 'Buzz, crash, sizzle.'</li><li><b>Alliteration:</b> Repetition of beginning consonant sounds. 'Peter Piper picked...'</li><li><b>Idiom:</b> Phrase with figurative meaning. 'Break a leg' = good luck.</li></ul>",
    quiz: [
      { q: "'Fast as lightning' is a:", options: ["Metaphor", "Simile", "Personification", "Hyperbole"], answer: 1 },
      { q: "'Time is money' is a:", options: ["Simile", "Metaphor", "Idiom", "Hyperbole"], answer: 1 },
      { q: "'The wind whispered' is:", options: ["Alliteration", "Onomatopoeia", "Personification", "Simile"], answer: 2 },
      { q: "'I've told you a million times' is:", options: ["Metaphor", "Simile", "Personification", "Hyperbole"], answer: 3 }
    ]
  },
  { cat: "Vocabulary", title: "Synonyms & Antonyms", content: "<p><b>Synonyms</b> are words with similar meanings: happy/joyful, big/large, fast/quick.</p><p><b>Antonyms</b> are words with opposite meanings: hot/cold, up/down, happy/sad.</p><p><strong>Why they matter:</strong></p><ul><li>Synonyms help you <b>avoid repetition</b> and make writing more varied</li><li>Antonyms help with <b>contrast</b> and understanding word meanings</li></ul><p><strong>Shades of meaning:</strong> Synonyms aren't always perfect substitutes. 'Furious' is stronger than 'angry.' 'Chilly' is milder than 'freezing.' Choose words based on the exact meaning you want.</p><p>A <b>thesaurus</b> is a reference tool for finding synonyms and antonyms.</p>",
    quiz: [
      { q: "A synonym for 'happy' is:", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
      { q: "An antonym for 'hot' is:", options: ["Warm", "Burning", "Cold", "Humid"], answer: 2 },
      { q: "Why use synonyms in writing?", options: ["To confuse readers", "To avoid repetition", "To make it longer", "To add errors"], answer: 1 },
      { q: "A thesaurus helps you find:", options: ["Definitions", "Synonyms and antonyms", "Spelling", "Grammar rules"], answer: 1 }
    ]
  },
  // ---- Literature ----
  { cat: "Literature", title: "Story Elements", content: "<p>Every narrative has key elements:</p><ul><li><b>Characters:</b> The people (or animals/objects) in the story. The <b>protagonist</b> is the main character; the <b>antagonist</b> opposes them.</li><li><b>Setting:</b> Where and when the story takes place.</li><li><b>Plot:</b> The sequence of events (what happens).</li><li><b>Conflict:</b> The central problem or struggle.</li><li><b>Theme:</b> The underlying message or lesson.</li></ul><p><b>Plot structure:</b> Exposition → Rising action → Climax → Falling action → Resolution.</p><p>The <b>climax</b> is the turning point — the most intense moment of the story.</p>",
    quiz: [
      { q: "The main character of a story is the:", options: ["Antagonist", "Protagonist", "Narrator", "Author"], answer: 1 },
      { q: "The turning point of a story is called the:", options: ["Exposition", "Rising action", "Climax", "Resolution"], answer: 2 },
      { q: "Setting refers to:", options: ["The characters", "Where and when", "The theme", "The conflict"], answer: 1 },
      { q: "The underlying message of a story is its:", options: ["Plot", "Setting", "Conflict", "Theme"], answer: 3 }
    ]
  },
  { cat: "Literature", title: "Point of View", content: "<p><b>Point of view (POV)</b> is the perspective from which a story is told.</p><ul><li><b>First person:</b> Narrator is a character. Uses 'I' and 'we.' Reader only knows what this character knows.</li><li><b>Second person:</b> Narrator addresses 'you.' Rare in fiction, common in instructions.</li><li><b>Third person limited:</b> Narrator is outside the story, focuses on one character's thoughts. Uses 'he/she/they.'</li><li><b>Third person omniscient:</b> All-knowing narrator who can see into any character's mind.</li></ul><p><strong>Reliable narrator</strong> can be trusted. An <b>unreliable narrator</b> may be biased, lying, or mistaken.</p>",
    quiz: [
      { q: "'I walked to school that morning' is written in:", options: ["First person", "Second person", "Third person limited", "Third person omniscient"], answer: 0 },
      { q: "An all-knowing narrator is:", options: ["First person", "Second person", "Third person limited", "Third person omniscient"], answer: 3 },
      { q: "Which POV uses 'you'?", options: ["First person", "Second person", "Third person limited", "Third person omniscient"], answer: 1 },
      { q: "An unreliable narrator:", options: ["Knows everything", "Can always be trusted", "May be biased or mistaken", "Doesn't exist"], answer: 2 }
    ]
  },
  { cat: "Literature", title: "Literary Genres", content: "<p>Literature is organized into <b>genres</b> — categories based on form, style, and content.</p><p><strong>Major fiction genres:</strong></p><ul><li><b>Realistic fiction:</b> Could happen in real life</li><li><b>Historical fiction:</b> Set in a real historical period</li><li><b>Science fiction:</b> Speculative technology/future</li><li><b>Fantasy:</b> Magic, mythical creatures, imaginary worlds</li><li><b>Mystery:</b> Solving a crime or puzzle</li><li><b>Horror:</b> Designed to frighten</li></ul><p><strong>Nonfiction genres:</strong> biography, autobiography, memoir, essay, journalism, reference.</p><p><strong>Poetry forms:</strong> sonnet, haiku, free verse, limerick, epic.</p>",
    quiz: [
      { q: "A story set in the future with advanced technology is:", options: ["Fantasy", "Historical fiction", "Science fiction", "Mystery"], answer: 2 },
      { q: "A biography is:", options: ["Fiction", "Nonfiction", "Poetry", "Drama"], answer: 1 },
      { q: "Which genre involves solving a crime?", options: ["Fantasy", "Horror", "Mystery", "Science fiction"], answer: 2 },
      { q: "A haiku is a form of:", options: ["Fiction", "Nonfiction", "Drama", "Poetry"], answer: 3 }
    ]
  },
  { cat: "Literature", title: "Literary Devices & Tone", content: "<p><strong>Tone:</strong> The author's attitude toward the subject. Described with adjectives: humorous, sarcastic, serious, nostalgic, hopeful, somber.</p><p><strong>Mood:</strong> How the text makes the <b>reader</b> feel. A dark setting creates a tense mood.</p><p><strong>Common literary devices:</strong></p><ul><li><b>Foreshadowing:</b> Hints about future events</li><li><b>Flashback:</b> Scene from the past</li><li><b>Irony:</b> Contrast between expectation and reality</li><li><b>Symbolism:</b> An object represents something deeper (a dove = peace)</li><li><b>Imagery:</b> Vivid sensory descriptions</li><li><b>Allusion:</b> Reference to another work/event</li></ul>",
    quiz: [
      { q: "Hints about what will happen later are:", options: ["Flashback", "Foreshadowing", "Irony", "Symbolism"], answer: 1 },
      { q: "Tone refers to:", options: ["How the reader feels", "The author's attitude", "The story's setting", "The genre"], answer: 1 },
      { q: "A dove representing peace is:", options: ["Irony", "Imagery", "Symbolism", "Alliteration"], answer: 2 },
      { q: "Contrast between expectation and reality is:", options: ["Foreshadowing", "Flashback", "Symbolism", "Irony"], answer: 3 }
    ]
  }
];

// ======================== PHYSICS ========================
const PHYSICS_LESSONS = [
  // ---- Motion & Forces ----
  { cat: "Motion & Forces", title: "Speed, Velocity & Acceleration", content: "<p><b>Speed</b> is how fast an object moves: distance ÷ time. Units: m/s, km/h, mph.</p><p><b>Velocity</b> = speed + direction. 60 mph north is a velocity; 60 mph alone is a speed.</p><p><b>Acceleration</b> = change in velocity ÷ time. a = (v_f − v_i) / t. Units: m/s².</p><p><strong>Example:</strong> A car goes from 0 to 20 m/s in 5 seconds: a = 20/5 = 4 m/s².</p><p><b>Deceleration</b> (negative acceleration) means slowing down.</p><p>An object at constant velocity has zero acceleration.</p>",
    quiz: [
      { q: "Speed is:", options: ["Distance × time", "Distance ÷ time", "Velocity ÷ time", "Mass × acceleration"], answer: 1 },
      { q: "Velocity differs from speed because it includes:", options: ["Mass", "Direction", "Acceleration", "Force"], answer: 1 },
      { q: "A car goes from 0 to 30 m/s in 6 seconds. Acceleration?", options: ["5 m/s²", "36 m/s²", "180 m/s²", "0.2 m/s²"], answer: 0 },
      { q: "An object at constant velocity has ___ acceleration.", options: ["Positive", "Negative", "Zero", "Infinite"], answer: 2 }
    ]
  },
  { cat: "Motion & Forces", title: "Newton's First Law (Inertia)", content: "<p><b>Newton's First Law:</b> An object at rest stays at rest, and an object in motion stays in motion at constant velocity, <b>unless acted on by an unbalanced force</b>.</p><p><b>Inertia</b> is the tendency of an object to resist changes in motion. More mass = more inertia.</p><p><strong>Examples:</strong></p><ul><li>A book on a table stays until pushed</li><li>A ball rolling on grass slows because of friction (an unbalanced force)</li><li>Passengers lurch forward when a car brakes suddenly — their body wants to keep moving</li></ul>",
    quiz: [
      { q: "Newton's First Law is also called the Law of:", options: ["Acceleration", "Inertia", "Gravity", "Friction"], answer: 1 },
      { q: "More mass means:", options: ["Less inertia", "More inertia", "No change in inertia", "Less friction"], answer: 1 },
      { q: "A hockey puck slides forever on frictionless ice because:", options: ["Gravity pulls it", "No unbalanced force acts on it", "It has no mass", "Air pushes it"], answer: 1 },
      { q: "Why do passengers lurch forward when a car stops?", options: ["Gravity increases", "Their inertia keeps them moving", "The seatbelt pushes them", "The car accelerates"], answer: 1 }
    ]
  },
  { cat: "Motion & Forces", title: "Newton's Second Law (F = ma)", content: "<p><b>Newton's Second Law:</b> Force = mass × acceleration. <b>F = ma</b>.</p><p>Units: Force in Newtons (N), mass in kg, acceleration in m/s².</p><p>1 N = 1 kg·m/s².</p><p><strong>Key relationships:</strong></p><ul><li>More force → more acceleration (for same mass)</li><li>More mass → less acceleration (for same force)</li></ul><p><strong>Example:</strong> A 10 kg box pushed with 50 N: a = F/m = 50/10 = 5 m/s².</p><p><b>Net force</b> is the sum of all forces. If forces are balanced (net = 0), no acceleration.</p>",
    quiz: [
      { q: "F = ma means force equals:", options: ["Mass + acceleration", "Mass × acceleration", "Mass ÷ acceleration", "Motion × area"], answer: 1 },
      { q: "A 5 kg object has a 20 N force applied. Acceleration?", options: ["4 m/s²", "100 m/s²", "25 m/s²", "0.25 m/s²"], answer: 0 },
      { q: "Doubling the mass while keeping force the same will:", options: ["Double acceleration", "Halve acceleration", "Not change acceleration", "Stop the object"], answer: 1 },
      { q: "The unit of force is:", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2 }
    ]
  },
  { cat: "Motion & Forces", title: "Newton's Third Law (Action-Reaction)", content: "<p><b>Newton's Third Law:</b> For every action, there is an <b>equal and opposite reaction</b>.</p><p>When you push on a wall, the wall pushes back on you with equal force.</p><p><strong>Key points:</strong></p><ul><li>Action and reaction forces act on <b>different objects</b></li><li>They are equal in magnitude, opposite in direction</li><li>They occur simultaneously</li></ul><p><strong>Examples:</strong></p><ul><li>Rocket propulsion: exhaust pushes down, rocket pushes up</li><li>Walking: your foot pushes Earth backward, Earth pushes you forward</li><li>Swimming: hands push water back, water pushes you forward</li></ul>",
    quiz: [
      { q: "Action and reaction forces act on:", options: ["The same object", "Different objects", "Only solid objects", "Only moving objects"], answer: 1 },
      { q: "A rocket moves up because:", options: ["Air pushes it", "Exhaust pushes down, reaction pushes rocket up", "Gravity reverses", "It's lighter than air"], answer: 1 },
      { q: "When you sit in a chair, the chair exerts a force:", options: ["Downward", "Upward", "Sideways", "No force"], answer: 1 },
      { q: "Action-reaction forces are ___ in magnitude.", options: ["Unequal", "Equal", "Random", "Zero"], answer: 1 }
    ]
  },
  { cat: "Motion & Forces", title: "Friction", content: "<p><b>Friction</b> is a force that opposes motion between surfaces in contact.</p><p><strong>Types:</strong></p><ul><li><b>Static friction:</b> Prevents a stationary object from starting to move. Generally the strongest.</li><li><b>Kinetic (sliding) friction:</b> Acts on objects already moving.</li><li><b>Rolling friction:</b> When an object rolls. Less than sliding.</li><li><b>Fluid friction (drag):</b> Resistance from air or water.</li></ul><p>Friction depends on: <b>surface roughness</b> and <b>normal force</b> (weight pressing surfaces together).</p><p>f = μN where μ is the coefficient of friction and N is the normal force.</p>",
    quiz: [
      { q: "Friction opposes:", options: ["Gravity", "Motion", "Acceleration only", "Mass"], answer: 1 },
      { q: "Which type of friction is generally strongest?", options: ["Kinetic", "Rolling", "Static", "Fluid"], answer: 2 },
      { q: "Friction depends on surface roughness and:", options: ["Color", "Temperature only", "Normal force", "Speed only"], answer: 2 },
      { q: "A ball rolls more easily than a box slides because:", options: ["It has less mass", "Rolling friction < sliding friction", "Gravity is less", "It has more inertia"], answer: 1 }
    ]
  },
  { cat: "Motion & Forces", title: "Gravity", content: "<p><b>Gravity</b> is the attractive force between any two masses. On Earth, g ≈ 9.8 m/s².</p><p><b>Weight</b> = mass × gravity. W = mg. A 50 kg person weighs 50 × 9.8 = 490 N on Earth.</p><p><b>Free fall:</b> When gravity is the only force. All objects fall at the same rate (ignoring air resistance).</p><p><b>Newton's Law of Universal Gravitation:</b> F = G(m₁m₂)/r². Force increases with mass and decreases with distance squared.</p><p>On the Moon (g ≈ 1.6 m/s²), you'd weigh about 1/6 of your Earth weight, but your mass stays the same.</p>",
    quiz: [
      { q: "Earth's gravitational acceleration is approximately:", options: ["3.2 m/s²", "6.7 m/s²", "9.8 m/s²", "15 m/s²"], answer: 2 },
      { q: "Weight equals:", options: ["Mass + gravity", "Mass × gravity", "Mass ÷ gravity", "Force × distance"], answer: 1 },
      { q: "In free fall, a feather and hammer (no air resistance) fall:", options: ["Feather faster", "Hammer faster", "At the same rate", "Neither falls"], answer: 2 },
      { q: "Your mass on the Moon is:", options: ["1/6 of Earth", "Same as Earth", "6x Earth", "Zero"], answer: 1 }
    ]
  },
  // ---- Energy & Work ----
  { cat: "Energy & Work", title: "Work & Power", content: "<p><b>Work</b> = Force × distance (in the direction of force). W = Fd. Units: Joules (J).</p><p>No work is done if: the object doesn't move, or the force is perpendicular to motion (carrying a box horizontally — gravity is downward).</p><p><b>Power</b> = Work ÷ time. P = W/t. Units: Watts (W). 1 W = 1 J/s.</p><p><strong>Example:</strong> Lifting a 20 N box 3 m: W = 20 × 3 = 60 J. If done in 2 s: P = 60/2 = 30 W.</p><p>A more powerful machine does the same work in less time.</p>",
    quiz: [
      { q: "Work = Force ×:", options: ["Time", "Mass", "Distance", "Velocity"], answer: 2 },
      { q: "The unit of work is:", options: ["Watt", "Newton", "Joule", "Pascal"], answer: 2 },
      { q: "Power is measured in:", options: ["Joules", "Watts", "Newtons", "Meters"], answer: 1 },
      { q: "Carrying a box horizontally does zero work against gravity because:", options: ["The box is light", "Force and motion are perpendicular", "You're not pushing", "Gravity doesn't exist"], answer: 1 }
    ]
  },
  { cat: "Energy & Work", title: "Kinetic & Potential Energy", content: "<p><b>Kinetic energy (KE):</b> Energy of motion. KE = ½mv². Depends on mass and velocity.</p><p><b>Potential energy (PE):</b> Stored energy due to position or condition.</p><ul><li><b>Gravitational PE:</b> PE = mgh (mass × gravity × height)</li><li><b>Elastic PE:</b> Stored in stretched/compressed objects (springs, rubber bands)</li></ul><p><strong>Example:</strong> A 2 kg ball at 5 m height: PE = 2 × 9.8 × 5 = 98 J.</p><p><strong>Example:</strong> A 3 kg object moving at 4 m/s: KE = ½(3)(16) = 24 J.</p>",
    quiz: [
      { q: "Kinetic energy depends on mass and:", options: ["Height", "Velocity", "Time", "Force"], answer: 1 },
      { q: "KE = ½mv². If velocity doubles, KE:", options: ["Doubles", "Quadruples", "Halves", "Stays the same"], answer: 1 },
      { q: "Gravitational PE = mgh. What is h?", options: ["Mass", "Gravity", "Height", "Velocity"], answer: 2 },
      { q: "A stretched rubber band has:", options: ["Kinetic energy", "Elastic potential energy", "No energy", "Thermal energy"], answer: 1 }
    ]
  },
  { cat: "Energy & Work", title: "Conservation of Energy", content: "<p>The <b>Law of Conservation of Energy:</b> Energy cannot be created or destroyed — only transformed from one form to another.</p><p>Total energy in a closed system remains constant.</p><p><strong>Example — falling ball:</strong></p><ul><li>At the top: max PE, zero KE</li><li>Halfway: PE converting to KE</li><li>At bottom: zero PE, max KE</li><li>Total energy (PE + KE) stays the same throughout</li></ul><p><strong>Energy transformations:</strong> Chemical → thermal (burning), electrical → light (bulb), kinetic → thermal (braking).</p>",
    quiz: [
      { q: "Energy can be:", options: ["Created", "Destroyed", "Transformed", "Eliminated"], answer: 2 },
      { q: "A ball at the top of a hill has maximum:", options: ["Kinetic energy", "Potential energy", "Thermal energy", "No energy"], answer: 1 },
      { q: "As a ball falls, PE converts to:", options: ["Chemical energy", "Nuclear energy", "Kinetic energy", "Sound energy"], answer: 2 },
      { q: "Total energy in a closed system:", options: ["Increases", "Decreases", "Remains constant", "Becomes zero"], answer: 2 }
    ]
  },
  // ---- Waves & Sound ----
  { cat: "Waves & Sound", title: "Wave Properties", content: "<p>A <b>wave</b> transfers energy without transferring matter.</p><p><strong>Types:</strong></p><ul><li><b>Transverse:</b> Motion perpendicular to wave direction (light, water surface)</li><li><b>Longitudinal:</b> Motion parallel to wave direction (sound)</li></ul><p><strong>Wave anatomy:</strong></p><ul><li><b>Crest:</b> Highest point</li><li><b>Trough:</b> Lowest point</li><li><b>Amplitude:</b> Height from rest to crest (relates to energy/loudness)</li><li><b>Wavelength (λ):</b> Distance between consecutive crests</li><li><b>Frequency (f):</b> Waves per second (Hertz, Hz)</li></ul><p><b>Wave speed:</b> v = f × λ.</p>",
    quiz: [
      { q: "Waves transfer ___ without transferring matter.", options: ["Mass", "Energy", "Atoms", "Weight"], answer: 1 },
      { q: "Sound is what type of wave?", options: ["Transverse", "Longitudinal", "Electromagnetic", "Surface"], answer: 1 },
      { q: "Frequency is measured in:", options: ["Meters", "Seconds", "Hertz", "Joules"], answer: 2 },
      { q: "Wave speed = frequency ×:", options: ["Amplitude", "Period", "Wavelength", "Mass"], answer: 2 }
    ]
  },
  { cat: "Waves & Sound", title: "Sound Waves", content: "<p><b>Sound</b> is a longitudinal mechanical wave — vibrations traveling through a medium.</p><p>Sound needs a <b>medium</b> (solid, liquid, gas). It cannot travel through a vacuum (no sound in space).</p><p><strong>Speed of sound:</strong> ~343 m/s in air (at 20°C). Faster in solids and liquids.</p><p><b>Pitch:</b> How high or low a sound is. Determined by frequency. High frequency = high pitch.</p><p><b>Volume (loudness):</b> Determined by amplitude. Greater amplitude = louder. Measured in decibels (dB).</p><p><b>Doppler effect:</b> Pitch changes when source or observer moves. Ambulance siren sounds higher approaching, lower moving away.</p>",
    quiz: [
      { q: "Sound cannot travel through:", options: ["Air", "Water", "Steel", "Vacuum"], answer: 3 },
      { q: "Pitch is determined by:", options: ["Amplitude", "Frequency", "Wavelength only", "Speed"], answer: 1 },
      { q: "Loudness is measured in:", options: ["Hertz", "Meters", "Decibels", "Newtons"], answer: 2 },
      { q: "The Doppler effect explains why:", options: ["Sound is loud", "Pitch changes with relative motion", "Sound needs a medium", "Echoes occur"], answer: 1 }
    ]
  },
  // ---- Light & Optics ----
  { cat: "Light & Optics", title: "Light & the EM Spectrum", content: "<p><b>Light</b> is an electromagnetic wave — it does NOT need a medium. Travels at ~3 × 10⁸ m/s in vacuum.</p><p>The <b>electromagnetic spectrum</b> (from low to high frequency):</p><ol><li>Radio waves — communication</li><li>Microwaves — cooking, radar</li><li>Infrared — heat, remote controls</li><li>Visible light — the tiny range humans see (ROYGBIV)</li><li>Ultraviolet — sunburn, sterilization</li><li>X-rays — medical imaging</li><li>Gamma rays — highest energy, nuclear reactions</li></ol><p>All EM waves travel at the speed of light. Higher frequency = shorter wavelength = more energy.</p>",
    quiz: [
      { q: "Light travels at approximately:", options: ["343 m/s", "3×10⁸ m/s", "1000 m/s", "9.8 m/s"], answer: 1 },
      { q: "Which has the highest frequency?", options: ["Radio waves", "Microwaves", "Visible light", "Gamma rays"], answer: 3 },
      { q: "Visible light is what part of the EM spectrum?", options: ["The entire spectrum", "A small range", "The lowest frequency", "Not part of it"], answer: 1 },
      { q: "Higher frequency means ___ energy.", options: ["Less", "More", "Same", "No"], answer: 1 }
    ]
  },
  { cat: "Light & Optics", title: "Reflection & Refraction", content: "<p><b>Reflection:</b> Light bounces off a surface. <b>Law of reflection:</b> angle of incidence = angle of reflection.</p><p>Smooth surfaces (mirrors) create <b>specular reflection</b> (clear image). Rough surfaces create <b>diffuse reflection</b> (scattered).</p><p><b>Refraction:</b> Light bends when passing from one medium to another (different densities).</p><p><strong>Example:</strong> A straw looks bent in water because light refracts at the air-water boundary.</p><p><b>Snell's Law:</b> n₁ sin θ₁ = n₂ sin θ₂, where n is the index of refraction.</p><p>Light slows down in denser media (water, glass) and bends toward the normal.</p>",
    quiz: [
      { q: "The law of reflection states:", options: ["Angle of incidence = angle of refraction", "Angle of incidence = angle of reflection", "Light always goes straight", "Light bends in mirrors"], answer: 1 },
      { q: "Refraction is the bending of light due to:", options: ["Reflection", "Changing medium", "Absorption", "Color change"], answer: 1 },
      { q: "A straw looks bent in water because of:", options: ["Reflection", "Refraction", "Diffraction", "Absorption"], answer: 1 },
      { q: "Light entering a denser medium bends:", options: ["Away from the normal", "Toward the normal", "Not at all", "Backward"], answer: 1 }
    ]
  },
  // ---- Electricity & Magnetism ----
  { cat: "Electricity & Magnetism", title: "Electric Charge & Static Electricity", content: "<p>All matter contains <b>electric charges</b>: protons (+) and electrons (−).</p><p><b>Like charges repel</b>; <b>opposite charges attract</b>.</p><p><b>Static electricity</b> is the buildup of charge on an object's surface.</p><p><strong>Charging methods:</strong></p><ul><li><b>Friction:</b> Rubbing transfers electrons (balloon on hair)</li><li><b>Conduction:</b> Direct contact transfers charge</li><li><b>Induction:</b> Nearby charge causes rearrangement without contact</li></ul><p><b>Conductors</b> (metals) allow charge to flow freely. <b>Insulators</b> (rubber, plastic) resist flow.</p>",
    quiz: [
      { q: "Like charges:", options: ["Attract", "Repel", "Cancel", "Have no effect"], answer: 1 },
      { q: "Rubbing a balloon on hair is charging by:", options: ["Conduction", "Induction", "Friction", "Radiation"], answer: 2 },
      { q: "Which is a good conductor?", options: ["Rubber", "Wood", "Copper", "Glass"], answer: 2 },
      { q: "Static electricity is a buildup of:", options: ["Protons", "Neutrons", "Charge", "Energy"], answer: 2 }
    ]
  },
  { cat: "Electricity & Magnetism", title: "Electric Circuits", content: "<p>An <b>electric circuit</b> is a closed loop through which current flows.</p><p><strong>Components:</strong></p><ul><li><b>Voltage (V):</b> 'Push' that drives current. Measured in Volts.</li><li><b>Current (I):</b> Flow of charge. Measured in Amperes (A).</li><li><b>Resistance (R):</b> Opposition to current flow. Measured in Ohms (Ω).</li></ul><p><b>Ohm's Law:</b> V = IR.</p><p><strong>Circuit types:</strong></p><ul><li><b>Series:</b> One path. If one bulb breaks, all go out. Current is the same everywhere.</li><li><b>Parallel:</b> Multiple paths. If one bulb breaks, others still work. Voltage is the same across branches.</li></ul>",
    quiz: [
      { q: "Ohm's Law is:", options: ["V = IR", "V = I/R", "V = I + R", "F = ma"], answer: 0 },
      { q: "Current is measured in:", options: ["Volts", "Ohms", "Amperes", "Watts"], answer: 2 },
      { q: "In a series circuit, if one bulb breaks:", options: ["Others stay lit", "All go out", "Current doubles", "Nothing happens"], answer: 1 },
      { q: "In a parallel circuit, voltage across branches is:", options: ["Different", "The same", "Zero", "Doubled"], answer: 1 }
    ]
  },
  { cat: "Electricity & Magnetism", title: "Magnetism", content: "<p>Every magnet has a <b>north pole</b> and a <b>south pole</b>. You cannot have a single pole.</p><p><b>Like poles repel</b>; <b>opposite poles attract</b>.</p><p>Magnets create a <b>magnetic field</b> — invisible lines of force from north to south.</p><p><b>Electromagnetism:</b> Electric current creates a magnetic field. A coil of wire with current = <b>electromagnet</b>. Stronger with more coils or more current.</p><p><b>Applications:</b> Motors, generators, MRI machines, speakers, maglev trains.</p><p>Earth itself is a giant magnet — its magnetic field protects us from solar radiation and guides compasses.</p>",
    quiz: [
      { q: "Like magnetic poles:", options: ["Attract", "Repel", "Cancel", "Have no effect"], answer: 1 },
      { q: "An electromagnet is made by:", options: ["Rubbing iron", "Passing current through a coil", "Cooling metal", "Using static electricity"], answer: 1 },
      { q: "Magnetic field lines go from:", options: ["South to north", "North to south", "East to west", "Randomly"], answer: 1 },
      { q: "Earth's magnetic field protects us from:", options: ["Rain", "Gravity", "Solar radiation", "Sound"], answer: 2 }
    ]
  },
  // ---- Thermodynamics ----
  { cat: "Thermodynamics", title: "Heat & Temperature", content: "<p><b>Temperature</b> measures the average kinetic energy of particles. <b>Heat</b> is the transfer of thermal energy from hot to cold.</p><p>Heat always flows from <b>hotter to cooler</b> objects until thermal equilibrium.</p><p><strong>Heat transfer methods:</strong></p><ul><li><b>Conduction:</b> Direct contact (touching a hot pan)</li><li><b>Convection:</b> Through fluid movement (boiling water, wind)</li><li><b>Radiation:</b> Through electromagnetic waves (sunlight)</li></ul><p><strong>Specific heat capacity:</strong> Energy needed to raise 1 kg by 1°C. Water has a very high specific heat (4,186 J/kg·°C).</p>",
    quiz: [
      { q: "Heat flows from:", options: ["Cold to hot", "Hot to cold", "Equally both ways", "Only in solids"], answer: 1 },
      { q: "Boiling water transfers heat by:", options: ["Conduction", "Convection", "Radiation", "Induction"], answer: 1 },
      { q: "The Sun warms Earth primarily through:", options: ["Conduction", "Convection", "Radiation", "Contact"], answer: 2 },
      { q: "Temperature measures average:", options: ["Potential energy", "Kinetic energy of particles", "Mass", "Volume"], answer: 1 }
    ]
  }
];

// ======================== CHEMISTRY ========================
const CHEMISTRY_LESSONS = [
  // ---- Atomic Structure ----
  { cat: "Atomic Structure", title: "Atoms & Subatomic Particles", content: "<p>An <b>atom</b> is the smallest unit of an element that retains its properties.</p><p><strong>Subatomic particles:</strong></p><ul><li><b>Proton:</b> Positive charge, in nucleus. Defines the element (atomic number).</li><li><b>Neutron:</b> No charge, in nucleus. Adds mass.</li><li><b>Electron:</b> Negative charge, orbits in shells. Determines chemical behavior.</li></ul><p><b>Atomic number</b> = number of protons. <b>Mass number</b> = protons + neutrons.</p><p>In a neutral atom, protons = electrons. <b>Ions</b> form when atoms gain/lose electrons.</p><p><b>Isotopes</b> are atoms of the same element with different numbers of neutrons.</p>",
    quiz: [
      { q: "Which particle has a positive charge?", options: ["Electron", "Neutron", "Proton", "Photon"], answer: 2 },
      { q: "Atomic number equals the number of:", options: ["Neutrons", "Electrons", "Protons", "Mass"], answer: 2 },
      { q: "Isotopes differ in the number of:", options: ["Protons", "Electrons", "Neutrons", "Charges"], answer: 2 },
      { q: "An ion is an atom that has:", options: ["Extra neutrons", "Gained or lost electrons", "No nucleus", "Split in half"], answer: 1 }
    ]
  },
  { cat: "Atomic Structure", title: "Electron Configuration", content: "<p>Electrons occupy <b>energy levels (shells)</b> around the nucleus.</p><p><strong>Shell capacities:</strong></p><ul><li>1st shell: max 2 electrons</li><li>2nd shell: max 8 electrons</li><li>3rd shell: max 18 electrons (but fills to 8 first)</li></ul><p><b>Valence electrons</b> are in the outermost shell and determine how an atom bonds.</p><p><strong>Example — Carbon (Z=6):</strong> 2 in first shell, 4 in second shell → 4 valence electrons.</p><p>Elements in the same <b>group</b> (column) of the periodic table have the same number of valence electrons.</p>",
    quiz: [
      { q: "The first electron shell holds a maximum of:", options: ["2", "6", "8", "18"], answer: 0 },
      { q: "Valence electrons are in the:", options: ["Nucleus", "Innermost shell", "Outermost shell", "Neutron cloud"], answer: 2 },
      { q: "Carbon has ___ valence electrons.", options: ["2", "4", "6", "8"], answer: 1 },
      { q: "Elements in the same group share the same:", options: ["Mass", "Number of neutrons", "Number of valence electrons", "Color"], answer: 2 }
    ]
  },
  { cat: "Atomic Structure", title: "The Periodic Table", content: "<p>The <b>periodic table</b> organizes elements by increasing atomic number.</p><p><strong>Key features:</strong></p><ul><li><b>Periods</b> (rows): Same number of electron shells</li><li><b>Groups</b> (columns): Same number of valence electrons, similar properties</li></ul><p><strong>Major groups:</strong></p><ul><li>Group 1: Alkali metals (very reactive, 1 valence e⁻)</li><li>Group 2: Alkaline earth metals (2 valence e⁻)</li><li>Groups 3-12: Transition metals</li><li>Group 17: Halogens (7 valence e⁻, very reactive nonmetals)</li><li>Group 18: Noble gases (8 valence e⁻, stable/unreactive)</li></ul><p><b>Metals</b> are on the left, <b>nonmetals</b> on the right, <b>metalloids</b> along the staircase line.</p>",
    quiz: [
      { q: "Periods on the periodic table are:", options: ["Columns", "Rows", "Diagonals", "Blocks"], answer: 1 },
      { q: "Noble gases have ___ valence electrons.", options: ["1", "4", "7", "8"], answer: 3 },
      { q: "Alkali metals are in Group:", options: ["1", "2", "17", "18"], answer: 0 },
      { q: "Metals are found mostly on the ___ side of the table.", options: ["Right", "Top", "Left", "Bottom"], answer: 2 }
    ]
  },
  // ---- Chemical Bonds ----
  { cat: "Chemical Bonds", title: "Ionic Bonds", content: "<p>An <b>ionic bond</b> forms when one atom <b>transfers electrons</b> to another.</p><p>Typically between a <b>metal</b> (loses electrons → cation +) and a <b>nonmetal</b> (gains electrons → anion −).</p><p><strong>Example:</strong> NaCl (table salt). Sodium (Na) loses 1 e⁻ → Na⁺. Chlorine (Cl) gains 1 e⁻ → Cl⁻. The electrostatic attraction holds them together.</p><p><strong>Properties of ionic compounds:</strong></p><ul><li>High melting/boiling points</li><li>Form crystals</li><li>Conduct electricity when dissolved in water or melted</li><li>Brittle as solids</li></ul>",
    quiz: [
      { q: "Ionic bonds involve:", options: ["Sharing electrons", "Transferring electrons", "Sharing protons", "Nuclear fusion"], answer: 1 },
      { q: "Ionic bonds typically form between:", options: ["Two metals", "Two nonmetals", "A metal and nonmetal", "Two noble gases"], answer: 2 },
      { q: "NaCl is an example of a(n):", options: ["Covalent compound", "Ionic compound", "Metallic bond", "Gas"], answer: 1 },
      { q: "Ionic compounds conduct electricity when:", options: ["Solid", "Frozen", "Dissolved or melted", "In vacuum"], answer: 2 }
    ]
  },
  { cat: "Chemical Bonds", title: "Covalent Bonds", content: "<p>A <b>covalent bond</b> forms when atoms <b>share electrons</b>. Typically between two nonmetals.</p><p><strong>Types:</strong></p><ul><li><b>Single bond:</b> 1 pair shared (H₂)</li><li><b>Double bond:</b> 2 pairs shared (O₂)</li><li><b>Triple bond:</b> 3 pairs shared (N₂)</li></ul><p><strong>Properties of covalent/molecular compounds:</strong></p><ul><li>Lower melting/boiling points than ionic</li><li>Often gases or liquids at room temperature</li><li>Poor conductors of electricity</li><li>Can exist as molecules (H₂O, CO₂, C₆H₁₂O₆)</li></ul><p><b>Polar covalent:</b> Unequal sharing (H₂O). <b>Nonpolar:</b> Equal sharing (O₂).</p>",
    quiz: [
      { q: "Covalent bonds involve:", options: ["Transferring electrons", "Sharing electrons", "Losing protons", "Gaining neutrons"], answer: 1 },
      { q: "O₂ has what type of covalent bond?", options: ["Single", "Double", "Triple", "Ionic"], answer: 1 },
      { q: "Covalent compounds tend to have:", options: ["High melting points", "Low melting points", "Strong conductivity", "Crystal structure"], answer: 1 },
      { q: "Water (H₂O) has ___ covalent bonds.", options: ["Nonpolar", "Polar", "Ionic", "Metallic"], answer: 1 }
    ]
  },
  // ---- Chemical Reactions ----
  { cat: "Chemical Reactions", title: "Balancing Chemical Equations", content: "<p>A <b>chemical equation</b> represents a reaction: reactants → products.</p><p>The <b>Law of Conservation of Mass:</b> Matter is neither created nor destroyed. Atoms on the left must equal atoms on the right.</p><p><strong>Balancing steps:</strong></p><ol><li>Write the unbalanced equation</li><li>Count atoms of each element on both sides</li><li>Add <b>coefficients</b> (not subscripts) to balance</li><li>Check that all atoms are equal</li></ol><p><strong>Example:</strong> H₂ + O₂ → H₂O → Balanced: 2H₂ + O₂ → 2H₂O (4 H and 2 O each side).</p>",
    quiz: [
      { q: "What must be conserved in a chemical equation?", options: ["Energy only", "Mass", "Color", "Temperature"], answer: 1 },
      { q: "To balance an equation, you adjust:", options: ["Subscripts", "Coefficients", "Temperatures", "Pressures"], answer: 1 },
      { q: "In 2H₂ + O₂ → 2H₂O, how many O atoms on each side?", options: ["1", "2", "4", "3"], answer: 1 },
      { q: "Reactants are on which side of the arrow?", options: ["Right", "Left", "Both", "Above"], answer: 1 }
    ]
  },
  { cat: "Chemical Reactions", title: "Types of Chemical Reactions", content: "<p><strong>Five main types:</strong></p><ul><li><b>Synthesis:</b> A + B → AB (two substances combine). Example: 2Na + Cl₂ → 2NaCl</li><li><b>Decomposition:</b> AB → A + B (one substance breaks apart). Example: 2H₂O → 2H₂ + O₂</li><li><b>Single replacement:</b> A + BC → AC + B (one element replaces another). Example: Zn + CuSO₄ → ZnSO₄ + Cu</li><li><b>Double replacement:</b> AB + CD → AD + CB (elements swap partners). Example: NaCl + AgNO₃ → NaNO₃ + AgCl</li><li><b>Combustion:</b> Fuel + O₂ → CO₂ + H₂O (burning). Example: CH₄ + 2O₂ → CO₂ + 2H₂O</li></ul>",
    quiz: [
      { q: "A + B → AB is a ___ reaction.", options: ["Decomposition", "Synthesis", "Combustion", "Single replacement"], answer: 1 },
      { q: "Breaking down water into H₂ and O₂ is:", options: ["Synthesis", "Decomposition", "Combustion", "Double replacement"], answer: 1 },
      { q: "Combustion always requires:", options: ["Water", "Oxygen", "Nitrogen", "Carbon"], answer: 1 },
      { q: "Zn replacing Cu in CuSO₄ is ___ replacement.", options: ["Double", "Single", "Triple", "No"], answer: 1 }
    ]
  },
  { cat: "Chemical Reactions", title: "Acids & Bases", content: "<p><b>Acids</b> have a pH below 7 and produce H⁺ ions in water. Taste sour. Examples: HCl, vinegar, citrus.</p><p><b>Bases</b> have a pH above 7 and produce OH⁻ ions. Feel slippery. Examples: NaOH, soap, ammonia.</p><p><b>pH 7</b> = neutral (pure water).</p><p><b>pH scale:</b> 0 (strongly acidic) to 14 (strongly basic). Each step is 10× change in concentration.</p><p><b>Neutralization:</b> Acid + Base → Salt + Water. HCl + NaOH → NaCl + H₂O.</p><p><b>Indicators</b> change color to show pH: litmus paper (red in acid, blue in base), phenolphthalein (pink in base).</p>",
    quiz: [
      { q: "An acid has a pH:", options: ["Above 7", "Exactly 7", "Below 7", "Of 14"], answer: 2 },
      { q: "Acid + Base produces:", options: ["More acid", "Salt + Water", "Gas only", "A metal"], answer: 1 },
      { q: "Which pH is neutral?", options: ["0", "5", "7", "14"], answer: 2 },
      { q: "Litmus paper turns ___ in acid.", options: ["Blue", "Green", "Red", "Yellow"], answer: 2 }
    ]
  },
  // ---- States of Matter ----
  { cat: "States of Matter", title: "Solids, Liquids & Gases", content: "<p>Matter exists in three common states, determined by particle arrangement and energy:</p><ul><li><b>Solid:</b> Particles tightly packed in fixed positions. Definite shape and volume. Vibrate in place.</li><li><b>Liquid:</b> Particles close but can slide past each other. Definite volume, takes shape of container.</li><li><b>Gas:</b> Particles far apart, move freely. No definite shape or volume. Fills container.</li></ul><p><strong>Phase changes:</strong></p><ul><li>Solid → Liquid: <b>Melting</b></li><li>Liquid → Gas: <b>Evaporation/Boiling</b></li><li>Gas → Liquid: <b>Condensation</b></li><li>Liquid → Solid: <b>Freezing</b></li><li>Solid → Gas: <b>Sublimation</b></li></ul>",
    quiz: [
      { q: "Which state has definite shape and volume?", options: ["Gas", "Liquid", "Solid", "Plasma"], answer: 2 },
      { q: "Liquid becoming gas is called:", options: ["Freezing", "Condensation", "Evaporation", "Sublimation"], answer: 2 },
      { q: "Gas particles are:", options: ["Tightly packed", "Close together", "Far apart and moving freely", "Not moving"], answer: 2 },
      { q: "Solid directly becoming gas is:", options: ["Melting", "Boiling", "Condensation", "Sublimation"], answer: 3 }
    ]
  },
  { cat: "States of Matter", title: "Gas Laws", content: "<p><strong>Boyle's Law:</strong> At constant temperature, pressure × volume = constant. P₁V₁ = P₂V₂. Pressure and volume are inversely proportional.</p><p><strong>Charles's Law:</strong> At constant pressure, volume is proportional to temperature. V₁/T₁ = V₂/T₂. (Temperature in Kelvin!)</p><p><strong>Gay-Lussac's Law:</strong> At constant volume, pressure is proportional to temperature. P₁/T₁ = P₂/T₂.</p><p><strong>Ideal Gas Law:</strong> PV = nRT (combines all three). R = 8.314 J/(mol·K).</p><p><b>STP</b> (Standard Temperature and Pressure): 0°C (273 K) and 1 atm.</p>",
    quiz: [
      { q: "Boyle's Law relates pressure and:", options: ["Temperature", "Volume", "Moles", "Mass"], answer: 1 },
      { q: "If pressure increases at constant temperature, volume:", options: ["Increases", "Decreases", "Stays the same", "Doubles"], answer: 1 },
      { q: "Charles's Law requires temperature in:", options: ["Celsius", "Fahrenheit", "Kelvin", "Any unit"], answer: 2 },
      { q: "The ideal gas law is:", options: ["PV = nRT", "P = mv", "F = ma", "E = mc²"], answer: 0 }
    ]
  },
  // ---- Solutions & Mixtures ----
  { cat: "Solutions & Mixtures", title: "Mixtures vs. Pure Substances", content: "<p><b>Pure substance:</b> Constant composition. Either an <b>element</b> (one type of atom) or a <b>compound</b> (fixed ratio of atoms).</p><p><b>Mixture:</b> Two or more substances physically combined. Variable composition.</p><ul><li><b>Homogeneous mixture (solution):</b> Uniform throughout. Examples: salt water, air, alloys.</li><li><b>Heterogeneous mixture:</b> Non-uniform, components visible. Examples: salad, sand in water, trail mix.</li></ul><p><strong>Separation methods:</strong> Filtration (size), distillation (boiling point), evaporation, chromatography (solubility), magnetism.</p>",
    quiz: [
      { q: "Salt water is a:", options: ["Pure substance", "Heterogeneous mixture", "Homogeneous mixture", "Element"], answer: 2 },
      { q: "A compound has:", options: ["Variable composition", "One type of atom", "A fixed ratio of atoms", "No atoms"], answer: 2 },
      { q: "Filtration separates based on:", options: ["Boiling point", "Color", "Particle size", "Magnetism"], answer: 2 },
      { q: "Trail mix is a ___ mixture.", options: ["Homogeneous", "Heterogeneous", "Pure", "Elemental"], answer: 1 }
    ]
  },
  { cat: "Solutions & Mixtures", title: "Concentration & Solubility", content: "<p>A <b>solution</b> has a <b>solute</b> (dissolved substance) and a <b>solvent</b> (does the dissolving). Water is the 'universal solvent.'</p><p><b>Concentration</b> measures how much solute is dissolved. Can express as g/L, molarity (mol/L), or percent.</p><p><b>Solubility:</b> Maximum amount of solute that dissolves in a given amount of solvent at a specific temperature.</p><ul><li><b>Unsaturated:</b> Can dissolve more solute</li><li><b>Saturated:</b> Maximum solute dissolved</li><li><b>Supersaturated:</b> Contains more than the maximum (unstable)</li></ul><p>Generally, solubility of solids increases with temperature. Gas solubility decreases with temperature.</p>",
    quiz: [
      { q: "The universal solvent is:", options: ["Alcohol", "Oil", "Water", "Acid"], answer: 2 },
      { q: "A saturated solution:", options: ["Can dissolve more", "Has maximum dissolved solute", "Has no solute", "Is always hot"], answer: 1 },
      { q: "Increasing temperature usually ___ solid solubility.", options: ["Decreases", "Increases", "Doesn't change", "Eliminates"], answer: 1 },
      { q: "Molarity measures:", options: ["Mass per liter", "Moles per liter", "Grams per mole", "Volume per mole"], answer: 1 }
    ]
  }
];

// ======================== BIOLOGY ========================
const BIOLOGY_LESSONS = [
  // ---- Cell Biology ----
  { cat: "Cell Biology", title: "Cell Theory & Types of Cells", content: "<p><b>Cell theory</b> states:</p><ol><li>All living things are made of cells</li><li>Cells are the basic unit of life</li><li>All cells come from existing cells</li></ol><p><strong>Two main cell types:</strong></p><ul><li><b>Prokaryotic:</b> No nucleus or membrane-bound organelles. Smaller and simpler. Bacteria and archaea.</li><li><b>Eukaryotic:</b> Has a nucleus and organelles. Larger and more complex. Plants, animals, fungi, protists.</li></ul><p>Both types have: DNA, ribosomes, cell membrane, and cytoplasm.</p>",
    quiz: [
      { q: "Which cells have a nucleus?", options: ["Prokaryotic", "Eukaryotic", "Both", "Neither"], answer: 1 },
      { q: "All cells come from:", options: ["Nothing", "Chemicals", "Existing cells", "Spontaneous generation"], answer: 2 },
      { q: "Bacteria are:", options: ["Eukaryotic", "Prokaryotic", "Not cells", "Multicellular"], answer: 1 },
      { q: "Which is shared by both prokaryotic and eukaryotic cells?", options: ["Nucleus", "Mitochondria", "Cell membrane", "Chloroplast"], answer: 2 }
    ]
  },
  { cat: "Cell Biology", title: "Cell Organelles", content: "<p><strong>Key organelles:</strong></p><ul><li><b>Nucleus:</b> Contains DNA, controls cell activities. 'Brain' of the cell.</li><li><b>Mitochondria:</b> Produces energy (ATP) via cellular respiration. 'Powerhouse.'</li><li><b>Ribosomes:</b> Make proteins. Found free or on rough ER.</li><li><b>Endoplasmic Reticulum:</b> Rough ER (has ribosomes, makes proteins), Smooth ER (makes lipids).</li><li><b>Golgi Apparatus:</b> Packages and ships proteins. 'Post office.'</li><li><b>Lysosomes:</b> Digest waste and old organelles. 'Recycling center.'</li><li><b>Cell membrane:</b> Controls what enters/exits. Selectively permeable.</li></ul><p><b>Plant cells also have:</b> Cell wall (rigid support), chloroplasts (photosynthesis), large central vacuole.</p>",
    quiz: [
      { q: "The 'powerhouse of the cell' is the:", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi"], answer: 2 },
      { q: "Which organelle packages proteins?", options: ["Ribosome", "Golgi apparatus", "Lysosome", "ER"], answer: 1 },
      { q: "Plant cells have ___ that animal cells do not.", options: ["Mitochondria", "Ribosomes", "Cell membrane", "Chloroplasts"], answer: 3 },
      { q: "Ribosomes make:", options: ["Lipids", "Carbohydrates", "Proteins", "DNA"], answer: 2 }
    ]
  },
  { cat: "Cell Biology", title: "Cell Transport", content: "<p>The cell membrane is <b>selectively permeable</b> — it controls what passes through.</p><p><strong>Passive transport (no energy needed):</strong></p><ul><li><b>Diffusion:</b> Molecules move from high to low concentration</li><li><b>Osmosis:</b> Water diffuses across a membrane</li><li><b>Facilitated diffusion:</b> Uses protein channels (still no energy)</li></ul><p><strong>Active transport (requires ATP):</strong></p><ul><li><b>Pump proteins:</b> Move substances against the concentration gradient</li><li><b>Endocytosis:</b> Cell engulfs substances</li><li><b>Exocytosis:</b> Cell expels substances</li></ul>",
    quiz: [
      { q: "Osmosis is the diffusion of:", options: ["Oxygen", "Glucose", "Water", "Proteins"], answer: 2 },
      { q: "Passive transport requires:", options: ["ATP", "No energy", "Oxygen", "Enzymes"], answer: 1 },
      { q: "Moving substances against the gradient requires:", options: ["Diffusion", "Osmosis", "Active transport", "No energy"], answer: 2 },
      { q: "Endocytosis is when a cell:", options: ["Divides", "Engulfs substances", "Releases waste", "Makes protein"], answer: 1 }
    ]
  },
  { cat: "Cell Biology", title: "Mitosis & Cell Division", content: "<p><b>Mitosis</b> produces two genetically identical daughter cells for growth and repair.</p><p><strong>Phases:</strong></p><ol><li><b>Interphase:</b> Cell grows, DNA replicates (not technically mitosis)</li><li><b>Prophase:</b> Chromosomes condense, nuclear membrane breaks down</li><li><b>Metaphase:</b> Chromosomes line up in the middle</li><li><b>Anaphase:</b> Chromosomes pull apart to opposite sides</li><li><b>Telophase:</b> Nuclear membranes reform, chromosomes unwind</li><li><b>Cytokinesis:</b> Cytoplasm divides — two cells</li></ol><p>Remember: <b>PMAT</b> (Prophase, Metaphase, Anaphase, Telophase).</p>",
    quiz: [
      { q: "Mitosis produces ___ daughter cells.", options: ["1", "2", "4", "8"], answer: 1 },
      { q: "DNA replicates during:", options: ["Prophase", "Metaphase", "Interphase", "Telophase"], answer: 2 },
      { q: "Chromosomes line up in the middle during:", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], answer: 1 },
      { q: "The purpose of mitosis is:", options: ["Reproduction", "Growth and repair", "Making sex cells", "Evolution"], answer: 1 }
    ]
  },
  // ---- Genetics ----
  { cat: "Genetics", title: "DNA Structure", content: "<p><b>DNA</b> (deoxyribonucleic acid) carries genetic instructions for all living organisms.</p><p><strong>Structure:</strong> Double helix — two strands twisted like a spiral ladder.</p><p><b>Nucleotide</b> building blocks: phosphate group + deoxyribose sugar + nitrogenous base.</p><p><strong>Four bases:</strong></p><ul><li><b>Adenine (A)</b> pairs with <b>Thymine (T)</b></li><li><b>Cytosine (C)</b> pairs with <b>Guanine (G)</b></li></ul><p>This is called <b>complementary base pairing</b>. The base pairs are held together by <b>hydrogen bonds</b>.</p><p><b>Genes</b> are segments of DNA that code for proteins.</p>",
    quiz: [
      { q: "DNA stands for:", options: ["Deoxyribonucleic acid", "Dinucleic acid", "Double nucleic acid", "Deoxyribosome acid"], answer: 0 },
      { q: "Adenine pairs with:", options: ["Cytosine", "Guanine", "Thymine", "Uracil"], answer: 2 },
      { q: "DNA's shape is a:", options: ["Single strand", "Triple helix", "Double helix", "Circle"], answer: 2 },
      { q: "A gene codes for a:", options: ["Cell", "Chromosome", "Protein", "Sugar"], answer: 2 }
    ]
  },
  { cat: "Genetics", title: "Heredity & Punnett Squares", content: "<p><b>Heredity</b> is the passing of traits from parents to offspring.</p><p>Each trait is determined by <b>alleles</b> — different versions of a gene. You get one from each parent.</p><ul><li><b>Dominant (capital letter):</b> Expressed when present (B)</li><li><b>Recessive (lowercase):</b> Only expressed when both alleles are recessive (bb)</li></ul><p><b>Genotype:</b> The allele combination (BB, Bb, bb). <b>Phenotype:</b> The observable trait (brown eyes).</p><p><b>Homozygous:</b> Same alleles (BB or bb). <b>Heterozygous:</b> Different alleles (Bb).</p><p>A <b>Punnett square</b> predicts offspring genotypes and phenotypes from a cross.</p>",
    quiz: [
      { q: "A heterozygous genotype is:", options: ["BB", "bb", "Bb", "BC"], answer: 2 },
      { q: "Phenotype refers to:", options: ["Allele combination", "Observable trait", "DNA sequence", "Chromosome number"], answer: 1 },
      { q: "A recessive trait is expressed when:", options: ["One allele is present", "Both alleles are recessive", "The dominant is present", "Always"], answer: 1 },
      { q: "Bb × Bb: what fraction of offspring is bb?", options: ["0%", "25%", "50%", "75%"], answer: 1 }
    ]
  },
  // ---- Ecology ----
  { cat: "Ecology", title: "Ecosystems & Food Chains", content: "<p>An <b>ecosystem</b> includes all living (<b>biotic</b>) and nonliving (<b>abiotic</b>) things in an area and their interactions.</p><p><strong>Energy flow:</strong></p><ul><li><b>Producers:</b> Make their own food (plants, algae) via photosynthesis</li><li><b>Primary consumers:</b> Herbivores that eat producers</li><li><b>Secondary consumers:</b> Carnivores that eat herbivores</li><li><b>Tertiary consumers:</b> Top predators</li><li><b>Decomposers:</b> Break down dead matter (bacteria, fungi)</li></ul><p>Energy decreases at each level — only ~10% is passed on (<b>10% rule</b>).</p><p>A <b>food web</b> shows multiple interconnected food chains.</p>",
    quiz: [
      { q: "Producers get energy from:", options: ["Other organisms", "The sun (photosynthesis)", "Decomposers", "Consumers"], answer: 1 },
      { q: "The 10% rule means:", options: ["10% of organisms survive", "10% of energy passes to next level", "10% is lost to heat", "Both B and C"], answer: 3 },
      { q: "Abiotic factors include:", options: ["Plants", "Animals", "Temperature and water", "Bacteria"], answer: 2 },
      { q: "Decomposers:", options: ["Eat plants", "Hunt prey", "Break down dead matter", "Produce oxygen"], answer: 2 }
    ]
  },
  { cat: "Ecology", title: "Photosynthesis & Respiration", content: "<p><b>Photosynthesis:</b> Plants convert sunlight, CO₂, and water into glucose and oxygen.</p><p>6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p><p>Occurs in <b>chloroplasts</b>. Requires chlorophyll (green pigment that absorbs light).</p><p><b>Cellular Respiration:</b> Cells break down glucose to release energy (ATP).</p><p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP</p><p>Occurs in <b>mitochondria</b>.</p><p>These are <b>complementary processes</b> — the products of one are the reactants of the other.</p>",
    quiz: [
      { q: "Photosynthesis produces:", options: ["CO₂ and water", "Glucose and oxygen", "ATP only", "Nothing"], answer: 1 },
      { q: "Photosynthesis occurs in:", options: ["Mitochondria", "Nucleus", "Chloroplasts", "Ribosomes"], answer: 2 },
      { q: "Cellular respiration occurs in:", options: ["Chloroplasts", "Mitochondria", "Cell wall", "Vacuole"], answer: 1 },
      { q: "What do photosynthesis and respiration have in common?", options: ["Same organelle", "Same equation", "They are complementary processes", "They only occur in plants"], answer: 2 }
    ]
  },
  // ---- Human Body ----
  { cat: "Human Body", title: "Organ Systems Overview", content: "<p>The human body has <b>11 major organ systems</b> that work together:</p><ul><li><b>Skeletal:</b> Bones — support, protection, movement</li><li><b>Muscular:</b> Muscles — movement, posture, heat</li><li><b>Circulatory:</b> Heart, blood, vessels — transport nutrients/oxygen</li><li><b>Respiratory:</b> Lungs — gas exchange (O₂ in, CO₂ out)</li><li><b>Digestive:</b> Stomach, intestines — break down food, absorb nutrients</li><li><b>Nervous:</b> Brain, spinal cord, nerves — control and communication</li><li><b>Endocrine:</b> Glands, hormones — chemical regulation</li><li><b>Immune/Lymphatic:</b> White blood cells — fight infection</li><li><b>Urinary:</b> Kidneys — filter blood, remove waste</li><li><b>Reproductive:</b> Produce offspring</li><li><b>Integumentary:</b> Skin, hair, nails — protection</li></ul>",
    quiz: [
      { q: "Which system includes the heart?", options: ["Respiratory", "Digestive", "Circulatory", "Nervous"], answer: 2 },
      { q: "The nervous system's main organs are:", options: ["Lungs and diaphragm", "Brain and spinal cord", "Heart and blood vessels", "Stomach and intestines"], answer: 1 },
      { q: "Which system filters blood and removes waste?", options: ["Digestive", "Circulatory", "Urinary", "Respiratory"], answer: 2 },
      { q: "The integumentary system includes:", options: ["Bones", "Muscles", "Skin, hair, nails", "Hormones"], answer: 2 }
    ]
  },
  // ---- Evolution ----
  { cat: "Evolution", title: "Natural Selection", content: "<p><b>Natural selection</b> is the process by which organisms with favorable traits are more likely to survive and reproduce. It drives evolution.</p><p><strong>Four conditions:</strong></p><ol><li><b>Variation:</b> Individuals differ in traits</li><li><b>Inheritance:</b> Traits are passed to offspring</li><li><b>Overproduction:</b> More offspring produced than can survive</li><li><b>Differential survival:</b> Those with advantageous traits survive better</li></ol><p>Over many generations, favorable traits become more common in the population. This is 'survival of the fittest' — <b>fitness</b> means reproductive success, not physical strength.</p><p>Charles Darwin developed this theory after studying organisms on the Galapagos Islands.</p>",
    quiz: [
      { q: "Natural selection requires variation, inheritance, and:", options: ["Mutation only", "Overproduction and differential survival", "Genetic engineering", "Random elimination"], answer: 1 },
      { q: "'Fitness' in evolution means:", options: ["Physical strength", "Speed", "Reproductive success", "Intelligence"], answer: 2 },
      { q: "Who developed the theory of natural selection?", options: ["Newton", "Einstein", "Darwin", "Mendel"], answer: 2 },
      { q: "Natural selection acts on:", options: ["Individuals", "Populations over time", "Only animals", "DNA directly"], answer: 1 }
    ]
  },
  { cat: "Evolution", title: "Evidence for Evolution", content: "<p>Multiple lines of evidence support evolution:</p><ul><li><b>Fossil record:</b> Shows change over time and transitional forms</li><li><b>Comparative anatomy:</b><ul><li><b>Homologous structures:</b> Same structure, different function (human arm, whale flipper, bat wing). Suggest common ancestor.</li><li><b>Analogous structures:</b> Different structure, same function (bird wing, insect wing). Suggest convergent evolution.</li><li><b>Vestigial structures:</b> Reduced/useless remnants (appendix, whale pelvis)</li></ul></li><li><b>Embryology:</b> Similar embryo development across species</li><li><b>DNA/molecular biology:</b> More similar DNA = more closely related</li><li><b>Biogeography:</b> Distribution of species matches evolutionary history</li></ul>",
    quiz: [
      { q: "Homologous structures suggest:", options: ["Convergent evolution", "Common ancestor", "No relationship", "Identical function"], answer: 1 },
      { q: "A vestigial structure is:", options: ["Highly useful", "A new evolution", "A reduced/useless remnant", "Found only in fossils"], answer: 2 },
      { q: "More similar DNA indicates:", options: ["No relationship", "Closer evolutionary relationship", "Different species always", "Random chance"], answer: 1 },
      { q: "The fossil record shows:", options: ["No change over time", "Change and transitional forms", "Only living species", "Only extinction"], answer: 1 }
    ]
  }
];

// ======================== HISTORY ========================
const HISTORY_LESSONS = [
  // ---- Ancient Civilizations ----
  { cat: "Ancient Civilizations", title: "Mesopotamia — Cradle of Civilization", content: "<p><b>Mesopotamia</b> ('land between rivers') sat between the Tigris and Euphrates rivers in modern-day Iraq.</p><p><strong>Key achievements:</strong></p><ul><li><b>Cuneiform:</b> One of the first writing systems (wedge-shaped marks on clay)</li><li><b>Code of Hammurabi:</b> One of the first written law codes (~1754 BC)</li><li><b>Wheel, plow, and irrigation</b></li><li><b>Ziggurat temples</b></li><li>60-based number system (why we have 60 minutes and 360°)</li></ul><p>Major civilizations: Sumerians, Akkadians, Babylonians, Assyrians.</p>",
    quiz: [
      { q: "Mesopotamia was between which rivers?", options: ["Nile and Congo", "Tigris and Euphrates", "Amazon and Orinoco", "Ganges and Indus"], answer: 1 },
      { q: "Cuneiform was a system of:", options: ["Math", "Writing", "Agriculture", "Government"], answer: 1 },
      { q: "The Code of Hammurabi was:", options: ["A religious text", "A writing system", "A law code", "A calendar"], answer: 2 },
      { q: "Mesopotamia is in modern-day:", options: ["Egypt", "Greece", "Iraq", "India"], answer: 2 }
    ]
  },
  { cat: "Ancient Civilizations", title: "Ancient Egypt", content: "<p>Ancient Egyptian civilization thrived along the <b>Nile River</b> for over 3,000 years.</p><p><strong>Key features:</strong></p><ul><li><b>Pharaohs:</b> God-kings who ruled with absolute power</li><li><b>Pyramids:</b> Massive tombs for pharaohs (Great Pyramid of Giza, ~2560 BC)</li><li><b>Hieroglyphics:</b> Writing system using pictures and symbols</li><li><b>Mummification:</b> Preserving bodies for the afterlife</li><li><b>Nile floods:</b> Annual flooding deposited rich soil for farming</li></ul><p>The <b>Rosetta Stone</b> (discovered 1799) helped decode hieroglyphics — it had the same text in hieroglyphics, Demotic, and Greek.</p>",
    quiz: [
      { q: "Egyptian civilization centered around the:", options: ["Tigris River", "Amazon River", "Nile River", "Ganges River"], answer: 2 },
      { q: "Egyptian rulers were called:", options: ["Kings", "Emperors", "Pharaohs", "Senators"], answer: 2 },
      { q: "The Rosetta Stone helped decode:", options: ["Cuneiform", "Hieroglyphics", "Latin", "Sanskrit"], answer: 1 },
      { q: "Pyramids were built as:", options: ["Temples", "Homes", "Tombs", "Forts"], answer: 2 }
    ]
  },
  { cat: "Ancient Civilizations", title: "Ancient Greece", content: "<p>Ancient Greece (c. 800–146 BC) is considered the birthplace of <b>Western civilization</b>.</p><p><strong>Key contributions:</strong></p><ul><li><b>Democracy:</b> Athens created the first direct democracy</li><li><b>Philosophy:</b> Socrates, Plato, Aristotle</li><li><b>Olympics:</b> Athletic competitions honoring Zeus (776 BC)</li><li><b>Architecture:</b> Parthenon, columns (Doric, Ionic, Corinthian)</li><li><b>Theater:</b> Tragedy and comedy plays</li><li><b>Science/Math:</b> Pythagoras, Euclid, Archimedes, Hippocrates</li></ul><p><b>City-states (poleis):</b> Athens (democracy, learning) vs. Sparta (military, discipline).</p><p><b>Alexander the Great</b> (356–323 BC) spread Greek culture across a vast empire.</p>",
    quiz: [
      { q: "Athens is known for creating:", options: ["The Roman Empire", "Democracy", "The alphabet", "Pyramids"], answer: 1 },
      { q: "Which philosopher was Plato's teacher?", options: ["Aristotle", "Pythagoras", "Socrates", "Homer"], answer: 2 },
      { q: "Sparta was known for its:", options: ["Art and philosophy", "Democracy", "Military culture", "Trade routes"], answer: 2 },
      { q: "Alexander the Great spread ___ culture.", options: ["Roman", "Egyptian", "Persian", "Greek"], answer: 3 }
    ]
  },
  { cat: "Ancient Civilizations", title: "Ancient Rome", content: "<p>Rome grew from a small city to an empire spanning Europe, North Africa, and the Middle East.</p><p><strong>Government evolution:</strong> Monarchy → <b>Republic</b> (509 BC, Senate + elected officials) → <b>Empire</b> (27 BC, Augustus as first emperor).</p><p><strong>Roman contributions:</strong></p><ul><li><b>Law:</b> Twelve Tables, concept of 'innocent until proven guilty'</li><li><b>Engineering:</b> Roads, aqueducts, concrete, the Colosseum</li><li><b>Language:</b> Latin → basis for Romance languages (Spanish, French, Italian, Portuguese, Romanian)</li><li><b>Government:</b> Senate, republic system influenced modern democracies</li></ul><p>The Western Roman Empire fell in <b>476 AD</b>, marking the start of the Middle Ages.</p>",
    quiz: [
      { q: "The Roman Republic was governed by a:", options: ["King", "Senate", "Pharaoh", "Council of elders"], answer: 1 },
      { q: "Rome's first emperor was:", options: ["Julius Caesar", "Augustus", "Nero", "Constantine"], answer: 1 },
      { q: "Latin is the ancestor of:", options: ["Germanic languages", "Romance languages", "Slavic languages", "Asian languages"], answer: 1 },
      { q: "The Western Roman Empire fell in:", options: ["27 BC", "44 BC", "476 AD", "1453 AD"], answer: 2 }
    ]
  },
  // ---- World History ----
  { cat: "World History", title: "The Renaissance", content: "<p>The <b>Renaissance</b> ('rebirth') was a cultural movement from the 14th to 17th century, starting in <b>Italy</b>.</p><p>It marked a revival of interest in <b>classical Greek and Roman</b> art, literature, and learning.</p><p><strong>Key figures:</strong></p><ul><li><b>Leonardo da Vinci:</b> Painter, scientist, inventor (Mona Lisa, Vitruvian Man)</li><li><b>Michelangelo:</b> Sculptor, painter (David, Sistine Chapel ceiling)</li><li><b>Shakespeare:</b> English playwright and poet</li><li><b>Galileo:</b> Astronomer, supported heliocentrism</li><li><b>Gutenberg:</b> Invented the printing press (~1440) — revolutionized knowledge spread</li></ul><p><b>Humanism:</b> Philosophy emphasizing human potential, reason, and individualism.</p>",
    quiz: [
      { q: "The Renaissance began in:", options: ["England", "France", "Italy", "Germany"], answer: 2 },
      { q: "Who painted the Sistine Chapel ceiling?", options: ["Da Vinci", "Raphael", "Michelangelo", "Donatello"], answer: 2 },
      { q: "The printing press was invented by:", options: ["Shakespeare", "Galileo", "Gutenberg", "Da Vinci"], answer: 2 },
      { q: "Renaissance means:", options: ["Revolution", "Reform", "Rebirth", "Return"], answer: 2 }
    ]
  },
  { cat: "World History", title: "Age of Exploration", content: "<p>From the 15th to 17th century, European nations explored the world seeking trade routes, wealth, and territory.</p><p><strong>Motivations — 'God, Gold, and Glory':</strong></p><ul><li>Spread Christianity</li><li>Find gold, spices, and trade routes</li><li>National prestige</li></ul><p><strong>Key explorers:</strong></p><ul><li><b>Columbus (1492):</b> Sailed for Spain, reached the Caribbean</li><li><b>Vasco da Gama:</b> Portuguese, sea route to India</li><li><b>Magellan:</b> First circumnavigation of the globe</li><li><b>Cortés:</b> Conquered the Aztec Empire</li><li><b>Pizarro:</b> Conquered the Inca Empire</li></ul><p>The <b>Columbian Exchange</b> transferred plants, animals, diseases, and cultures between the Old and New Worlds.</p>",
    quiz: [
      { q: "The three motivations for exploration were:", options: ["Gold, Glory, God", "Trade, War, Science", "Freedom, Equality, Justice", "Land, Labor, Capital"], answer: 0 },
      { q: "Columbus sailed in:", options: ["1392", "1492", "1592", "1692"], answer: 1 },
      { q: "The Columbian Exchange involved:", options: ["Money only", "Plants, animals, diseases between hemispheres", "Military alliances", "Religious texts"], answer: 1 },
      { q: "Who led the first circumnavigation?", options: ["Columbus", "Da Gama", "Magellan", "Drake"], answer: 2 }
    ]
  },
  // ---- American History ----
  { cat: "American History", title: "American Revolution", content: "<p>The <b>American Revolution</b> (1775–1783) was the colonies' war for independence from Britain.</p><p><strong>Causes:</strong></p><ul><li><b>Taxation without representation:</b> Stamp Act, Tea Act, Townshend Acts</li><li><b>Boston Massacre (1770)</b> and <b>Boston Tea Party (1773)</b></li><li>Colonists wanted self-governance</li></ul><p><strong>Key events:</strong></p><ul><li><b>Declaration of Independence (July 4, 1776):</b> Written primarily by Thomas Jefferson</li><li><b>Battle of Saratoga (1777):</b> Turning point, convinced France to help</li><li><b>Battle of Yorktown (1781):</b> Last major battle, British surrender</li></ul><p><b>Treaty of Paris (1783)</b> officially ended the war. George Washington became the first president.</p>",
    quiz: [
      { q: "The Declaration of Independence was written in:", options: ["1774", "1775", "1776", "1783"], answer: 2 },
      { q: "Who primarily wrote the Declaration?", options: ["Washington", "Adams", "Jefferson", "Franklin"], answer: 2 },
      { q: "'Taxation without representation' meant:", options: ["Taxes were too low", "Colonists were taxed but had no vote in Parliament", "Britain had no taxes", "Representation was free"], answer: 1 },
      { q: "The turning point battle that brought French support:", options: ["Lexington", "Bunker Hill", "Saratoga", "Yorktown"], answer: 2 }
    ]
  },
  { cat: "American History", title: "The U.S. Constitution", content: "<p>The <b>Constitution</b> (1787) is the supreme law of the United States, replacing the weak Articles of Confederation.</p><p><strong>Key principles:</strong></p><ul><li><b>Separation of powers:</b> Three branches of government</li><li><b>Checks and balances:</b> Each branch limits the others</li><li><b>Federalism:</b> Power shared between federal and state governments</li><li><b>Popular sovereignty:</b> Government power comes from the people</li></ul><p><strong>Three branches:</strong></p><ul><li><b>Legislative (Congress):</b> Makes laws. Senate + House of Representatives.</li><li><b>Executive (President):</b> Enforces laws.</li><li><b>Judicial (Supreme Court):</b> Interprets laws.</li></ul><p>The <b>Bill of Rights</b> (first 10 amendments) protects individual freedoms: speech, religion, press, assembly, etc.</p>",
    quiz: [
      { q: "The three branches are:", options: ["Military, Economic, Social", "Legislative, Executive, Judicial", "Federal, State, Local", "Democratic, Republican, Independent"], answer: 1 },
      { q: "Which branch makes laws?", options: ["Executive", "Judicial", "Legislative", "Administrative"], answer: 2 },
      { q: "The Bill of Rights contains the first ___ amendments.", options: ["5", "10", "15", "20"], answer: 1 },
      { q: "Checks and balances ensure:", options: ["One branch has all power", "Each branch limits the others", "The president rules alone", "States have no power"], answer: 1 }
    ]
  },
  { cat: "American History", title: "The Civil War", content: "<p>The <b>Civil War</b> (1861–1865) was fought between the <b>Union</b> (North) and the <b>Confederacy</b> (South).</p><p><strong>Causes:</strong></p><ul><li><b>Slavery:</b> The central issue — South's economy depended on it</li><li><b>States' rights:</b> Southern states claimed the right to decide on slavery</li><li><b>Sectionalism:</b> Industrial North vs. agricultural South</li><li>Election of Abraham Lincoln (1860) — South feared he'd end slavery</li></ul><p><strong>Key events:</strong></p><ul><li><b>Emancipation Proclamation (1863):</b> Freed slaves in Confederate states</li><li><b>Gettysburg (1863):</b> Turning point battle</li><li>Lee surrendered at <b>Appomattox (1865)</b></li></ul><p>~620,000 soldiers died — the deadliest American war.</p>",
    quiz: [
      { q: "The central cause of the Civil War was:", options: ["Taxes", "Trade", "Slavery", "Religion"], answer: 2 },
      { q: "The Emancipation Proclamation was issued by:", options: ["Jefferson Davis", "Robert E. Lee", "Abraham Lincoln", "Ulysses S. Grant"], answer: 2 },
      { q: "The turning point battle was:", options: ["Bull Run", "Antietam", "Gettysburg", "Fort Sumter"], answer: 2 },
      { q: "The war ended at:", options: ["Gettysburg", "Washington", "Appomattox", "Richmond"], answer: 2 }
    ]
  },
  { cat: "American History", title: "Civil Rights Movement", content: "<p>The <b>Civil Rights Movement</b> (1950s–1960s) fought to end racial segregation and discrimination against African Americans.</p><p><strong>Key events and figures:</strong></p><ul><li><b>Brown v. Board of Education (1954):</b> Supreme Court ruled school segregation unconstitutional</li><li><b>Rosa Parks (1955):</b> Refused to give up her bus seat → Montgomery Bus Boycott</li><li><b>Martin Luther King Jr.:</b> Leader of nonviolent protest. 'I Have a Dream' speech (1963)</li><li><b>March on Washington (1963):</b> 250,000+ people demanded civil rights legislation</li><li><b>Civil Rights Act (1964):</b> Banned discrimination based on race, color, religion, sex, national origin</li><li><b>Voting Rights Act (1965):</b> Protected the right to vote</li></ul>",
    quiz: [
      { q: "Brown v. Board of Education ruled against:", options: ["Voting restrictions", "School segregation", "Housing discrimination", "Employment bias"], answer: 1 },
      { q: "MLK promoted:", options: ["Violent revolution", "Separation", "Nonviolent protest", "Armed resistance"], answer: 2 },
      { q: "The Civil Rights Act was passed in:", options: ["1954", "1960", "1964", "1968"], answer: 2 },
      { q: "Rosa Parks' action led to the:", options: ["March on Washington", "Montgomery Bus Boycott", "Selma March", "Sit-in movement"], answer: 1 }
    ]
  },
  // ---- Modern History ----
  { cat: "Modern History", title: "World War I", content: "<p><b>World War I</b> (1914–1918) was a global conflict primarily fought in Europe.</p><p><strong>Causes (MAIN):</strong></p><ul><li><b>M</b>ilitarism: Arms buildup</li><li><b>A</b>lliances: Complex web of treaties</li><li><b>I</b>mperialism: Competition for colonies</li><li><b>N</b>ationalism: Intense national pride</li></ul><p><b>Spark:</b> Assassination of Archduke Franz Ferdinand of Austria-Hungary (1914).</p><p><b>Allied Powers:</b> France, Britain, Russia, Italy, US (1917). <b>Central Powers:</b> Germany, Austria-Hungary, Ottoman Empire.</p><p><b>New technology:</b> Machine guns, poison gas, tanks, trench warfare, airplanes.</p><p>Ended with <b>Treaty of Versailles (1919)</b> — harsh terms on Germany, setting the stage for WWII.</p>",
    quiz: [
      { q: "WWI was sparked by the assassination of:", options: ["Kaiser Wilhelm", "Archduke Franz Ferdinand", "Tsar Nicholas", "King George"], answer: 1 },
      { q: "MAIN stands for:", options: ["Money, Arms, Industry, Navy", "Militarism, Alliances, Imperialism, Nationalism", "Maps, Artillery, Infantry, Navies", "Monarchy, Aristocracy, Industry, Navy"], answer: 1 },
      { q: "The US entered WWI in:", options: ["1914", "1915", "1917", "1918"], answer: 2 },
      { q: "The Treaty of Versailles placed harsh terms on:", options: ["France", "Britain", "Russia", "Germany"], answer: 3 }
    ]
  },
  { cat: "Modern History", title: "World War II", content: "<p><b>World War II</b> (1939–1945) was the deadliest conflict in human history (~70–85 million deaths).</p><p><strong>Causes:</strong> Rise of fascism (Hitler, Mussolini), Treaty of Versailles resentment, Japanese expansion, failure of appeasement.</p><p><b>Axis Powers:</b> Germany, Italy, Japan. <b>Allied Powers:</b> US, Britain, Soviet Union, France, China.</p><p><strong>Key events:</strong></p><ul><li><b>Pearl Harbor (Dec 7, 1941):</b> Japan attacks → US enters war</li><li><b>D-Day (June 6, 1944):</b> Allied invasion of Normandy</li><li><b>Holocaust:</b> Nazi genocide of 6 million Jews and millions of others</li><li><b>Atomic bombs:</b> Hiroshima and Nagasaki (Aug 1945) → Japan surrenders</li></ul><p>Led to the <b>United Nations</b>, the Cold War, and decolonization movements.</p>",
    quiz: [
      { q: "WWII began in:", options: ["1935", "1939", "1941", "1945"], answer: 1 },
      { q: "The US entered WWII after:", options: ["D-Day", "Pearl Harbor", "The Holocaust", "V-E Day"], answer: 1 },
      { q: "D-Day occurred on:", options: ["Dec 7, 1941", "June 6, 1944", "Aug 6, 1945", "May 8, 1945"], answer: 1 },
      { q: "The Axis Powers included:", options: ["US, Britain, France", "Germany, Italy, Japan", "Soviet Union, China, India", "Canada, Australia, Brazil"], answer: 1 }
    ]
  },
  { cat: "Modern History", title: "The Cold War", content: "<p>The <b>Cold War</b> (1947–1991) was a geopolitical tension between the <b>US (capitalism/democracy)</b> and <b>Soviet Union (communism)</b>.</p><p>It was 'cold' because the two superpowers never fought each other directly.</p><p><strong>Key events:</strong></p><ul><li><b>Berlin Wall (1961–1989):</b> Divided East and West Berlin</li><li><b>Cuban Missile Crisis (1962):</b> Closest the world came to nuclear war</li><li><b>Space Race:</b> Sputnik (1957) → Moon landing (1969)</li><li><b>Korean and Vietnam Wars:</b> Proxy wars between communist and capitalist sides</li><li><b>Arms Race:</b> Nuclear weapons buildup (MAD — Mutually Assured Destruction)</li></ul><p>The Cold War ended with the <b>fall of the Berlin Wall (1989)</b> and the <b>dissolution of the Soviet Union (1991)</b>.</p>",
    quiz: [
      { q: "The Cold War was between:", options: ["US and China", "US and Soviet Union", "Britain and Germany", "France and Russia"], answer: 1 },
      { q: "The Cuban Missile Crisis was in:", options: ["1957", "1962", "1969", "1989"], answer: 1 },
      { q: "The Berlin Wall fell in:", options: ["1961", "1975", "1989", "1991"], answer: 2 },
      { q: "MAD stands for:", options: ["Military Arms Defense", "Mutually Assured Destruction", "Maximum Atomic Defense", "Military Action Directive"], answer: 1 }
    ]
  }
];

// Assembled catalog — subjects are added here as they are created
var LESSON_CATALOG = [
  { id: "math", name: "Mathematics", icon: "\u2211", lessons: MATH_LESSONS },
  { id: "ela", name: "English / ELA", icon: "\u270E", lessons: ELA_LESSONS },
  { id: "physics", name: "Physics", icon: "\u2699", lessons: PHYSICS_LESSONS },
  { id: "chemistry", name: "Chemistry", icon: "\u2697", lessons: CHEMISTRY_LESSONS },
  { id: "biology", name: "Biology", icon: "\u2618", lessons: BIOLOGY_LESSONS },
  { id: "history", name: "History", icon: "\u2690", lessons: HISTORY_LESSONS }
];
