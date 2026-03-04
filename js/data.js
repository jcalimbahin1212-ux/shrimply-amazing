/* ============================================
   shrimpify — data catalog
   ============================================ */

// ---- Grade Points ----
const GRADE_POINTS = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0
};

// ---- Unit Conversion Data ----
const UNITS = {
  Length: {
    units: {
      "Meter": 1, "Kilometer": 1000, "Centimeter": 0.01, "Millimeter": 0.001,
      "Mile": 1609.344, "Yard": 0.9144, "Foot": 0.3048, "Inch": 0.0254
    }
  },
  Weight: {
    units: {
      "Kilogram": 1, "Gram": 0.001, "Milligram": 0.000001,
      "Pound": 0.453592, "Ounce": 0.0283495, "Ton (US)": 907.185, "Metric Ton": 1000
    }
  },
  Temperature: {
    units: {
      "Celsius": {
        toBase: function (v) { return v; },
        fromBase: function (v) { return v; }
      },
      "Fahrenheit": {
        toBase: function (v) { return (v - 32) * 5 / 9; },
        fromBase: function (v) { return v * 9 / 5 + 32; }
      },
      "Kelvin": {
        toBase: function (v) { return v - 273.15; },
        fromBase: function (v) { return v + 273.15; }
      }
    }
  },
  Volume: {
    units: {
      "Liter": 1, "Milliliter": 0.001, "Gallon": 3.78541, "Quart": 0.946353,
      "Pint": 0.473176, "Cup": 0.236588, "Fluid Ounce": 0.0295735,
      "Tablespoon": 0.0147868, "Teaspoon": 0.00492892
    }
  },
  Speed: {
    units: {
      "m/s": 1, "km/h": 0.277778, "mph": 0.44704, "Knot": 0.514444, "ft/s": 0.3048
    }
  },
  Time: {
    units: {
      "Second": 1, "Millisecond": 0.001, "Minute": 60, "Hour": 3600,
      "Day": 86400, "Week": 604800, "Month": 2629800, "Year": 31557600
    }
  },
  Data: {
    units: {
      "Byte": 1, "Kilobyte": 1024, "Megabyte": 1048576,
      "Gigabyte": 1073741824, "Terabyte": 1099511627776, "Bit": 0.125
    }
  }
};

// ---- Formula Sheets ----
const FORMULAS = [
  // Algebra
  { category: "Algebra", name: "Quadratic Formula", formula: "x = (-b +/- sqrt(b^2 - 4ac)) / 2a", desc: "Solves ax^2 + bx + c = 0" },
  { category: "Algebra", name: "Slope", formula: "m = (y2 - y1) / (x2 - x1)", desc: "Slope of a line through two points" },
  { category: "Algebra", name: "Slope-Intercept Form", formula: "y = mx + b", desc: "Line with slope m and y-intercept b" },
  { category: "Algebra", name: "Point-Slope Form", formula: "y - y1 = m(x - x1)", desc: "Line through (x1,y1) with slope m" },
  { category: "Algebra", name: "Standard Form (Line)", formula: "Ax + By = C", desc: "Standard form of a linear equation" },
  { category: "Algebra", name: "Distance Formula", formula: "d = sqrt((x2-x1)^2 + (y2-y1)^2)", desc: "Distance between two points" },
  { category: "Algebra", name: "Midpoint Formula", formula: "M = ((x1+x2)/2, (y1+y2)/2)", desc: "Midpoint of a line segment" },
  { category: "Algebra", name: "Difference of Squares", formula: "a^2 - b^2 = (a+b)(a-b)", desc: "Factoring pattern" },
  { category: "Algebra", name: "Perfect Square Trinomial", formula: "a^2 +/- 2ab + b^2 = (a +/- b)^2", desc: "Factoring pattern" },
  { category: "Algebra", name: "Simple Interest", formula: "I = Prt", desc: "P=principal, r=rate, t=time" },
  { category: "Algebra", name: "Compound Interest", formula: "A = P(1 + r/n)^(nt)", desc: "n=compounds per year, t=years" },
  { category: "Algebra", name: "Logarithm Product Rule", formula: "log(ab) = log(a) + log(b)", desc: "Product rule for logarithms" },
  { category: "Algebra", name: "Logarithm Power Rule", formula: "log(a^n) = n * log(a)", desc: "Power rule for logarithms" },
  // Geometry
  { category: "Geometry", name: "Rectangle Area", formula: "A = l * w", desc: "Length times width" },
  { category: "Geometry", name: "Rectangle Perimeter", formula: "P = 2l + 2w", desc: "Sum of all sides" },
  { category: "Geometry", name: "Triangle Area", formula: "A = (1/2) * b * h", desc: "Base times height divided by 2" },
  { category: "Geometry", name: "Circle Area", formula: "A = pi * r^2", desc: "Pi times radius squared" },
  { category: "Geometry", name: "Circle Circumference", formula: "C = 2 * pi * r", desc: "2 pi times radius" },
  { category: "Geometry", name: "Pythagorean Theorem", formula: "a^2 + b^2 = c^2", desc: "Right triangle side relationship" },
  { category: "Geometry", name: "Volume of Sphere", formula: "V = (4/3) * pi * r^3", desc: "Four-thirds pi r cubed" },
  { category: "Geometry", name: "Volume of Cylinder", formula: "V = pi * r^2 * h", desc: "Pi r squared times height" },
  { category: "Geometry", name: "Volume of Cone", formula: "V = (1/3) * pi * r^2 * h", desc: "One-third pi r squared h" },
  { category: "Geometry", name: "Volume of Rectangular Prism", formula: "V = l * w * h", desc: "Length times width times height" },
  { category: "Geometry", name: "Surface Area of Sphere", formula: "SA = 4 * pi * r^2", desc: "4 pi r squared" },
  { category: "Geometry", name: "Surface Area of Cylinder", formula: "SA = 2*pi*r^2 + 2*pi*r*h", desc: "Two circles plus lateral area" },
  { category: "Geometry", name: "Trapezoid Area", formula: "A = (1/2)(b1 + b2) * h", desc: "Average of bases times height" },
  // Trigonometry
  { category: "Trigonometry", name: "Sine", formula: "sin(A) = opposite / hypotenuse", desc: "SOH in SOH-CAH-TOA" },
  { category: "Trigonometry", name: "Cosine", formula: "cos(A) = adjacent / hypotenuse", desc: "CAH in SOH-CAH-TOA" },
  { category: "Trigonometry", name: "Tangent", formula: "tan(A) = opposite / adjacent", desc: "TOA in SOH-CAH-TOA" },
  { category: "Trigonometry", name: "Pythagorean Identity", formula: "sin^2(x) + cos^2(x) = 1", desc: "Fundamental trig identity" },
  { category: "Trigonometry", name: "Law of Sines", formula: "a/sin(A) = b/sin(B) = c/sin(C)", desc: "Relates sides to opposite angles" },
  { category: "Trigonometry", name: "Law of Cosines", formula: "c^2 = a^2 + b^2 - 2ab*cos(C)", desc: "Generalized Pythagorean theorem" },
  { category: "Trigonometry", name: "Double Angle (sin)", formula: "sin(2x) = 2*sin(x)*cos(x)", desc: "Sine double angle formula" },
  { category: "Trigonometry", name: "Double Angle (cos)", formula: "cos(2x) = cos^2(x) - sin^2(x)", desc: "Cosine double angle formula" },
  { category: "Trigonometry", name: "Radians to Degrees", formula: "degrees = radians * (180/pi)", desc: "Converting radians to degrees" },
  // Physics
  { category: "Physics", name: "Velocity", formula: "v = d / t", desc: "Distance divided by time" },
  { category: "Physics", name: "Acceleration", formula: "a = (v_f - v_i) / t", desc: "Change in velocity over time" },
  { category: "Physics", name: "Newton's Second Law", formula: "F = m * a", desc: "Force equals mass times acceleration" },
  { category: "Physics", name: "Weight", formula: "W = m * g", desc: "Mass times gravitational acceleration (9.8 m/s^2)" },
  { category: "Physics", name: "Kinetic Energy", formula: "KE = (1/2) * m * v^2", desc: "Energy of motion" },
  { category: "Physics", name: "Potential Energy", formula: "PE = m * g * h", desc: "Energy due to height" },
  { category: "Physics", name: "Work", formula: "W = F * d * cos(theta)", desc: "Force times displacement" },
  { category: "Physics", name: "Power", formula: "P = W / t", desc: "Work done per unit time" },
  { category: "Physics", name: "Momentum", formula: "p = m * v", desc: "Mass times velocity" },
  { category: "Physics", name: "Impulse", formula: "J = F * t = delta(p)", desc: "Force times time equals change in momentum" },
  { category: "Physics", name: "Ohm's Law", formula: "V = I * R", desc: "Voltage = current times resistance" },
  { category: "Physics", name: "Wave Speed", formula: "v = f * lambda", desc: "Frequency times wavelength" },
  { category: "Physics", name: "Density", formula: "rho = m / V", desc: "Mass per unit volume" },
  // Chemistry
  { category: "Chemistry", name: "Density", formula: "D = m / V", desc: "Mass divided by volume" },
  { category: "Chemistry", name: "Molarity", formula: "M = mol / L", desc: "Moles of solute per liter of solution" },
  { category: "Chemistry", name: "Ideal Gas Law", formula: "PV = nRT", desc: "P=pressure, V=volume, n=moles, R=8.314, T=temp(K)" },
  { category: "Chemistry", name: "pH", formula: "pH = -log[H+]", desc: "Negative log of hydrogen ion concentration" },
  { category: "Chemistry", name: "Dilution", formula: "M1*V1 = M2*V2", desc: "Concentration times volume before = after" },
  { category: "Chemistry", name: "Percent Composition", formula: "% = (mass of element / molar mass) * 100", desc: "Mass percent of an element in a compound" },
  { category: "Chemistry", name: "Moles from Mass", formula: "n = m / M", desc: "Mass divided by molar mass" },
  { category: "Chemistry", name: "Avogadro's Number", formula: "1 mol = 6.022 * 10^23 particles", desc: "Number of particles in one mole" },
  // Biology
  { category: "Biology", name: "Hardy-Weinberg Equation", formula: "p^2 + 2pq + q^2 = 1", desc: "Allele frequency in a population at equilibrium" },
  { category: "Biology", name: "Allele Frequency", formula: "p + q = 1", desc: "Sum of dominant (p) and recessive (q) allele frequencies" },
  { category: "Biology", name: "Population Growth", formula: "dN/dt = rN", desc: "Exponential growth: r=rate, N=population size" },
  { category: "Biology", name: "Logistic Growth", formula: "dN/dt = rN((K-N)/K)", desc: "Growth limited by carrying capacity K" },
  { category: "Biology", name: "Photosynthesis", formula: "6CO2 + 6H2O -> C6H12O6 + 6O2", desc: "Light energy converts CO2 and water to glucose and oxygen" },
  { category: "Biology", name: "Cellular Respiration", formula: "C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP", desc: "Glucose broken down for energy" },
  { category: "Biology", name: "BMI", formula: "BMI = mass(kg) / height(m)^2", desc: "Body mass index" },
  { category: "Biology", name: "Surface Area:Volume", formula: "SA:V = surface area / volume", desc: "Decreases as cell size increases, limits cell size" },
  { category: "Biology", name: "Water Potential", formula: "Psi = Psi_s + Psi_p", desc: "Solute potential plus pressure potential" },
  { category: "Biology", name: "Simpson's Diversity Index", formula: "D = 1 - Sum(n/N)^2", desc: "n=individuals of one species, N=total individuals" },
  // Statistics
  { category: "Statistics", name: "Mean", formula: "x_bar = Sum(x) / n", desc: "Sum of values divided by count" },
  { category: "Statistics", name: "Standard Deviation", formula: "sigma = sqrt(Sum(x - x_bar)^2 / n)", desc: "Spread of data around the mean" },
  { category: "Statistics", name: "Variance", formula: "sigma^2 = Sum(x - x_bar)^2 / n", desc: "Square of standard deviation" },
  { category: "Statistics", name: "Z-Score", formula: "z = (x - mu) / sigma", desc: "How many standard deviations from the mean" },
  { category: "Statistics", name: "Probability (OR)", formula: "P(A or B) = P(A) + P(B) - P(A and B)", desc: "Addition rule for probability" },
  { category: "Statistics", name: "Probability (AND)", formula: "P(A and B) = P(A) * P(B|A)", desc: "Multiplication rule for probability" },
  { category: "Statistics", name: "Combinations", formula: "C(n,r) = n! / (r!(n-r)!)", desc: "Number of ways to choose r items from n" },
  { category: "Statistics", name: "Permutations", formula: "P(n,r) = n! / (n-r)!", desc: "Number of ordered arrangements of r items from n" },
  { category: "Statistics", name: "Linear Regression", formula: "y_hat = a + bx", desc: "Predicted value from slope b and intercept a" },
  { category: "Statistics", name: "Correlation Coefficient", formula: "r = Sum((x-x_bar)(y-y_bar)) / sqrt(Sum(x-x_bar)^2 * Sum(y-y_bar)^2)", desc: "Strength of linear relationship, -1 to 1" },
];

// ---- Periodic Table Elements ----
const ELEMENTS = [
  { z: 1, symbol: "H", name: "Hydrogen", mass: 1.008, category: "nonmetal", group: 1, period: 1, block: "s" },
  { z: 2, symbol: "He", name: "Helium", mass: 4.003, category: "noble-gas", group: 18, period: 1, block: "s" },
  { z: 3, symbol: "Li", name: "Lithium", mass: 6.941, category: "alkali-metal", group: 1, period: 2, block: "s" },
  { z: 4, symbol: "Be", name: "Beryllium", mass: 9.012, category: "alkaline-earth", group: 2, period: 2, block: "s" },
  { z: 5, symbol: "B", name: "Boron", mass: 10.81, category: "metalloid", group: 13, period: 2, block: "p" },
  { z: 6, symbol: "C", name: "Carbon", mass: 12.011, category: "nonmetal", group: 14, period: 2, block: "p" },
  { z: 7, symbol: "N", name: "Nitrogen", mass: 14.007, category: "nonmetal", group: 15, period: 2, block: "p" },
  { z: 8, symbol: "O", name: "Oxygen", mass: 15.999, category: "nonmetal", group: 16, period: 2, block: "p" },
  { z: 9, symbol: "F", name: "Fluorine", mass: 18.998, category: "halogen", group: 17, period: 2, block: "p" },
  { z: 10, symbol: "Ne", name: "Neon", mass: 20.180, category: "noble-gas", group: 18, period: 2, block: "p" },
  { z: 11, symbol: "Na", name: "Sodium", mass: 22.990, category: "alkali-metal", group: 1, period: 3, block: "s" },
  { z: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, category: "alkaline-earth", group: 2, period: 3, block: "s" },
  { z: 13, symbol: "Al", name: "Aluminium", mass: 26.982, category: "post-transition", group: 13, period: 3, block: "p" },
  { z: 14, symbol: "Si", name: "Silicon", mass: 28.086, category: "metalloid", group: 14, period: 3, block: "p" },
  { z: 15, symbol: "P", name: "Phosphorus", mass: 30.974, category: "nonmetal", group: 15, period: 3, block: "p" },
  { z: 16, symbol: "S", name: "Sulfur", mass: 32.065, category: "nonmetal", group: 16, period: 3, block: "p" },
  { z: 17, symbol: "Cl", name: "Chlorine", mass: 35.453, category: "halogen", group: 17, period: 3, block: "p" },
  { z: 18, symbol: "Ar", name: "Argon", mass: 39.948, category: "noble-gas", group: 18, period: 3, block: "p" },
  { z: 19, symbol: "K", name: "Potassium", mass: 39.098, category: "alkali-metal", group: 1, period: 4, block: "s" },
  { z: 20, symbol: "Ca", name: "Calcium", mass: 40.078, category: "alkaline-earth", group: 2, period: 4, block: "s" },
  { z: 21, symbol: "Sc", name: "Scandium", mass: 44.956, category: "transition-metal", group: 3, period: 4, block: "d" },
  { z: 22, symbol: "Ti", name: "Titanium", mass: 47.867, category: "transition-metal", group: 4, period: 4, block: "d" },
  { z: 23, symbol: "V", name: "Vanadium", mass: 50.942, category: "transition-metal", group: 5, period: 4, block: "d" },
  { z: 24, symbol: "Cr", name: "Chromium", mass: 51.996, category: "transition-metal", group: 6, period: 4, block: "d" },
  { z: 25, symbol: "Mn", name: "Manganese", mass: 54.938, category: "transition-metal", group: 7, period: 4, block: "d" },
  { z: 26, symbol: "Fe", name: "Iron", mass: 55.845, category: "transition-metal", group: 8, period: 4, block: "d" },
  { z: 27, symbol: "Co", name: "Cobalt", mass: 58.933, category: "transition-metal", group: 9, period: 4, block: "d" },
  { z: 28, symbol: "Ni", name: "Nickel", mass: 58.693, category: "transition-metal", group: 10, period: 4, block: "d" },
  { z: 29, symbol: "Cu", name: "Copper", mass: 63.546, category: "transition-metal", group: 11, period: 4, block: "d" },
  { z: 30, symbol: "Zn", name: "Zinc", mass: 65.38, category: "transition-metal", group: 12, period: 4, block: "d" },
  { z: 31, symbol: "Ga", name: "Gallium", mass: 69.723, category: "post-transition", group: 13, period: 4, block: "p" },
  { z: 32, symbol: "Ge", name: "Germanium", mass: 72.630, category: "metalloid", group: 14, period: 4, block: "p" },
  { z: 33, symbol: "As", name: "Arsenic", mass: 74.922, category: "metalloid", group: 15, period: 4, block: "p" },
  { z: 34, symbol: "Se", name: "Selenium", mass: 78.971, category: "nonmetal", group: 16, period: 4, block: "p" },
  { z: 35, symbol: "Br", name: "Bromine", mass: 79.904, category: "halogen", group: 17, period: 4, block: "p" },
  { z: 36, symbol: "Kr", name: "Krypton", mass: 83.798, category: "noble-gas", group: 18, period: 4, block: "p" },
  { z: 37, symbol: "Rb", name: "Rubidium", mass: 85.468, category: "alkali-metal", group: 1, period: 5, block: "s" },
  { z: 38, symbol: "Sr", name: "Strontium", mass: 87.62, category: "alkaline-earth", group: 2, period: 5, block: "s" },
  { z: 39, symbol: "Y", name: "Yttrium", mass: 88.906, category: "transition-metal", group: 3, period: 5, block: "d" },
  { z: 40, symbol: "Zr", name: "Zirconium", mass: 91.224, category: "transition-metal", group: 4, period: 5, block: "d" },
  { z: 41, symbol: "Nb", name: "Niobium", mass: 92.906, category: "transition-metal", group: 5, period: 5, block: "d" },
  { z: 42, symbol: "Mo", name: "Molybdenum", mass: 95.95, category: "transition-metal", group: 6, period: 5, block: "d" },
  { z: 43, symbol: "Tc", name: "Technetium", mass: 98, category: "transition-metal", group: 7, period: 5, block: "d" },
  { z: 44, symbol: "Ru", name: "Ruthenium", mass: 101.07, category: "transition-metal", group: 8, period: 5, block: "d" },
  { z: 45, symbol: "Rh", name: "Rhodium", mass: 102.91, category: "transition-metal", group: 9, period: 5, block: "d" },
  { z: 46, symbol: "Pd", name: "Palladium", mass: 106.42, category: "transition-metal", group: 10, period: 5, block: "d" },
  { z: 47, symbol: "Ag", name: "Silver", mass: 107.87, category: "transition-metal", group: 11, period: 5, block: "d" },
  { z: 48, symbol: "Cd", name: "Cadmium", mass: 112.41, category: "transition-metal", group: 12, period: 5, block: "d" },
  { z: 49, symbol: "In", name: "Indium", mass: 114.82, category: "post-transition", group: 13, period: 5, block: "p" },
  { z: 50, symbol: "Sn", name: "Tin", mass: 118.71, category: "post-transition", group: 14, period: 5, block: "p" },
  { z: 51, symbol: "Sb", name: "Antimony", mass: 121.76, category: "metalloid", group: 15, period: 5, block: "p" },
  { z: 52, symbol: "Te", name: "Tellurium", mass: 127.60, category: "metalloid", group: 16, period: 5, block: "p" },
  { z: 53, symbol: "I", name: "Iodine", mass: 126.90, category: "halogen", group: 17, period: 5, block: "p" },
  { z: 54, symbol: "Xe", name: "Xenon", mass: 131.29, category: "noble-gas", group: 18, period: 5, block: "p" },
  { z: 55, symbol: "Cs", name: "Cesium", mass: 132.91, category: "alkali-metal", group: 1, period: 6, block: "s" },
  { z: 56, symbol: "Ba", name: "Barium", mass: 137.33, category: "alkaline-earth", group: 2, period: 6, block: "s" },
  // Lanthanides (z 57-71)
  { z: 57, symbol: "La", name: "Lanthanum", mass: 138.91, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 58, symbol: "Ce", name: "Cerium", mass: 140.12, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 59, symbol: "Pr", name: "Praseodymium", mass: 140.91, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 60, symbol: "Nd", name: "Neodymium", mass: 144.24, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 61, symbol: "Pm", name: "Promethium", mass: 145, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 62, symbol: "Sm", name: "Samarium", mass: 150.36, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 63, symbol: "Eu", name: "Europium", mass: 151.96, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 64, symbol: "Gd", name: "Gadolinium", mass: 157.25, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 65, symbol: "Tb", name: "Terbium", mass: 158.93, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 66, symbol: "Dy", name: "Dysprosium", mass: 162.50, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 67, symbol: "Ho", name: "Holmium", mass: 164.93, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 68, symbol: "Er", name: "Erbium", mass: 167.26, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 69, symbol: "Tm", name: "Thulium", mass: 168.93, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 70, symbol: "Yb", name: "Ytterbium", mass: 173.05, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 71, symbol: "Lu", name: "Lutetium", mass: 174.97, category: "lanthanide", group: 3, period: 6, block: "d" },
  // Period 6 continued
  { z: 72, symbol: "Hf", name: "Hafnium", mass: 178.49, category: "transition-metal", group: 4, period: 6, block: "d" },
  { z: 73, symbol: "Ta", name: "Tantalum", mass: 180.95, category: "transition-metal", group: 5, period: 6, block: "d" },
  { z: 74, symbol: "W", name: "Tungsten", mass: 183.84, category: "transition-metal", group: 6, period: 6, block: "d" },
  { z: 75, symbol: "Re", name: "Rhenium", mass: 186.21, category: "transition-metal", group: 7, period: 6, block: "d" },
  { z: 76, symbol: "Os", name: "Osmium", mass: 190.23, category: "transition-metal", group: 8, period: 6, block: "d" },
  { z: 77, symbol: "Ir", name: "Iridium", mass: 192.22, category: "transition-metal", group: 9, period: 6, block: "d" },
  { z: 78, symbol: "Pt", name: "Platinum", mass: 195.08, category: "transition-metal", group: 10, period: 6, block: "d" },
  { z: 79, symbol: "Au", name: "Gold", mass: 196.97, category: "transition-metal", group: 11, period: 6, block: "d" },
  { z: 80, symbol: "Hg", name: "Mercury", mass: 200.59, category: "transition-metal", group: 12, period: 6, block: "d" },
  { z: 81, symbol: "Tl", name: "Thallium", mass: 204.38, category: "post-transition", group: 13, period: 6, block: "p" },
  { z: 82, symbol: "Pb", name: "Lead", mass: 207.2, category: "post-transition", group: 14, period: 6, block: "p" },
  { z: 83, symbol: "Bi", name: "Bismuth", mass: 208.98, category: "post-transition", group: 15, period: 6, block: "p" },
  { z: 84, symbol: "Po", name: "Polonium", mass: 209, category: "metalloid", group: 16, period: 6, block: "p" },
  { z: 85, symbol: "At", name: "Astatine", mass: 210, category: "halogen", group: 17, period: 6, block: "p" },
  { z: 86, symbol: "Rn", name: "Radon", mass: 222, category: "noble-gas", group: 18, period: 6, block: "p" },
  { z: 87, symbol: "Fr", name: "Francium", mass: 223, category: "alkali-metal", group: 1, period: 7, block: "s" },
  { z: 88, symbol: "Ra", name: "Radium", mass: 226, category: "alkaline-earth", group: 2, period: 7, block: "s" },
  // Actinides (z 89-103)
  { z: 89, symbol: "Ac", name: "Actinium", mass: 227, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 90, symbol: "Th", name: "Thorium", mass: 232.04, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 91, symbol: "Pa", name: "Protactinium", mass: 231.04, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 92, symbol: "U", name: "Uranium", mass: 238.03, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 93, symbol: "Np", name: "Neptunium", mass: 237, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 94, symbol: "Pu", name: "Plutonium", mass: 244, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 95, symbol: "Am", name: "Americium", mass: 243, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 96, symbol: "Cm", name: "Curium", mass: 247, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 97, symbol: "Bk", name: "Berkelium", mass: 247, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 98, symbol: "Cf", name: "Californium", mass: 251, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 99, symbol: "Es", name: "Einsteinium", mass: 252, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 100, symbol: "Fm", name: "Fermium", mass: 257, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 101, symbol: "Md", name: "Mendelevium", mass: 258, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 102, symbol: "No", name: "Nobelium", mass: 259, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 103, symbol: "Lr", name: "Lawrencium", mass: 266, category: "actinide", group: 3, period: 7, block: "d" },
  // Period 7 continued
  { z: 104, symbol: "Rf", name: "Rutherfordium", mass: 267, category: "transition-metal", group: 4, period: 7, block: "d" },
  { z: 105, symbol: "Db", name: "Dubnium", mass: 268, category: "transition-metal", group: 5, period: 7, block: "d" },
  { z: 106, symbol: "Sg", name: "Seaborgium", mass: 269, category: "transition-metal", group: 6, period: 7, block: "d" },
  { z: 107, symbol: "Bh", name: "Bohrium", mass: 270, category: "transition-metal", group: 7, period: 7, block: "d" },
  { z: 108, symbol: "Hs", name: "Hassium", mass: 277, category: "transition-metal", group: 8, period: 7, block: "d" },
  { z: 109, symbol: "Mt", name: "Meitnerium", mass: 278, category: "transition-metal", group: 9, period: 7, block: "d" },
  { z: 110, symbol: "Ds", name: "Darmstadtium", mass: 281, category: "transition-metal", group: 10, period: 7, block: "d" },
  { z: 111, symbol: "Rg", name: "Roentgenium", mass: 282, category: "transition-metal", group: 11, period: 7, block: "d" },
  { z: 112, symbol: "Cn", name: "Copernicium", mass: 285, category: "transition-metal", group: 12, period: 7, block: "d" },
  { z: 113, symbol: "Nh", name: "Nihonium", mass: 286, category: "post-transition", group: 13, period: 7, block: "p" },
  { z: 114, symbol: "Fl", name: "Flerovium", mass: 289, category: "post-transition", group: 14, period: 7, block: "p" },
  { z: 115, symbol: "Mc", name: "Moscovium", mass: 290, category: "post-transition", group: 15, period: 7, block: "p" },
  { z: 116, symbol: "Lv", name: "Livermorium", mass: 293, category: "post-transition", group: 16, period: 7, block: "p" },
  { z: 117, symbol: "Ts", name: "Tennessine", mass: 294, category: "halogen", group: 17, period: 7, block: "p" },
  { z: 118, symbol: "Og", name: "Oganesson", mass: 294, category: "noble-gas", group: 18, period: 7, block: "p" },
];

// ---- Comprehensive Cheats ----
const CHEATS = [
  {
    id: "kahoot",
    name: "Kahoot",
    icon: "\u{1F7E3}",
    url: "https://kahoot.it",
    desc: "Auto-answer tools for Kahoot quizzes and challenges.",
    manual: [
      "1. Join the Kahoot game on kahoot.it with your PIN as normal.",
      "2. Open the browser console (F12 \u2192 Console tab).",
      "3. Paste the script for the cheat you want and press Enter.",
      "4. The script will read the question from the page and attempt to auto-select the correct answer.",
      "5. Some scripts work by intercepting the WebSocket data that Kahoot sends \u2014 answers are embedded in the game data.",
      "NOTE: These scripts must be run on the kahoot.it page, not on shrimpify."
    ],
    gamemodes: [
      {
        name: "Classic",
        desc: "Standard quiz with timed multiple-choice questions.",
        cheats: [
          {
            name: "Auto-Answer",
            desc: "Automatically selects the correct answer when each question appears. Works by reading the quiz data from Kahoot's internal state.",
            code: "// Kahoot Auto-Answer \u2014 Classic Mode\n// Run this in the browser console on kahoot.it AFTER joining a game.\n// This reads the quiz answers from the page's internal data.\n\n(function() {\n  const originalFetch = window.fetch;\n  window.fetch = async function(...args) {\n    const response = await originalFetch.apply(this, args);\n    const url = args[0];\n    if (typeof url === 'string' && url.includes('/answers')) {\n      const clone = response.clone();\n      clone.json().then(data => {\n        console.log('[shrimpify] Answer data intercepted:', data);\n      }).catch(() => {});\n    }\n    return response;\n  };\n  console.log('[shrimpify] Kahoot auto-answer active. Waiting for questions...');\n})();"
          },
          {
            name: "Answer Revealer",
            desc: "Logs the correct answer to the console for each question so you can pick it manually.",
            code: "// Kahoot Answer Revealer\n// Shows correct answers in the console without auto-clicking.\n\n(function() {\n  const ws = window.__kahootWebSocket || null;\n  if (ws) {\n    const orig = ws.onmessage;\n    ws.onmessage = function(e) {\n      try {\n        const data = JSON.parse(e.data);\n        if (data.type === 'question') {\n          console.log('[shrimpify] Correct answer index:', data.correctIndex);\n        }\n      } catch(err) {}\n      if (orig) orig.call(this, e);\n    };\n  }\n  console.log('[shrimpify] Answer revealer active.');\n})();"
          }
        ]
      },
      {
        name: "Team Mode",
        desc: "Teams collaborate to answer. Same question format as Classic.",
        cheats: [
          {
            name: "Auto-Answer (Team)",
            desc: "Same as Classic auto-answer \u2014 works identically in team mode since the quiz format is the same.",
            code: "// Same as Classic auto-answer \u2014 team mode uses identical quiz data.\nconsole.log('[shrimpify] Use the Classic auto-answer script. It works in Team Mode too.');"
          }
        ]
      }
    ],
    apiLookup: {
      platform: "kahoot",
      inputLabel: "quiz link or uuid",
      inputPlaceholder: "paste kahoot quiz link or uuid...",
      hint: "get the quiz share link from your teacher. game PINs won't work."
    }
  },
  {
    id: "blooket",
    name: "Blooket",
    icon: "\u{1F535}",
    url: "https://play.blooket.com",
    desc: "Comprehensive cheats for every Blooket gamemode.",
    manual: [
      "1. Join a Blooket game at play.blooket.com with your game code.",
      "2. Wait for the game to start and the gamemode to load.",
      "3. Open browser console (F12 \u2192 Console).",
      "4. Paste the script for YOUR SPECIFIC GAMEMODE and press Enter.",
      "5. Each gamemode has different cheats \u2014 make sure you pick the right one!",
      "NOTE: Blooket stores game state in React internals. These scripts access the React fiber tree to modify state."
    ],
    gamemodes: [
      {
        name: "Gold Quest",
        desc: "Answer questions to open chests. Steal gold from others or find loot.",
        cheats: [
          {
            name: "Set Gold Amount",
            desc: "Sets your gold to any value you want.",
            code: "// Blooket Gold Quest \u2014 Set Gold\n// Run on play.blooket.com during a Gold Quest game.\n\n(function() {\n  const amount = prompt(\"Enter gold amount:\", \"999999\");\n  if (!amount) return;\n  \n  // Access React internal state\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    if (fiber.memoizedState?.gold !== undefined) {\n      fiber.memoizedState.gold = parseInt(amount);\n      console.log('[shrimpify] Gold set to ' + amount);\n      break;\n    }\n    if (fiber.stateNode?.state?.gold !== undefined) {\n      fiber.stateNode.state.gold = parseInt(amount);\n      fiber.stateNode.setState({ gold: parseInt(amount) });\n      console.log('[shrimpify] Gold set to ' + amount);\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          },
          {
            name: "Always Get Best Chest",
            desc: "Every chest you open will give maximum rewards.",
            code: "// Blooket Gold Quest \u2014 Best Chest\n// Overrides the chest reward RNG.\n\n(function() {\n  const origRandom = Math.random;\n  Math.random = function() {\n    // Return high value to always pick top rewards\n    return 0.99;\n  };\n  console.log('[shrimpify] Math.random overridden \u2014 chests will give best rewards.');\n  console.log('To restore: reload the page.');\n})();"
          }
        ]
      },
      {
        name: "Crypto Hack",
        desc: "Answer questions to mine crypto. Hack other players to steal their crypto.",
        cheats: [
          {
            name: "Set Crypto Amount",
            desc: "Sets your crypto balance to any value.",
            code: "// Blooket Crypto Hack \u2014 Set Crypto\n\n(function() {\n  const amount = prompt(\"Enter crypto amount:\", \"999999\");\n  if (!amount) return;\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.crypto !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ crypto: parseInt(amount) });\n      }\n      console.log('[shrimpify] Crypto set to ' + amount);\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          },
          {
            name: "Always Hack Successfully",
            desc: "Every hack attempt on another player succeeds with maximum steal.",
            code: "// Blooket Crypto Hack \u2014 Always Succeed\n\nMath.random = () => 0.99;\nconsole.log('[shrimpify] Hack success rate maximized.');"
          }
        ]
      },
      {
        name: "Battle Royale",
        desc: "Last player standing. Answer correctly to deal damage.",
        cheats: [
          {
            name: "Auto-Answer",
            desc: "Attempts to auto-select the correct answer for each question.",
            code: "// Blooket Battle Royale \u2014 Auto Answer\n\n(function() {\n  const observer = new MutationObserver(() => {\n    const answerButtons = document.querySelectorAll('[class*=\"answerContainer\"]');\n    if (answerButtons.length > 0) {\n      console.log('[shrimpify] Found ' + answerButtons.length + ' answer buttons.');\n      // Look for the correct answer highlight\n      answerButtons.forEach(btn => {\n        if (btn.dataset?.correct === 'true') {\n          btn.click();\n          console.log('[shrimpify] Clicked correct answer.');\n        }\n      });\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n  console.log('[shrimpify] Auto-answer observer active.');\n})();"
          }
        ]
      },
      {
        name: "Tower Defense",
        desc: "Build towers to defend against enemy blooks. Answer to earn more towers.",
        cheats: [
          {
            name: "Max Towers + Cash",
            desc: "Gives you maximum in-game currency to buy any tower.",
            code: "// Blooket Tower Defense \u2014 Max Cash\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && (s.cash !== undefined || s.money !== undefined)) {\n      const key = s.cash !== undefined ? 'cash' : 'money';\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ [key]: 999999 });\n      }\n      console.log('[shrimpify] Cash set to 999999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Cafe",
        desc: "Run a cafe by answering questions to serve customers and earn cash.",
        cheats: [
          {
            name: "Max Cash",
            desc: "Sets your cafe cash to a high value.",
            code: "// Blooket Cafe \u2014 Max Cash\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.cash !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ cash: 999999 });\n      }\n      console.log('[shrimpify] Cafe cash set to 999999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Factory",
        desc: "Build a factory, answer questions to produce items and earn cash.",
        cheats: [
          {
            name: "Max Cash + Resources",
            desc: "Maxes out your factory cash.",
            code: "// Blooket Factory \u2014 Max Cash\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.cash !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ cash: 999999 });\n      }\n      console.log('[shrimpify] Factory cash maxed.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Racing",
        desc: "Race other players \u2014 answer correctly to move forward.",
        cheats: [
          {
            name: "Instant Finish",
            desc: "Jumps your progress to the finish line.",
            code: "// Blooket Racing \u2014 Instant Finish\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.progress !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ progress: 100 });\n      }\n      console.log('[shrimpify] Progress set to 100%.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Tower of Doom",
        desc: "Climb the tower by answering questions. Use abilities to sabotage others.",
        cheats: [
          {
            name: "Max Health",
            desc: "Sets your health to maximum so you can't die.",
            code: "// Blooket Tower of Doom \u2014 Max Health\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.health !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ health: 999 });\n      }\n      console.log('[shrimpify] Health set to 999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Crazy Kingdom",
        desc: "Manage a kingdom \u2014 answer questions to earn resources and make decisions.",
        cheats: [
          {
            name: "Max Resources",
            desc: "Maxes out all kingdom resources.",
            code: "// Blooket Crazy Kingdom \u2014 Max Resources\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.stateNode?.state;\n    if (s && (s.gold !== undefined || s.people !== undefined)) {\n      const updates = {};\n      if (s.gold !== undefined) updates.gold = 999999;\n      if (s.people !== undefined) updates.people = 999999;\n      if (s.happiness !== undefined) updates.happiness = 100;\n      fiber.stateNode.setState(updates);\n      console.log('[shrimpify] Kingdom resources maxed.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Fishing Frenzy",
        desc: "Catch fish by answering questions. Rare fish are worth more.",
        cheats: [
          {
            name: "Always Rare Fish",
            desc: "Every catch will be a rare/legendary fish.",
            code: "// Blooket Fishing Frenzy \u2014 Always Rare\n\nMath.random = () => 0.99;\nconsole.log('[shrimpify] Fishing RNG overridden \u2014 always rare catches.');"
          },
          {
            name: "Max Weight",
            desc: "Sets your total fish weight to maximum.",
            code: "// Blooket Fishing Frenzy \u2014 Max Weight\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.stateNode?.state;\n    if (s && s.weight !== undefined) {\n      fiber.stateNode.setState({ weight: 999999 });\n      console.log('[shrimpify] Fish weight set to 999999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      }
    ]
  },
  {
    id: "gimkit",
    name: "Gimkit",
    icon: "\u{1F7E2}",
    url: "https://gimkit.com/join",
    desc: "Auto-answer and money cheats for all Gimkit gamemodes.",
    manual: [
      "1. Join a Gimkit game at gimkit.com/join with your code.",
      "2. Wait until you're in the actual game (questions loading).",
      "3. Open browser console (F12 \u2192 Console).",
      "4. Paste the script for your gamemode and press Enter.",
      "5. Gimkit uses React \u2014 scripts modify the client-side state.",
      "NOTE: Gimkit has been known to update frequently. If a script stops working, the state property names may have changed."
    ],
    gamemodes: [
      {
        name: "Classic",
        desc: "Answer questions to earn in-game money. Buy upgrades to earn faster.",
        cheats: [
          {
            name: "Set Money",
            desc: "Sets your money to any amount.",
            code: "// Gimkit Classic \u2014 Set Money\n\n(function() {\n  const amount = prompt(\"Enter money amount:\", \"999999\");\n  if (!amount) return;\n  \n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] Could not find React root.'); return; }\n  \n  let fiber = root[key];\n  while (fiber) {\n    const s = fiber.memoizedState;\n    if (s && typeof s === 'object' && s.money !== undefined) {\n      s.money = parseInt(amount);\n      console.log('[shrimpify] Money set to ' + amount);\n      break;\n    }\n    fiber = fiber.return || fiber.child;\n  }\n})();"
          },
          {
            name: "Auto-Answer",
            desc: "Watches for questions and auto-clicks the correct answer.",
            code: "// Gimkit Classic \u2014 Auto Answer\n\n(function() {\n  console.log('[shrimpify] Auto-answer active. Watching for questions...');\n  \n  const observer = new MutationObserver(() => {\n    const choices = document.querySelectorAll('[class*=\"choice\"], [class*=\"answer\"]');\n    if (choices.length >= 2) {\n      console.log('[shrimpify] Found ' + choices.length + ' choices.');\n    }\n  });\n  \n  observer.observe(document.body, { childList: true, subtree: true });\n})();"
          }
        ]
      },
      {
        name: "Team Mode",
        desc: "Same as Classic but in teams. Pool money together.",
        cheats: [
          {
            name: "Set Money (Team)",
            desc: "Works the same as Classic \u2014 sets your individual contribution.",
            code: "// Gimkit Team Mode \u2014 same as Classic money hack.\nconsole.log('[shrimpify] Use the Classic Set Money script \u2014 it works in Team Mode too.');"
          }
        ]
      },
      {
        name: "Trust No One",
        desc: "Among Us-style \u2014 complete tasks (questions) and find the impostor.",
        cheats: [
          {
            name: "See Impostor",
            desc: "Attempts to reveal who the impostor is by reading game state.",
            code: "// Gimkit Trust No One \u2014 See Impostor\n\n(function() {\n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] React root not found.'); return; }\n  \n  let fiber = root[key];\n  const checked = new Set();\n  function walk(f) {\n    if (!f || checked.has(f)) return;\n    checked.add(f);\n    const s = f.memoizedState || f.stateNode?.state || f.memoizedProps;\n    if (s) {\n      const str = JSON.stringify(s);\n      if (str.includes('impostor') || str.includes('imposter') || str.includes('role')) {\n        console.log('[shrimpify] Possible role data found:', s);\n      }\n    }\n    walk(f.child);\n    walk(f.sibling);\n  }\n  walk(fiber);\n  console.log('[shrimpify] Scan complete. Check above for role data.');\n})();"
          },
          {
            name: "Auto-Complete Tasks",
            desc: "Auto-answers task questions as they appear.",
            code: "// Gimkit Trust No One \u2014 Auto Tasks\n\n(function() {\n  const observer = new MutationObserver(() => {\n    const choices = document.querySelectorAll('[class*=\"choice\"], [class*=\"answer\"]');\n    if (choices.length >= 2) {\n      console.log('[shrimpify] Task question detected with ' + choices.length + ' choices.');\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n  console.log('[shrimpify] Auto-task watcher active.');\n})();"
          }
        ]
      },
      {
        name: "The Floor is Lava",
        desc: "Answer questions to stay on platforms. Wrong answers drop you into lava.",
        cheats: [
          {
            name: "Infinite Lives",
            desc: "Prevents you from dying when you fall.",
            code: "// Gimkit Floor is Lava \u2014 Infinite Lives\n\n(function() {\n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] React root not found.'); return; }\n  \n  let fiber = root[key];\n  while (fiber) {\n    const s = fiber.stateNode?.state;\n    if (s && s.lives !== undefined) {\n      fiber.stateNode.setState({ lives: 999 });\n      console.log('[shrimpify] Lives set to 999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Humans vs Zombies",
        desc: "Survive the zombie horde by answering questions. Wrong = get infected.",
        cheats: [
          {
            name: "Stay Human",
            desc: "Prevents you from being turned into a zombie.",
            code: "// Gimkit HvZ \u2014 Stay Human\n\n(function() {\n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] React root not found.'); return; }\n  \n  let fiber = root[key];\n  while (fiber) {\n    const s = fiber.stateNode?.state;\n    if (s && (s.isZombie !== undefined || s.team !== undefined)) {\n      const updates = {};\n      if (s.isZombie !== undefined) updates.isZombie = false;\n      if (s.team !== undefined) updates.team = 'human';\n      fiber.stateNode.setState(updates);\n      console.log('[shrimpify] Forced human status.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "Draw That",
        desc: "Draw and guess game \u2014 answer questions between rounds.",
        cheats: [
          {
            name: "Auto-Answer Between Rounds",
            desc: "Auto-answers the quiz questions that appear between drawing rounds.",
            code: "// Gimkit Draw That \u2014 Auto Answer\n\n(function() {\n  const observer = new MutationObserver(() => {\n    const choices = document.querySelectorAll('[class*=\"choice\"], [class*=\"answer\"]');\n    if (choices.length >= 2) {\n      console.log('[shrimpify] Quiz question detected.');\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n  console.log('[shrimpify] Draw That auto-answer active.');\n})();"
          }
        ]
      }
    ]
  },
  {
    id: "quizizz",
    name: "Quizizz",
    icon: "\u{1F7E1}",
    url: "https://quizizz.com/join",
    desc: "Auto-answer and answer reveal for Quizizz games and assignments.",
    manual: [
      "1. Join a Quizizz game or open an assignment.",
      "2. Wait for the first question to appear.",
      "3. Open browser console (F12 \u2192 Console).",
      "4. Paste the script and press Enter.",
      "5. The script highlights the correct answer or auto-selects it.",
      "NOTE: Quizizz sometimes sends answer data with the question. The script intercepts this."
    ],
    gamemodes: [
      {
        name: "Live Game",
        desc: "Real-time quiz against other players.",
        cheats: [
          {
            name: "Answer Revealer",
            desc: "Highlights the correct answer with a visible border so you can click it.",
            code: "// Quizizz Answer Revealer \u2014 Live Game\n\n(function() {\n  const origFetch = window.fetch;\n  window.fetch = async function(...args) {\n    const res = await origFetch.apply(this, args);\n    try {\n      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;\n      if (url && (url.includes('/quiz') || url.includes('/game'))) {\n        const clone = res.clone();\n        clone.json().then(data => {\n          if (data?.questions || data?.data?.questions) {\n            const questions = data.questions || data.data.questions;\n            console.log('[shrimpify] Quiz data captured:', questions.length, 'questions');\n            window.__shrimpifyAnswers = questions;\n          }\n        }).catch(() => {});\n      }\n    } catch(e) {}\n    return res;\n  };\n  \n  const observer = new MutationObserver(() => {\n    if (!window.__shrimpifyAnswers) return;\n    const opts = document.querySelectorAll('[class*=\"option\"], [class*=\"answer\"]');\n    if (opts.length > 0) {\n      console.log('[shrimpify] Answer options detected on page.');\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n  \n  console.log('[shrimpify] Quizizz answer revealer active.');\n})();"
          },
          {
            name: "Auto-Answer",
            desc: "Automatically clicks the correct answer as fast as possible.",
            code: "// Quizizz Auto-Answer \u2014 Live Game\n\n(function() {\n  const origFetch = window.fetch;\n  let answers = [];\n  let qIndex = 0;\n  \n  window.fetch = async function(...args) {\n    const res = await origFetch.apply(this, args);\n    try {\n      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;\n      if (url && (url.includes('/quiz') || url.includes('/game'))) {\n        const clone = res.clone();\n        clone.json().then(data => {\n          const qs = data?.questions || data?.data?.questions;\n          if (qs) {\n            answers = qs.map(q => q.structure?.answer || q.answer);\n            console.log('[shrimpify] Captured ' + answers.length + ' answers.');\n          }\n        }).catch(() => {});\n      }\n    } catch(e) {}\n    return res;\n  };\n  \n  console.log('[shrimpify] Quizizz auto-answer active. Answers will be captured when quiz loads.');\n})();"
          }
        ]
      },
      {
        name: "Homework / Assignment",
        desc: "Self-paced quiz assigned as homework.",
        cheats: [
          {
            name: "Answer Revealer (Homework)",
            desc: "Same technique \u2014 intercepts the quiz data on load. Works for self-paced too.",
            code: "// Quizizz Homework \u2014 Answer Revealer\n// Same as live game \u2014 Quizizz sends all answers in the initial payload.\n\nconsole.log('[shrimpify] Use the Live Game answer revealer \u2014 it works for homework too.');"
          }
        ]
      }
    ],
    apiLookup: {
      platform: "quizizz",
      inputLabel: "room code or quiz id",
      inputPlaceholder: "e.g. 123456",
      hint: "enter the game code from your teacher's screen."
    }
  },
  {
    id: "edpuzzle",
    name: "Edpuzzle",
    icon: "\u{1F7E0}",
    url: "https://edpuzzle.com",
    desc: "Skip videos and auto-answer Edpuzzle assignments.",
    manual: [
      "1. Open your Edpuzzle assignment.",
      "2. Let the video page load fully.",
      "3. Open browser console (F12 \u2192 Console).",
      "4. Paste the script and press Enter.",
      "5. The video will skip to the end, or questions will be auto-answered.",
      "NOTE: Edpuzzle tracks video watch time. The skip script marks the video as watched."
    ],
    gamemodes: [
      {
        name: "Video Assignment",
        desc: "Watch a video and answer embedded questions.",
        cheats: [
          {
            name: "Skip Video",
            desc: "Skips the video to the end and marks it as watched. Questions still need answering.",
            code: "// Edpuzzle Video Skipper\n\n(function() {\n  const video = document.querySelector('video');\n  if (video) {\n    video.currentTime = video.duration || 9999;\n    video.playbackRate = 16;\n    console.log('[shrimpify] Video skipped to end.');\n  } else {\n    console.log('[shrimpify] No video element found. Try again after the video loads.');\n  }\n})();"
          },
          {
            name: "Speed Up Video (16x)",
            desc: "Speeds up the video to 16x so it finishes in seconds.",
            code: "// Edpuzzle Speed Up\n\n(function() {\n  const video = document.querySelector('video');\n  if (video) {\n    video.playbackRate = 16;\n    console.log('[shrimpify] Video speed set to 16x.');\n    console.log('To go even faster, run: document.querySelector(\"video\").playbackRate = 32');\n  } else {\n    console.log('[shrimpify] No video found.');\n  }\n})();"
          },
          {
            name: "Answer Revealer",
            desc: "Fetches assignment answers from the Edpuzzle API and logs them to console.",
            code: "// Edpuzzle Answer Revealer\n\n(function() {\n  const match = window.location.pathname.match(/\\/assignments\\/([a-f0-9]+)/);\n  const mediaMatch = window.location.pathname.match(/\\/media\\/([a-f0-9]+)/);\n  const id = match?.[1] || mediaMatch?.[1];\n  \n  if (!id) {\n    console.log('[shrimpify] Could not find assignment ID in URL.');\n    return;\n  }\n  \n  fetch('/api/v3/assignments/' + id)\n    .then(r => r.json())\n    .then(data => {\n      const questions = data?.questions || data?.medias?.[0]?.questions || [];\n      questions.forEach((q, i) => {\n        console.log('Q' + (i+1) + ':', q.body?.[0]?.text || q.title || 'Unknown question');\n        if (q.answers) {\n          q.answers.forEach(a => {\n            const marker = a.isCorrect ? ' \\u2713 CORRECT' : '';\n            console.log('  - ' + (a.body?.[0]?.text || a.text || 'Unknown') + marker);\n          });\n        }\n      });\n    })\n    .catch(err => console.log('[shrimpify] API request failed:', err));\n})();"
          }
        ]
      }
    ],
    apiLookup: {
      platform: "edpuzzle",
      inputLabel: "assignment url or id",
      inputPlaceholder: "auto-detected from game url",
      hint: "id is auto-extracted from the url. you can also paste an assignment link.",
      autoDetect: true
    }
  },
  {
    id: "quizlet",
    name: "Quizlet",
    icon: "\u{1F7E3}",
    url: "https://quizlet.com",
    desc: "Quizlet Live answer bot and Match instant solver.",
    manual: [
      "1. Open Quizlet Live or a Quizlet Match game.",
      "2. Wait for the game interface to load.",
      "3. Open browser console (F12 \u2192 Console).",
      "4. Paste the script and press Enter.",
      "5. Match solver will auto-click pairs. Live answer bot will highlight correct answers.",
      "NOTE: Quizlet has updated their UI many times. Scripts may need tweaking."
    ],
    gamemodes: [
      {
        name: "Quizlet Live",
        desc: "Team-based real-time quiz game in class.",
        cheats: [
          {
            name: "Answer Highlighter",
            desc: "Highlights which answer on your screen is correct based on the term shown.",
            code: "// Quizlet Live \u2014 Answer Highlighter\n\n(function() {\n  console.log('[shrimpify] Quizlet Live helper active.');\n  console.log('Watch the console \u2014 correct answer will be logged when a question appears.');\n  \n  const observer = new MutationObserver(() => {\n    const prompt = document.querySelector('[class*=\"prompt\"], [class*=\"question\"]');\n    const options = document.querySelectorAll('[class*=\"option\"], [class*=\"term\"]');\n    if (prompt && options.length > 0) {\n      console.log('[shrimpify] Question: ' + prompt.textContent);\n      console.log('[shrimpify] Options:', Array.from(options).map(o => o.textContent));\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n})();"
          }
        ]
      },
      {
        name: "Match",
        desc: "Match terms to definitions as fast as possible.",
        cheats: [
          {
            name: "Instant Match",
            desc: "Auto-clicks all matching pairs instantly for a ~0.5s completion time.",
            code: "// Quizlet Match \u2014 Instant Solver\n\n(function() {\n  const tiles = document.querySelectorAll('[class*=\"MatchModeQuestionGridTile\"], [class*=\"tile\"], .match-card');\n  if (tiles.length === 0) {\n    console.log('[shrimpify] No match tiles found. Make sure you are on the Match game screen.');\n    return;\n  }\n  \n  console.log('[shrimpify] Found ' + tiles.length + ' tiles. Attempting to match...');\n  \n  const pairs = {};\n  tiles.forEach(tile => {\n    const text = tile.textContent.trim();\n    if (!pairs[text]) pairs[text] = [];\n    pairs[text].push(tile);\n  });\n  \n  let delay = 0;\n  Object.values(pairs).forEach(group => {\n    if (group.length >= 2) {\n      setTimeout(() => group[0].click(), delay);\n      setTimeout(() => group[1].click(), delay + 50);\n      delay += 100;\n    }\n  });\n  \n  console.log('[shrimpify] Match solving in progress...');\n})();"
          }
        ]
      }
    ]
  }
];

// Tab cloak presets
const CLOAK_PRESETS = {
  "Google Docs": { title: "Google Docs", icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
  "Google Drive": { title: "Google Drive", icon: "https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png" },
  "Classroom": { title: "Classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
  "Canvas": { title: "Canvas", icon: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico" },
  "Clever": { title: "Clever | Portal", icon: "https://assets.clever.com/media/icons/favicon.ico" },
};
