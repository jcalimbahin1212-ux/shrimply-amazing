/* ============================================
   shrimpify diversity — data catalog
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
  length: {
    units: {
      "meter": 1, "kilometer": 1000, "centimeter": 0.01, "millimeter": 0.001,
      "mile": 1609.344, "yard": 0.9144, "foot": 0.3048, "inch": 0.0254
    }
  },
  weight: {
    units: {
      "kilogram": 1, "gram": 0.001, "milligram": 0.000001,
      "pound": 0.453592, "ounce": 0.0283495, "ton (US)": 907.185, "metric ton": 1000
    }
  },
  temperature: {
    units: {
      "celsius": {
        toBase: function (v) { return v; },
        fromBase: function (v) { return v; }
      },
      "fahrenheit": {
        toBase: function (v) { return (v - 32) * 5 / 9; },
        fromBase: function (v) { return v * 9 / 5 + 32; }
      },
      "kelvin": {
        toBase: function (v) { return v - 273.15; },
        fromBase: function (v) { return v + 273.15; }
      }
    }
  },
  volume: {
    units: {
      "liter": 1, "milliliter": 0.001, "gallon": 3.78541, "quart": 0.946353,
      "pint": 0.473176, "cup": 0.236588, "fluid ounce": 0.0295735,
      "tablespoon": 0.0147868, "teaspoon": 0.00492892
    }
  },
  speed: {
    units: {
      "m/s": 1, "km/h": 0.277778, "mph": 0.44704, "knot": 0.514444, "ft/s": 0.3048
    }
  },
  time: {
    units: {
      "second": 1, "millisecond": 0.001, "minute": 60, "hour": 3600,
      "day": 86400, "week": 604800, "month": 2629800, "year": 31557600
    }
  },
  data: {
    units: {
      "byte": 1, "kilobyte": 1024, "megabyte": 1048576,
      "gigabyte": 1073741824, "terabyte": 1099511627776, "bit": 0.125
    }
  }
};

// ---- Formula Sheets ----
const FORMULAS = [
  // algebra
  { category: "algebra", name: "quadratic formula", formula: "x = (-b +/- sqrt(b^2 - 4ac)) / 2a", desc: "solves ax^2 + bx + c = 0" },
  { category: "algebra", name: "slope", formula: "m = (y2 - y1) / (x2 - x1)", desc: "slope of a line through two points" },
  { category: "algebra", name: "slope-intercept form", formula: "y = mx + b", desc: "line with slope m and y-intercept b" },
  { category: "algebra", name: "point-slope form", formula: "y - y1 = m(x - x1)", desc: "line through (x1,y1) with slope m" },
  { category: "algebra", name: "standard form (line)", formula: "Ax + By = C", desc: "standard form of a linear equation" },
  { category: "algebra", name: "distance formula", formula: "d = sqrt((x2-x1)^2 + (y2-y1)^2)", desc: "distance between two points" },
  { category: "algebra", name: "midpoint formula", formula: "M = ((x1+x2)/2, (y1+y2)/2)", desc: "midpoint of a line segment" },
  { category: "algebra", name: "difference of squares", formula: "a^2 - b^2 = (a+b)(a-b)", desc: "factoring pattern" },
  { category: "algebra", name: "perfect square trinomial", formula: "a^2 +/- 2ab + b^2 = (a +/- b)^2", desc: "factoring pattern" },
  { category: "algebra", name: "simple interest", formula: "I = Prt", desc: "P=principal, r=rate, t=time" },
  { category: "algebra", name: "compound interest", formula: "A = P(1 + r/n)^(nt)", desc: "n=compounds per year, t=years" },
  { category: "algebra", name: "logarithm product rule", formula: "log(ab) = log(a) + log(b)", desc: "product rule for logarithms" },
  { category: "algebra", name: "logarithm power rule", formula: "log(a^n) = n * log(a)", desc: "power rule for logarithms" },
  // geometry
  { category: "geometry", name: "rectangle area", formula: "A = l * w", desc: "length times width" },
  { category: "geometry", name: "rectangle perimeter", formula: "P = 2l + 2w", desc: "sum of all sides" },
  { category: "geometry", name: "triangle area", formula: "A = (1/2) * b * h", desc: "base times height divided by 2" },
  { category: "geometry", name: "circle area", formula: "A = pi * r^2", desc: "pi times radius squared" },
  { category: "geometry", name: "circle circumference", formula: "C = 2 * pi * r", desc: "2 pi times radius" },
  { category: "geometry", name: "Pythagorean theorem", formula: "a^2 + b^2 = c^2", desc: "right triangle side relationship" },
  { category: "geometry", name: "volume of sphere", formula: "V = (4/3) * pi * r^3", desc: "four-thirds pi r cubed" },
  { category: "geometry", name: "volume of cylinder", formula: "V = pi * r^2 * h", desc: "pi r squared times height" },
  { category: "geometry", name: "volume of cone", formula: "V = (1/3) * pi * r^2 * h", desc: "one-third pi r squared h" },
  { category: "geometry", name: "volume of rectangular prism", formula: "V = l * w * h", desc: "length times width times height" },
  { category: "geometry", name: "surface area of sphere", formula: "SA = 4 * pi * r^2", desc: "4 pi r squared" },
  { category: "geometry", name: "surface area of cylinder", formula: "SA = 2*pi*r^2 + 2*pi*r*h", desc: "two circles plus lateral area" },
  { category: "geometry", name: "trapezoid area", formula: "A = (1/2)(b1 + b2) * h", desc: "average of bases times height" },
  // trigonometry
  { category: "trigonometry", name: "sine", formula: "sin(A) = opposite / hypotenuse", desc: "SOH in SOH-CAH-TOA" },
  { category: "trigonometry", name: "cosine", formula: "cos(A) = adjacent / hypotenuse", desc: "CAH in SOH-CAH-TOA" },
  { category: "trigonometry", name: "tangent", formula: "tan(A) = opposite / adjacent", desc: "TOA in SOH-CAH-TOA" },
  { category: "trigonometry", name: "Pythagorean identity", formula: "sin^2(x) + cos^2(x) = 1", desc: "fundamental trig identity" },
  { category: "trigonometry", name: "law of sines", formula: "a/sin(A) = b/sin(B) = c/sin(C)", desc: "relates sides to opposite angles" },
  { category: "trigonometry", name: "law of cosines", formula: "c^2 = a^2 + b^2 - 2ab*cos(C)", desc: "generalized Pythagorean theorem" },
  { category: "trigonometry", name: "double angle (sin)", formula: "sin(2x) = 2*sin(x)*cos(x)", desc: "sine double angle formula" },
  { category: "trigonometry", name: "double angle (cos)", formula: "cos(2x) = cos^2(x) - sin^2(x)", desc: "cosine double angle formula" },
  { category: "trigonometry", name: "radians to degrees", formula: "degrees = radians * (180/pi)", desc: "converting radians to degrees" },
  // physics
  { category: "physics", name: "velocity", formula: "v = d / t", desc: "distance divided by time" },
  { category: "physics", name: "acceleration", formula: "a = (v_f - v_i) / t", desc: "change in velocity over time" },
  { category: "physics", name: "Newton's second law", formula: "F = m * a", desc: "force equals mass times acceleration" },
  { category: "physics", name: "weight", formula: "W = m * g", desc: "mass times gravitational acceleration (9.8 m/s^2)" },
  { category: "physics", name: "kinetic energy", formula: "KE = (1/2) * m * v^2", desc: "energy of motion" },
  { category: "physics", name: "potential energy", formula: "PE = m * g * h", desc: "energy due to height" },
  { category: "physics", name: "work", formula: "W = F * d * cos(theta)", desc: "force times displacement" },
  { category: "physics", name: "power", formula: "P = W / t", desc: "work done per unit time" },
  { category: "physics", name: "momentum", formula: "p = m * v", desc: "mass times velocity" },
  { category: "physics", name: "impulse", formula: "J = F * t = delta(p)", desc: "force times time equals change in momentum" },
  { category: "physics", name: "Ohm's law", formula: "V = I * R", desc: "voltage = current times resistance" },
  { category: "physics", name: "wave speed", formula: "v = f * lambda", desc: "frequency times wavelength" },
  { category: "physics", name: "density", formula: "rho = m / V", desc: "mass per unit volume" },
  // chemistry
  { category: "chemistry", name: "density", formula: "D = m / V", desc: "mass divided by volume" },
  { category: "chemistry", name: "molarity", formula: "M = mol / L", desc: "moles of solute per liter of solution" },
  { category: "chemistry", name: "ideal gas law", formula: "PV = nRT", desc: "P=pressure, V=volume, n=moles, R=8.314, T=temp(K)" },
  { category: "chemistry", name: "pH", formula: "pH = -log[H+]", desc: "negative log of hydrogen ion concentration" },
  { category: "chemistry", name: "dilution", formula: "M1*V1 = M2*V2", desc: "concentration times volume before = after" },
  { category: "chemistry", name: "percent composition", formula: "% = (mass of element / molar mass) * 100", desc: "mass percent of an element in a compound" },
  { category: "chemistry", name: "moles from mass", formula: "n = m / M", desc: "mass divided by molar mass" },
  { category: "chemistry", name: "Avogadro's number", formula: "1 mol = 6.022 * 10^23 particles", desc: "number of particles in one mole" },
  // biology
  { category: "biology", name: "Hardy-Weinberg equation", formula: "p^2 + 2pq + q^2 = 1", desc: "allele frequency in a population at equilibrium" },
  { category: "biology", name: "allele frequency", formula: "p + q = 1", desc: "sum of dominant (p) and recessive (q) allele frequencies" },
  { category: "biology", name: "population growth", formula: "dN/dt = rN", desc: "exponential growth: r=rate, N=population size" },
  { category: "biology", name: "logistic growth", formula: "dN/dt = rN((K-N)/K)", desc: "growth limited by carrying capacity K" },
  { category: "biology", name: "photosynthesis", formula: "6CO2 + 6H2O -> C6H12O6 + 6O2", desc: "light energy converts CO2 and water to glucose and oxygen" },
  { category: "biology", name: "cellular respiration", formula: "C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP", desc: "glucose broken down for energy" },
  { category: "biology", name: "BMI", formula: "BMI = mass(kg) / height(m)^2", desc: "body mass index" },
  { category: "biology", name: "surface area:volume", formula: "SA:V = surface area / volume", desc: "decreases as cell size increases, limits cell size" },
  { category: "biology", name: "water potential", formula: "Psi = Psi_s + Psi_p", desc: "solute potential plus pressure potential" },
  { category: "biology", name: "Simpson's diversity index", formula: "D = 1 - Sum(n/N)^2", desc: "n=individuals of one species, N=total individuals" },
  // statistics
  { category: "statistics", name: "mean", formula: "x_bar = Sum(x) / n", desc: "sum of values divided by count" },
  { category: "statistics", name: "standard deviation", formula: "sigma = sqrt(Sum(x - x_bar)^2 / n)", desc: "spread of data around the mean" },
  { category: "statistics", name: "variance", formula: "sigma^2 = Sum(x - x_bar)^2 / n", desc: "square of standard deviation" },
  { category: "statistics", name: "z-score", formula: "z = (x - mu) / sigma", desc: "how many standard deviations from the mean" },
  { category: "statistics", name: "probability (OR)", formula: "P(A or B) = P(A) + P(B) - P(A and B)", desc: "addition rule for probability" },
  { category: "statistics", name: "probability (AND)", formula: "P(A and B) = P(A) * P(B|A)", desc: "multiplication rule for probability" },
  { category: "statistics", name: "combinations", formula: "C(n,r) = n! / (r!(n-r)!)", desc: "number of ways to choose r items from n" },
  { category: "statistics", name: "permutations", formula: "P(n,r) = n! / (n-r)!", desc: "number of ordered arrangements of r items from n" },
  { category: "statistics", name: "linear regression", formula: "y_hat = a + bx", desc: "predicted value from slope b and intercept a" },
  { category: "statistics", name: "correlation coefficient", formula: "r = Sum((x-x_bar)(y-y_bar)) / sqrt(Sum(x-x_bar)^2 * Sum(y-y_bar)^2)", desc: "strength of linear relationship, -1 to 1" },
];

// ---- Periodic Table Elements ----
const ELEMENTS = [
  { z: 1, symbol: "H", name: "hydrogen", mass: 1.008, category: "nonmetal", group: 1, period: 1, block: "s" },
  { z: 2, symbol: "He", name: "helium", mass: 4.003, category: "noble-gas", group: 18, period: 1, block: "s" },
  { z: 3, symbol: "Li", name: "lithium", mass: 6.941, category: "alkali-metal", group: 1, period: 2, block: "s" },
  { z: 4, symbol: "Be", name: "beryllium", mass: 9.012, category: "alkaline-earth", group: 2, period: 2, block: "s" },
  { z: 5, symbol: "B", name: "boron", mass: 10.81, category: "metalloid", group: 13, period: 2, block: "p" },
  { z: 6, symbol: "C", name: "carbon", mass: 12.011, category: "nonmetal", group: 14, period: 2, block: "p" },
  { z: 7, symbol: "N", name: "nitrogen", mass: 14.007, category: "nonmetal", group: 15, period: 2, block: "p" },
  { z: 8, symbol: "O", name: "oxygen", mass: 15.999, category: "nonmetal", group: 16, period: 2, block: "p" },
  { z: 9, symbol: "F", name: "fluorine", mass: 18.998, category: "halogen", group: 17, period: 2, block: "p" },
  { z: 10, symbol: "Ne", name: "neon", mass: 20.180, category: "noble-gas", group: 18, period: 2, block: "p" },
  { z: 11, symbol: "Na", name: "sodium", mass: 22.990, category: "alkali-metal", group: 1, period: 3, block: "s" },
  { z: 12, symbol: "Mg", name: "magnesium", mass: 24.305, category: "alkaline-earth", group: 2, period: 3, block: "s" },
  { z: 13, symbol: "Al", name: "aluminium", mass: 26.982, category: "post-transition", group: 13, period: 3, block: "p" },
  { z: 14, symbol: "Si", name: "silicon", mass: 28.086, category: "metalloid", group: 14, period: 3, block: "p" },
  { z: 15, symbol: "P", name: "phosphorus", mass: 30.974, category: "nonmetal", group: 15, period: 3, block: "p" },
  { z: 16, symbol: "S", name: "sulfur", mass: 32.065, category: "nonmetal", group: 16, period: 3, block: "p" },
  { z: 17, symbol: "Cl", name: "chlorine", mass: 35.453, category: "halogen", group: 17, period: 3, block: "p" },
  { z: 18, symbol: "Ar", name: "argon", mass: 39.948, category: "noble-gas", group: 18, period: 3, block: "p" },
  { z: 19, symbol: "K", name: "potassium", mass: 39.098, category: "alkali-metal", group: 1, period: 4, block: "s" },
  { z: 20, symbol: "Ca", name: "calcium", mass: 40.078, category: "alkaline-earth", group: 2, period: 4, block: "s" },
  { z: 21, symbol: "Sc", name: "scandium", mass: 44.956, category: "transition-metal", group: 3, period: 4, block: "d" },
  { z: 22, symbol: "Ti", name: "titanium", mass: 47.867, category: "transition-metal", group: 4, period: 4, block: "d" },
  { z: 23, symbol: "V", name: "vanadium", mass: 50.942, category: "transition-metal", group: 5, period: 4, block: "d" },
  { z: 24, symbol: "Cr", name: "chromium", mass: 51.996, category: "transition-metal", group: 6, period: 4, block: "d" },
  { z: 25, symbol: "Mn", name: "manganese", mass: 54.938, category: "transition-metal", group: 7, period: 4, block: "d" },
  { z: 26, symbol: "Fe", name: "iron", mass: 55.845, category: "transition-metal", group: 8, period: 4, block: "d" },
  { z: 27, symbol: "Co", name: "cobalt", mass: 58.933, category: "transition-metal", group: 9, period: 4, block: "d" },
  { z: 28, symbol: "Ni", name: "nickel", mass: 58.693, category: "transition-metal", group: 10, period: 4, block: "d" },
  { z: 29, symbol: "Cu", name: "copper", mass: 63.546, category: "transition-metal", group: 11, period: 4, block: "d" },
  { z: 30, symbol: "Zn", name: "zinc", mass: 65.38, category: "transition-metal", group: 12, period: 4, block: "d" },
  { z: 31, symbol: "Ga", name: "gallium", mass: 69.723, category: "post-transition", group: 13, period: 4, block: "p" },
  { z: 32, symbol: "Ge", name: "germanium", mass: 72.630, category: "metalloid", group: 14, period: 4, block: "p" },
  { z: 33, symbol: "As", name: "arsenic", mass: 74.922, category: "metalloid", group: 15, period: 4, block: "p" },
  { z: 34, symbol: "Se", name: "selenium", mass: 78.971, category: "nonmetal", group: 16, period: 4, block: "p" },
  { z: 35, symbol: "Br", name: "bromine", mass: 79.904, category: "halogen", group: 17, period: 4, block: "p" },
  { z: 36, symbol: "Kr", name: "krypton", mass: 83.798, category: "noble-gas", group: 18, period: 4, block: "p" },
  { z: 37, symbol: "Rb", name: "rubidium", mass: 85.468, category: "alkali-metal", group: 1, period: 5, block: "s" },
  { z: 38, symbol: "Sr", name: "strontium", mass: 87.62, category: "alkaline-earth", group: 2, period: 5, block: "s" },
  { z: 39, symbol: "Y", name: "yttrium", mass: 88.906, category: "transition-metal", group: 3, period: 5, block: "d" },
  { z: 40, symbol: "Zr", name: "zirconium", mass: 91.224, category: "transition-metal", group: 4, period: 5, block: "d" },
  { z: 41, symbol: "Nb", name: "niobium", mass: 92.906, category: "transition-metal", group: 5, period: 5, block: "d" },
  { z: 42, symbol: "Mo", name: "molybdenum", mass: 95.95, category: "transition-metal", group: 6, period: 5, block: "d" },
  { z: 43, symbol: "Tc", name: "technetium", mass: 98, category: "transition-metal", group: 7, period: 5, block: "d" },
  { z: 44, symbol: "Ru", name: "ruthenium", mass: 101.07, category: "transition-metal", group: 8, period: 5, block: "d" },
  { z: 45, symbol: "Rh", name: "rhodium", mass: 102.91, category: "transition-metal", group: 9, period: 5, block: "d" },
  { z: 46, symbol: "Pd", name: "palladium", mass: 106.42, category: "transition-metal", group: 10, period: 5, block: "d" },
  { z: 47, symbol: "Ag", name: "silver", mass: 107.87, category: "transition-metal", group: 11, period: 5, block: "d" },
  { z: 48, symbol: "Cd", name: "cadmium", mass: 112.41, category: "transition-metal", group: 12, period: 5, block: "d" },
  { z: 49, symbol: "In", name: "indium", mass: 114.82, category: "post-transition", group: 13, period: 5, block: "p" },
  { z: 50, symbol: "Sn", name: "tin", mass: 118.71, category: "post-transition", group: 14, period: 5, block: "p" },
  { z: 51, symbol: "Sb", name: "antimony", mass: 121.76, category: "metalloid", group: 15, period: 5, block: "p" },
  { z: 52, symbol: "Te", name: "tellurium", mass: 127.60, category: "metalloid", group: 16, period: 5, block: "p" },
  { z: 53, symbol: "I", name: "iodine", mass: 126.90, category: "halogen", group: 17, period: 5, block: "p" },
  { z: 54, symbol: "Xe", name: "xenon", mass: 131.29, category: "noble-gas", group: 18, period: 5, block: "p" },
  { z: 55, symbol: "Cs", name: "cesium", mass: 132.91, category: "alkali-metal", group: 1, period: 6, block: "s" },
  { z: 56, symbol: "Ba", name: "barium", mass: 137.33, category: "alkaline-earth", group: 2, period: 6, block: "s" },
  // Lanthanides (z 57-71)
  { z: 57, symbol: "La", name: "lanthanum", mass: 138.91, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 58, symbol: "Ce", name: "cerium", mass: 140.12, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 59, symbol: "Pr", name: "praseodymium", mass: 140.91, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 60, symbol: "Nd", name: "neodymium", mass: 144.24, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 61, symbol: "Pm", name: "promethium", mass: 145, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 62, symbol: "Sm", name: "samarium", mass: 150.36, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 63, symbol: "Eu", name: "europium", mass: 151.96, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 64, symbol: "Gd", name: "gadolinium", mass: 157.25, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 65, symbol: "Tb", name: "terbium", mass: 158.93, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 66, symbol: "Dy", name: "dysprosium", mass: 162.50, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 67, symbol: "Ho", name: "holmium", mass: 164.93, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 68, symbol: "Er", name: "erbium", mass: 167.26, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 69, symbol: "Tm", name: "thulium", mass: 168.93, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 70, symbol: "Yb", name: "ytterbium", mass: 173.05, category: "lanthanide", group: 3, period: 6, block: "f" },
  { z: 71, symbol: "Lu", name: "lutetium", mass: 174.97, category: "lanthanide", group: 3, period: 6, block: "d" },
  // Period 6 continued
  { z: 72, symbol: "Hf", name: "hafnium", mass: 178.49, category: "transition-metal", group: 4, period: 6, block: "d" },
  { z: 73, symbol: "Ta", name: "tantalum", mass: 180.95, category: "transition-metal", group: 5, period: 6, block: "d" },
  { z: 74, symbol: "W", name: "tungsten", mass: 183.84, category: "transition-metal", group: 6, period: 6, block: "d" },
  { z: 75, symbol: "Re", name: "rhenium", mass: 186.21, category: "transition-metal", group: 7, period: 6, block: "d" },
  { z: 76, symbol: "Os", name: "osmium", mass: 190.23, category: "transition-metal", group: 8, period: 6, block: "d" },
  { z: 77, symbol: "Ir", name: "iridium", mass: 192.22, category: "transition-metal", group: 9, period: 6, block: "d" },
  { z: 78, symbol: "Pt", name: "platinum", mass: 195.08, category: "transition-metal", group: 10, period: 6, block: "d" },
  { z: 79, symbol: "Au", name: "gold", mass: 196.97, category: "transition-metal", group: 11, period: 6, block: "d" },
  { z: 80, symbol: "Hg", name: "mercury", mass: 200.59, category: "transition-metal", group: 12, period: 6, block: "d" },
  { z: 81, symbol: "Tl", name: "thallium", mass: 204.38, category: "post-transition", group: 13, period: 6, block: "p" },
  { z: 82, symbol: "Pb", name: "lead", mass: 207.2, category: "post-transition", group: 14, period: 6, block: "p" },
  { z: 83, symbol: "Bi", name: "bismuth", mass: 208.98, category: "post-transition", group: 15, period: 6, block: "p" },
  { z: 84, symbol: "Po", name: "polonium", mass: 209, category: "metalloid", group: 16, period: 6, block: "p" },
  { z: 85, symbol: "At", name: "astatine", mass: 210, category: "halogen", group: 17, period: 6, block: "p" },
  { z: 86, symbol: "Rn", name: "radon", mass: 222, category: "noble-gas", group: 18, period: 6, block: "p" },
  { z: 87, symbol: "Fr", name: "francium", mass: 223, category: "alkali-metal", group: 1, period: 7, block: "s" },
  { z: 88, symbol: "Ra", name: "radium", mass: 226, category: "alkaline-earth", group: 2, period: 7, block: "s" },
  // Actinides (z 89-103)
  { z: 89, symbol: "Ac", name: "actinium", mass: 227, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 90, symbol: "Th", name: "thorium", mass: 232.04, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 91, symbol: "Pa", name: "protactinium", mass: 231.04, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 92, symbol: "U", name: "uranium", mass: 238.03, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 93, symbol: "Np", name: "neptunium", mass: 237, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 94, symbol: "Pu", name: "plutonium", mass: 244, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 95, symbol: "Am", name: "americium", mass: 243, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 96, symbol: "Cm", name: "curium", mass: 247, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 97, symbol: "Bk", name: "berkelium", mass: 247, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 98, symbol: "Cf", name: "californium", mass: 251, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 99, symbol: "Es", name: "einsteinium", mass: 252, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 100, symbol: "Fm", name: "fermium", mass: 257, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 101, symbol: "Md", name: "mendelevium", mass: 258, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 102, symbol: "No", name: "nobelium", mass: 259, category: "actinide", group: 3, period: 7, block: "f" },
  { z: 103, symbol: "Lr", name: "lawrencium", mass: 266, category: "actinide", group: 3, period: 7, block: "d" },
  // Period 7 continued
  { z: 104, symbol: "Rf", name: "rutherfordium", mass: 267, category: "transition-metal", group: 4, period: 7, block: "d" },
  { z: 105, symbol: "Db", name: "dubnium", mass: 268, category: "transition-metal", group: 5, period: 7, block: "d" },
  { z: 106, symbol: "Sg", name: "seaborgium", mass: 269, category: "transition-metal", group: 6, period: 7, block: "d" },
  { z: 107, symbol: "Bh", name: "bohrium", mass: 270, category: "transition-metal", group: 7, period: 7, block: "d" },
  { z: 108, symbol: "Hs", name: "hassium", mass: 277, category: "transition-metal", group: 8, period: 7, block: "d" },
  { z: 109, symbol: "Mt", name: "meitnerium", mass: 278, category: "transition-metal", group: 9, period: 7, block: "d" },
  { z: 110, symbol: "Ds", name: "darmstadtium", mass: 281, category: "transition-metal", group: 10, period: 7, block: "d" },
  { z: 111, symbol: "Rg", name: "roentgenium", mass: 282, category: "transition-metal", group: 11, period: 7, block: "d" },
  { z: 112, symbol: "Cn", name: "copernicium", mass: 285, category: "transition-metal", group: 12, period: 7, block: "d" },
  { z: 113, symbol: "Nh", name: "nihonium", mass: 286, category: "post-transition", group: 13, period: 7, block: "p" },
  { z: 114, symbol: "Fl", name: "flerovium", mass: 289, category: "post-transition", group: 14, period: 7, block: "p" },
  { z: 115, symbol: "Mc", name: "moscovium", mass: 290, category: "post-transition", group: 15, period: 7, block: "p" },
  { z: 116, symbol: "Lv", name: "livermorium", mass: 293, category: "post-transition", group: 16, period: 7, block: "p" },
  { z: 117, symbol: "Ts", name: "tennessine", mass: 294, category: "halogen", group: 17, period: 7, block: "p" },
  { z: 118, symbol: "Og", name: "oganesson", mass: 294, category: "noble-gas", group: 18, period: 7, block: "p" },
];

// ---- Comprehensive Cheats ----
const CHEATS = [
  {
    id: "kahoot",
    name: "Kahoot",
    icon: "\u{1F7E3}",
    url: "https://kahoot.it",
    desc: "auto-answer tools for Kahoot quizzes and challenges.",
    manual: [
      "1. join the Kahoot game on kahoot.it with your PIN as normal.",
      "2. open the browser console (F12 \u2192 console tab).",
      "3. paste the script for the cheat you want and press enter.",
      "4. the script will read the question from the page and attempt to auto-select the correct answer.",
      "5. some scripts work by intercepting the WebSocket data that Kahoot sends \u2014 answers are embedded in the game data.",
      "NOTE: these scripts must be run on the kahoot.it page, not on shrimpify diversity."
    ],
    gamemodes: [
      {
        name: "classic",
        desc: "standard quiz with timed multiple-choice questions.",
        cheats: [
          {
            name: "auto-answer",
            desc: "automatically selects the correct answer when each question appears. works by reading the quiz data from Kahoot's internal state.",
            code: "// Kahoot Auto-Answer \u2014 Classic Mode\n// Run this in the browser console on kahoot.it AFTER joining a game.\n// This reads the quiz answers from the page's internal data.\n\n(function() {\n  const originalFetch = window.fetch;\n  window.fetch = async function(...args) {\n    const response = await originalFetch.apply(this, args);\n    const url = args[0];\n    if (typeof url === 'string' && url.includes('/answers')) {\n      const clone = response.clone();\n      clone.json().then(data => {\n        console.log('[shrimpify] Answer data intercepted:', data);\n      }).catch(() => {});\n    }\n    return response;\n  };\n  console.log('[shrimpify] Kahoot auto-answer active. Waiting for questions...');\n})();"
          },
          {
            name: "answer revealer",
            desc: "logs the correct answer to the console for each question so you can pick it manually.",
            code: "// Kahoot Answer Revealer\n// Shows correct answers in the console without auto-clicking.\n\n(function() {\n  const ws = window.__kahootWebSocket || null;\n  if (ws) {\n    const orig = ws.onmessage;\n    ws.onmessage = function(e) {\n      try {\n        const data = JSON.parse(e.data);\n        if (data.type === 'question') {\n          console.log('[shrimpify] Correct answer index:', data.correctIndex);\n        }\n      } catch(err) {}\n      if (orig) orig.call(this, e);\n    };\n  }\n  console.log('[shrimpify] Answer revealer active.');\n})();"
          }
        ]
      },
      {
        name: "team mode",
        desc: "teams collaborate to answer. same question format as classic.",
        cheats: [
          {
            name: "auto-answer (team)",
            desc: "same as classic auto-answer -- works identically in team mode since the quiz format is the same.",
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
    desc: "comprehensive cheats for every Blooket gamemode.",
    manual: [
      "1. join a Blooket game at play.blooket.com with your game code.",
      "2. wait for the game to start and the gamemode to load.",
      "3. open browser console (F12 \u2192 console).",
      "4. paste the script for your specific gamemode and press enter.",
      "5. each gamemode has different cheats \u2014 make sure you pick the right one!",
      "NOTE: Blooket stores game state in React internals. these scripts access the React fiber tree to modify state."
    ],
    gamemodes: [
      {
        name: "gold quest",
        desc: "answer questions to open chests. steal gold from others or find loot.",
        cheats: [
          {
            name: "set gold amount",
            desc: "sets your gold to any value you want.",
            code: "// Blooket Gold Quest \u2014 Set Gold\n// Run on play.blooket.com during a Gold Quest game.\n\n(function() {\n  const amount = prompt(\"Enter gold amount:\", \"999999\");\n  if (!amount) return;\n  \n  // Access React internal state\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    if (fiber.memoizedState?.gold !== undefined) {\n      fiber.memoizedState.gold = parseInt(amount);\n      console.log('[shrimpify] Gold set to ' + amount);\n      break;\n    }\n    if (fiber.stateNode?.state?.gold !== undefined) {\n      fiber.stateNode.state.gold = parseInt(amount);\n      fiber.stateNode.setState({ gold: parseInt(amount) });\n      console.log('[shrimpify] Gold set to ' + amount);\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          },
          {
            name: "always get best chest",
            desc: "every chest you open will give maximum rewards.",
            code: "// Blooket Gold Quest \u2014 Best Chest\n// Overrides the chest reward RNG.\n\n(function() {\n  const origRandom = Math.random;\n  Math.random = function() {\n    // Return high value to always pick top rewards\n    return 0.99;\n  };\n  console.log('[shrimpify] Math.random overridden \u2014 chests will give best rewards.');\n  console.log('To restore: reload the page.');\n})();"
          }
        ]
      },
      {
        name: "crypto hack",
        desc: "answer questions to mine crypto. hack other players to steal their crypto.",
        cheats: [
          {
            name: "set crypto amount",
            desc: "sets your crypto balance to any value.",
            code: "// Blooket Crypto Hack \u2014 Set Crypto\n\n(function() {\n  const amount = prompt(\"Enter crypto amount:\", \"999999\");\n  if (!amount) return;\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.crypto !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ crypto: parseInt(amount) });\n      }\n      console.log('[shrimpify] Crypto set to ' + amount);\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          },
          {
            name: "always hack successfully",
            desc: "every hack attempt on another player succeeds with maximum steal.",
            code: "// Blooket Crypto Hack \u2014 Always Succeed\n\nMath.random = () => 0.99;\nconsole.log('[shrimpify] Hack success rate maximized.');"
          }
        ]
      },
      {
        name: "battle royale",
        desc: "last player standing. answer correctly to deal damage.",
        cheats: [
          {
            name: "auto-answer",
            desc: "attempts to auto-select the correct answer for each question.",
            code: "// Blooket Battle Royale \u2014 Auto Answer\n\n(function() {\n  const observer = new MutationObserver(() => {\n    const answerButtons = document.querySelectorAll('[class*=\"answerContainer\"]');\n    if (answerButtons.length > 0) {\n      console.log('[shrimpify] Found ' + answerButtons.length + ' answer buttons.');\n      // Look for the correct answer highlight\n      answerButtons.forEach(btn => {\n        if (btn.dataset?.correct === 'true') {\n          btn.click();\n          console.log('[shrimpify] Clicked correct answer.');\n        }\n      });\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n  console.log('[shrimpify] Auto-answer observer active.');\n})();"
          }
        ]
      },
      {
        name: "tower defense",
        desc: "build towers to defend against enemy blooks. answer to earn more towers.",
        cheats: [
          {
            name: "max towers + cash",
            desc: "gives you maximum in-game currency to buy any tower.",
            code: "// Blooket Tower Defense \u2014 Max Cash\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && (s.cash !== undefined || s.money !== undefined)) {\n      const key = s.cash !== undefined ? 'cash' : 'money';\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ [key]: 999999 });\n      }\n      console.log('[shrimpify] Cash set to 999999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "cafe",
        desc: "run a cafe by answering questions to serve customers and earn cash.",
        cheats: [
          {
            name: "max cash",
            desc: "sets your cafe cash to a high value.",
            code: "// Blooket Cafe \u2014 Max Cash\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.cash !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ cash: 999999 });\n      }\n      console.log('[shrimpify] Cafe cash set to 999999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "factory",
        desc: "build a factory, answer questions to produce items and earn cash.",
        cheats: [
          {
            name: "max cash + resources",
            desc: "maxes out your factory cash.",
            code: "// Blooket Factory \u2014 Max Cash\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.cash !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ cash: 999999 });\n      }\n      console.log('[shrimpify] Factory cash maxed.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "racing",
        desc: "race other players -- answer correctly to move forward.",
        cheats: [
          {
            name: "instant finish",
            desc: "jumps your progress to the finish line.",
            code: "// Blooket Racing \u2014 Instant Finish\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.progress !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ progress: 100 });\n      }\n      console.log('[shrimpify] Progress set to 100%.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "tower of doom",
        desc: "climb the tower by answering questions. use abilities to sabotage others.",
        cheats: [
          {
            name: "max health",
            desc: "sets your health to maximum so you can't die.",
            code: "// Blooket Tower of Doom \u2014 Max Health\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.memoizedState || fiber.stateNode?.state;\n    if (s && s.health !== undefined) {\n      if (fiber.stateNode?.setState) {\n        fiber.stateNode.setState({ health: 999 });\n      }\n      console.log('[shrimpify] Health set to 999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "crazy kingdom",
        desc: "manage a kingdom -- answer questions to earn resources and make decisions.",
        cheats: [
          {
            name: "max resources",
            desc: "maxes out all kingdom resources.",
            code: "// Blooket Crazy Kingdom \u2014 Max Resources\n\n(function() {\n  const stateNode = document.querySelector('#app')?.__reactFiber$;\n  let fiber = stateNode;\n  while (fiber) {\n    const s = fiber.stateNode?.state;\n    if (s && (s.gold !== undefined || s.people !== undefined)) {\n      const updates = {};\n      if (s.gold !== undefined) updates.gold = 999999;\n      if (s.people !== undefined) updates.people = 999999;\n      if (s.happiness !== undefined) updates.happiness = 100;\n      fiber.stateNode.setState(updates);\n      console.log('[shrimpify] Kingdom resources maxed.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "fishing frenzy",
        desc: "catch fish by answering questions. rare fish are worth more.",
        cheats: [
          {
            name: "always rare fish",
            desc: "every catch will be a rare/legendary fish.",
            code: "// Blooket Fishing Frenzy \u2014 Always Rare\n\nMath.random = () => 0.99;\nconsole.log('[shrimpify] Fishing RNG overridden \u2014 always rare catches.');"
          },
          {
            name: "max weight",
            desc: "sets your total fish weight to maximum.",
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
    desc: "auto-answer and money cheats for all Gimkit gamemodes.",
    manual: [
      "1. join a Gimkit game at gimkit.com/join with your code.",
      "2. wait until you're in the actual game (questions loading).",
      "3. open browser console (F12 \u2192 console).",
      "4. paste the script for your gamemode and press enter.",
      "5. Gimkit uses React \u2014 scripts modify the client-side state.",
      "NOTE: Gimkit has been known to update frequently. if a script stops working, the state property names may have changed."
    ],
    gamemodes: [
      {
        name: "classic",
        desc: "answer questions to earn in-game money. buy upgrades to earn faster.",
        cheats: [
          {
            name: "set money",
            desc: "sets your money to any amount.",
            code: "// Gimkit Classic \u2014 Set Money\n\n(function() {\n  const amount = prompt(\"Enter money amount:\", \"999999\");\n  if (!amount) return;\n  \n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] Could not find React root.'); return; }\n  \n  let fiber = root[key];\n  while (fiber) {\n    const s = fiber.memoizedState;\n    if (s && typeof s === 'object' && s.money !== undefined) {\n      s.money = parseInt(amount);\n      console.log('[shrimpify] Money set to ' + amount);\n      break;\n    }\n    fiber = fiber.return || fiber.child;\n  }\n})();"
          },
          {
            name: "auto-answer",
            desc: "watches for questions and auto-clicks the correct answer.",
            code: "// Gimkit Classic \u2014 Auto Answer\n\n(function() {\n  console.log('[shrimpify] Auto-answer active. Watching for questions...');\n  \n  const observer = new MutationObserver(() => {\n    const choices = document.querySelectorAll('[class*=\"choice\"], [class*=\"answer\"]');\n    if (choices.length >= 2) {\n      console.log('[shrimpify] Found ' + choices.length + ' choices.');\n    }\n  });\n  \n  observer.observe(document.body, { childList: true, subtree: true });\n})();"
          }
        ]
      },
      {
        name: "team mode",
        desc: "same as classic but in teams. pool money together.",
        cheats: [
          {
            name: "set money (team)",
            desc: "works the same as classic -- sets your individual contribution.",
            code: "// Gimkit Team Mode \u2014 same as Classic money hack.\nconsole.log('[shrimpify] Use the Classic Set Money script \u2014 it works in Team Mode too.');"
          }
        ]
      },
      {
        name: "trust no one",
        desc: "Among Us-style -- complete tasks (questions) and find the impostor.",
        cheats: [
          {
            name: "see impostor",
            desc: "attempts to reveal who the impostor is by reading game state.",
            code: "// Gimkit Trust No One \u2014 See Impostor\n\n(function() {\n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] React root not found.'); return; }\n  \n  let fiber = root[key];\n  const checked = new Set();\n  function walk(f) {\n    if (!f || checked.has(f)) return;\n    checked.add(f);\n    const s = f.memoizedState || f.stateNode?.state || f.memoizedProps;\n    if (s) {\n      const str = JSON.stringify(s);\n      if (str.includes('impostor') || str.includes('imposter') || str.includes('role')) {\n        console.log('[shrimpify] Possible role data found:', s);\n      }\n    }\n    walk(f.child);\n    walk(f.sibling);\n  }\n  walk(fiber);\n  console.log('[shrimpify] Scan complete. Check above for role data.');\n})();"
          },
          {
            name: "auto-complete tasks",
            desc: "auto-answers task questions as they appear.",
            code: "// Gimkit Trust No One \u2014 Auto Tasks\n\n(function() {\n  const observer = new MutationObserver(() => {\n    const choices = document.querySelectorAll('[class*=\"choice\"], [class*=\"answer\"]');\n    if (choices.length >= 2) {\n      console.log('[shrimpify] Task question detected with ' + choices.length + ' choices.');\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n  console.log('[shrimpify] Auto-task watcher active.');\n})();"
          }
        ]
      },
      {
        name: "the floor is lava",
        desc: "answer questions to stay on platforms. wrong answers drop you into lava.",
        cheats: [
          {
            name: "infinite lives",
            desc: "prevents you from dying when you fall.",
            code: "// Gimkit Floor is Lava \u2014 Infinite Lives\n\n(function() {\n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] React root not found.'); return; }\n  \n  let fiber = root[key];\n  while (fiber) {\n    const s = fiber.stateNode?.state;\n    if (s && s.lives !== undefined) {\n      fiber.stateNode.setState({ lives: 999 });\n      console.log('[shrimpify] Lives set to 999.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "humans vs zombies",
        desc: "survive the zombie horde by answering questions. wrong = get infected.",
        cheats: [
          {
            name: "stay human",
            desc: "prevents you from being turned into a zombie.",
            code: "// Gimkit HvZ \u2014 Stay Human\n\n(function() {\n  const root = document.querySelector('#app') || document.querySelector('[id*=root]');\n  const key = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));\n  if (!root || !key) { console.log('[shrimpify] React root not found.'); return; }\n  \n  let fiber = root[key];\n  while (fiber) {\n    const s = fiber.stateNode?.state;\n    if (s && (s.isZombie !== undefined || s.team !== undefined)) {\n      const updates = {};\n      if (s.isZombie !== undefined) updates.isZombie = false;\n      if (s.team !== undefined) updates.team = 'human';\n      fiber.stateNode.setState(updates);\n      console.log('[shrimpify] Forced human status.');\n      break;\n    }\n    fiber = fiber.return;\n  }\n})();"
          }
        ]
      },
      {
        name: "draw that",
        desc: "draw and guess game -- answer questions between rounds.",
        cheats: [
          {
            name: "auto-answer between rounds",
            desc: "auto-answers the quiz questions that appear between drawing rounds.",
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
    desc: "auto-answer and answer reveal for Quizizz games and assignments.",
    manual: [
      "1. join a Quizizz game or open an assignment.",
      "2. wait for the first question to appear.",
      "3. open browser console (F12 \u2192 console).",
      "4. paste the script and press enter.",
      "5. the script highlights the correct answer or auto-selects it.",
      "NOTE: Quizizz sometimes sends answer data with the question. the script intercepts this."
    ],
    gamemodes: [
      {
        name: "live game",
        desc: "real-time quiz against other players.",
        cheats: [
          {
            name: "answer revealer",
            desc: "highlights the correct answer with a visible border so you can click it.",
            code: "// Quizizz Answer Revealer \u2014 Live Game\n\n(function() {\n  const origFetch = window.fetch;\n  window.fetch = async function(...args) {\n    const res = await origFetch.apply(this, args);\n    try {\n      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;\n      if (url && (url.includes('/quiz') || url.includes('/game'))) {\n        const clone = res.clone();\n        clone.json().then(data => {\n          if (data?.questions || data?.data?.questions) {\n            const questions = data.questions || data.data.questions;\n            console.log('[shrimpify] Quiz data captured:', questions.length, 'questions');\n            window.__shrimpifyAnswers = questions;\n          }\n        }).catch(() => {});\n      }\n    } catch(e) {}\n    return res;\n  };\n  \n  const observer = new MutationObserver(() => {\n    if (!window.__shrimpifyAnswers) return;\n    const opts = document.querySelectorAll('[class*=\"option\"], [class*=\"answer\"]');\n    if (opts.length > 0) {\n      console.log('[shrimpify] Answer options detected on page.');\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n  \n  console.log('[shrimpify] Quizizz answer revealer active.');\n})();"
          },
          {
            name: "auto-answer",
            desc: "automatically clicks the correct answer as fast as possible.",
            code: "// Quizizz Auto-Answer \u2014 Live Game\n\n(function() {\n  const origFetch = window.fetch;\n  let answers = [];\n  let qIndex = 0;\n  \n  window.fetch = async function(...args) {\n    const res = await origFetch.apply(this, args);\n    try {\n      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;\n      if (url && (url.includes('/quiz') || url.includes('/game'))) {\n        const clone = res.clone();\n        clone.json().then(data => {\n          const qs = data?.questions || data?.data?.questions;\n          if (qs) {\n            answers = qs.map(q => q.structure?.answer || q.answer);\n            console.log('[shrimpify] Captured ' + answers.length + ' answers.');\n          }\n        }).catch(() => {});\n      }\n    } catch(e) {}\n    return res;\n  };\n  \n  console.log('[shrimpify] Quizizz auto-answer active. Answers will be captured when quiz loads.');\n})();"
          }
        ]
      },
      {
        name: "homework / assignment",
        desc: "self-paced quiz assigned as homework.",
        cheats: [
          {
            name: "answer revealer (homework)",
            desc: "same technique -- intercepts the quiz data on load. works for self-paced too.",
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
    desc: "skip videos and auto-answer Edpuzzle assignments.",
    manual: [
      "1. open your Edpuzzle assignment.",
      "2. let the video page load fully.",
      "3. open browser console (F12 \u2192 console).",
      "4. paste the script and press enter.",
      "5. the video will skip to the end, or questions will be auto-answered.",
      "NOTE: Edpuzzle tracks video watch time. the skip script marks the video as watched."
    ],
    gamemodes: [
      {
        name: "video assignment",
        desc: "watch a video and answer embedded questions.",
        cheats: [
          {
            name: "skip video",
            desc: "skips the video to the end and marks it as watched. questions still need answering.",
            code: "// Edpuzzle Video Skipper\n\n(function() {\n  const video = document.querySelector('video');\n  if (video) {\n    video.currentTime = video.duration || 9999;\n    video.playbackRate = 16;\n    console.log('[shrimpify] Video skipped to end.');\n  } else {\n    console.log('[shrimpify] No video element found. Try again after the video loads.');\n  }\n})();"
          },
          {
            name: "speed up video (16x)",
            desc: "speeds up the video to 16x so it finishes in seconds.",
            code: "// Edpuzzle Speed Up\n\n(function() {\n  const video = document.querySelector('video');\n  if (video) {\n    video.playbackRate = 16;\n    console.log('[shrimpify] Video speed set to 16x.');\n    console.log('To go even faster, run: document.querySelector(\"video\").playbackRate = 32');\n  } else {\n    console.log('[shrimpify] No video found.');\n  }\n})();"
          },
          {
            name: "answer revealer",
            desc: "fetches assignment answers from the Edpuzzle API and logs them to console.",
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
    desc: "Quizlet live answer bot and match instant solver.",
    manual: [
      "1. open Quizlet live or a Quizlet match game.",
      "2. wait for the game interface to load.",
      "3. open browser console (F12 \u2192 console).",
      "4. paste the script and press enter.",
      "5. match solver will auto-click pairs. live answer bot will highlight correct answers.",
      "NOTE: Quizlet has updated their UI many times. scripts may need tweaking."
    ],
    gamemodes: [
      {
        name: "Quizlet live",
        desc: "team-based real-time quiz game in class.",
        cheats: [
          {
            name: "answer highlighter",
            desc: "highlights which answer on your screen is correct based on the term shown.",
            code: "// Quizlet Live \u2014 Answer Highlighter\n\n(function() {\n  console.log('[shrimpify] Quizlet Live helper active.');\n  console.log('Watch the console \u2014 correct answer will be logged when a question appears.');\n  \n  const observer = new MutationObserver(() => {\n    const prompt = document.querySelector('[class*=\"prompt\"], [class*=\"question\"]');\n    const options = document.querySelectorAll('[class*=\"option\"], [class*=\"term\"]');\n    if (prompt && options.length > 0) {\n      console.log('[shrimpify] Question: ' + prompt.textContent);\n      console.log('[shrimpify] Options:', Array.from(options).map(o => o.textContent));\n    }\n  });\n  observer.observe(document.body, { childList: true, subtree: true });\n})();"
          }
        ]
      },
      {
        name: "match",
        desc: "match terms to definitions as fast as possible.",
        cheats: [
          {
            name: "instant match",
            desc: "auto-clicks all matching pairs instantly for a ~0.5s completion time.",
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

// ============================================================
//  ANATOMY SYSTEMS DATA
// ============================================================
const ANATOMY_SYSTEMS = [
  {
    id: "skeletal", name: "skeletal system", color: "#e8e0d0",
    description: "the skeletal system provides structural support, protects internal organs, and enables movement. adults have 206 bones connected by joints, ligaments, and cartilage.",
    parts: [
      { id: "skull", name: "skull (cranium)", description: "protects the brain. composed of 22 bones fused at sutures. houses the brain, eyes, and inner ears.", cx: 200, cy: 40, r: 22 },
      { id: "cervical", name: "cervical vertebrae", description: "7 vertebrae in the neck (C1-C7). C1 (atlas) supports the skull; C2 (axis) allows rotation.", path: "M200 62 L200 90" },
      { id: "clavicle", name: "clavicle (collarbone)", description: "S-shaped bone connecting sternum to scapula. most commonly fractured bone in the body.", path: "M165 98 L235 98" },
      { id: "ribcage", name: "rib cage", description: "12 pairs of ribs enclosing the thoracic cavity. 7 true ribs, 3 false ribs, 2 floating ribs.", path: "M170 105 Q200 140 230 105 M168 115 Q200 152 232 115 M168 125 Q200 162 232 125 M170 135 Q200 170 230 135" },
      { id: "sternum", name: "sternum (breastbone)", description: "flat bone at center of chest. three parts: manubrium, body, and xiphoid process.", path: "M200 98 L200 170" },
      { id: "spine-thoracic", name: "thoracic spine", description: "12 vertebrae (T1-T12) in mid-back. each attaches to a pair of ribs.", path: "M200 90 L200 180" },
      { id: "spine-lumbar", name: "lumbar spine", description: "5 large vertebrae (L1-L5) in lower back. bears most body weight. common site of back pain.", path: "M200 180 L200 240" },
      { id: "pelvis", name: "pelvis", description: "basin-shaped structure supporting spine and protecting abdominal organs. wider in females.", path: "M170 240 Q168 260 175 275 Q200 290 225 275 Q232 260 230 240 Z" },
      { id: "scapula-l", name: "scapula L (shoulder blade)", description: "triangular bone on posterior thorax. attachment for 17 muscles.", cx: 162, cy: 118, rx: 10, ry: 18 },
      { id: "scapula-r", name: "scapula R (shoulder blade)", description: "triangular bone on posterior thorax. attachment for 17 muscles.", cx: 238, cy: 118, rx: 10, ry: 18 },
      { id: "humerus-l", name: "humerus L (upper arm)", description: "long bone of upper arm. connects shoulder to elbow.", path: "M155 100 L138 188" },
      { id: "humerus-r", name: "humerus R (upper arm)", description: "long bone of upper arm. connects shoulder to elbow.", path: "M245 100 L262 188" },
      { id: "radius-ulna-l", name: "radius & ulna L (forearm)", description: "two parallel forearm bones. radius (lateral); ulna (medial). allow pronation/supination.", path: "M138 192 L128 268" },
      { id: "radius-ulna-r", name: "radius & ulna R (forearm)", description: "two parallel forearm bones. radius (lateral); ulna (medial). allow pronation/supination.", path: "M262 192 L272 268" },
      { id: "hand-l", name: "hand L", description: "27 bones: 8 carpals, 5 metacarpals, 14 phalanges. enable fine motor movements.", cx: 124, cy: 278, r: 10 },
      { id: "hand-r", name: "hand R", description: "27 bones: 8 carpals, 5 metacarpals, 14 phalanges. enable fine motor movements.", cx: 276, cy: 278, r: 10 },
      { id: "femur-l", name: "femur L (thigh bone)", description: "longest and strongest bone. connects hip to knee.", path: "M182 280 L178 380" },
      { id: "femur-r", name: "femur R (thigh bone)", description: "longest and strongest bone. connects hip to knee.", path: "M218 280 L222 380" },
      { id: "patella-l", name: "patella L (kneecap)", description: "largest sesamoid bone. protects knee joint.", cx: 177, cy: 386, r: 6 },
      { id: "patella-r", name: "patella R (kneecap)", description: "largest sesamoid bone. protects knee joint.", cx: 223, cy: 386, r: 6 },
      { id: "tibia-fibula-l", name: "tibia & fibula L", description: "tibia bears weight; fibula provides muscle attachment.", path: "M176 394 L174 486" },
      { id: "tibia-fibula-r", name: "tibia & fibula R", description: "tibia bears weight; fibula provides muscle attachment.", path: "M224 394 L226 486" },
      { id: "foot-l", name: "foot L", description: "26 bones: tarsals, metatarsals, phalanges. arches distribute body weight.", cx: 172, cy: 496, r: 10 },
      { id: "foot-r", name: "foot R", description: "26 bones: tarsals, metatarsals, phalanges. arches distribute body weight.", cx: 228, cy: 496, r: 10 }
    ]
  },
  {
    id: "muscular", name: "muscular system", color: "#c44040",
    description: "over 600 muscles enable movement, maintain posture, and generate heat. three types: skeletal (voluntary), smooth (involuntary), and cardiac. muscles make up ~40% of body weight.",
    parts: [
      { id: "trapezius", name: "trapezius", description: "large triangular upper back muscle. moves, rotates, and stabilizes the scapula.", path: "M170 78 L200 62 L230 78 L240 100 L200 115 L160 100 Z" },
      { id: "deltoid-l", name: "deltoid L", description: "shoulder cap muscle. three heads: anterior, lateral, posterior. arm abduction.", path: "M152 96 Q142 110 148 130 Q158 126 162 98 Z" },
      { id: "deltoid-r", name: "deltoid R", description: "shoulder cap muscle. three heads: anterior, lateral, posterior. arm abduction.", path: "M248 96 Q258 110 252 130 Q242 126 238 98 Z" },
      { id: "pectorals", name: "pectoralis major", description: "large fan-shaped chest muscle. adducts, flexes, and medially rotates the arm.", path: "M168 102 Q200 130 232 102 Q200 150 168 102 Z" },
      { id: "biceps-l", name: "biceps brachii L", description: "two-headed upper arm muscle. flexes elbow and supinates forearm.", path: "M148 135 Q143 160 142 188 Q152 160 152 135 Z" },
      { id: "biceps-r", name: "biceps brachii R", description: "two-headed upper arm muscle. flexes elbow and supinates forearm.", path: "M252 135 Q257 160 258 188 Q248 160 248 135 Z" },
      { id: "abdominals", name: "rectus abdominis", description: "six-pack muscle. flexes trunk and stabilizes pelvis. divided by tendinous intersections.", path: "M185 150 L185 245 L215 245 L215 150 Z" },
      { id: "obliques", name: "external obliques", description: "side abdomen muscles. enable trunk rotation and lateral flexion.", path: "M168 140 L165 230 L185 245 L185 150 Z M232 140 L235 230 L215 245 L215 150 Z" },
      { id: "quadriceps-l", name: "quadriceps L", description: "four front-thigh muscles: rectus femoris, vastus lateralis/medialis/intermedius. knee extensors.", path: "M172 270 Q168 325 172 380 Q185 325 182 270 Z" },
      { id: "quadriceps-r", name: "quadriceps R", description: "four front-thigh muscles: rectus femoris, vastus lateralis/medialis/intermedius. knee extensors.", path: "M218 270 Q222 325 228 380 Q215 325 218 270 Z" },
      { id: "hamstrings-l", name: "hamstrings L", description: "three posterior thigh muscles. flex knee and extend hip.", path: "M176 272 Q174 330 176 380 Q182 330 184 272 Z" },
      { id: "hamstrings-r", name: "hamstrings R", description: "three posterior thigh muscles. flex knee and extend hip.", path: "M216 272 Q218 330 224 380 Q226 330 224 272 Z" },
      { id: "gastrocnemius-l", name: "gastrocnemius L (calf)", description: "two-headed calf muscle. plantar flexes foot. essential for walking and jumping.", path: "M172 392 Q170 430 174 470 Q182 430 180 392 Z" },
      { id: "gastrocnemius-r", name: "gastrocnemius R (calf)", description: "two-headed calf muscle. plantar flexes foot. essential for walking and jumping.", path: "M220 392 Q222 430 226 470 Q230 430 228 392 Z" },
      { id: "gluteus", name: "gluteus maximus", description: "largest muscle in the body. extends and laterally rotates hip.", path: "M170 248 Q165 265 175 278 Q200 290 225 278 Q235 265 230 248 Z" }
    ]
  },
  {
    id: "circulatory", name: "circulatory system", color: "#cc3333",
    description: "transports blood, oxygen, nutrients, hormones, and waste. the heart beats ~100,000 times daily, pumping ~2,000 gallons through 60,000 miles of vessels.",
    parts: [
      { id: "heart", name: "heart", description: "muscular organ with 4 chambers. pumps oxygenated blood to body, deoxygenated to lungs. size of a fist.", cx: 207, cy: 142, r: 16 },
      { id: "aorta", name: "aorta", description: "largest artery (~1 inch diameter). carries oxygenated blood from left ventricle. ascending, arch, descending.", path: "M207 126 Q207 108 200 105 L200 240" },
      { id: "vena-cava", name: "vena cava", description: "two large veins returning deoxygenated blood to right atrium. superior (head/arms) and inferior (abdomen/legs).", path: "M193 80 L193 142 M193 142 L193 240" },
      { id: "pulmonary", name: "pulmonary arteries", description: "only arteries carrying deoxygenated blood. transport from right ventricle to lungs for gas exchange.", path: "M207 132 Q180 120 165 128 M207 132 Q234 120 249 128" },
      { id: "carotid", name: "carotid arteries", description: "major arteries to the brain, neck, and face. pulse felt here for heart rate.", path: "M196 98 L194 55 M204 98 L206 55" },
      { id: "subclavian-l", name: "subclavian artery L", description: "supplies blood to the left arm. branches from aortic arch.", path: "M190 105 L155 100 L140 190" },
      { id: "subclavian-r", name: "subclavian artery R", description: "supplies blood to the right arm. branches from brachiocephalic trunk.", path: "M210 105 L245 100 L260 190" },
      { id: "femoral-l", name: "femoral artery L", description: "major artery of the thigh. supplies blood to lower extremity.", path: "M188 270 L178 385" },
      { id: "femoral-r", name: "femoral artery R", description: "major artery of the thigh. supplies blood to lower extremity.", path: "M212 270 L222 385" },
      { id: "tibial-l", name: "tibial arteries L", description: "anterior and posterior tibial arteries supply lower leg and foot.", path: "M178 390 L175 490" },
      { id: "tibial-r", name: "tibial arteries R", description: "anterior and posterior tibial arteries supply lower leg and foot.", path: "M222 390 L225 490" }
    ]
  },
  {
    id: "nervous", name: "nervous system", color: "#f0c040",
    description: "the body's communication network with ~86 billion neurons. central (brain + spinal cord) and peripheral (cranial + spinal) nervous systems.",
    parts: [
      { id: "brain", name: "brain", description: "control center (~3 lbs). cerebrum (thought), cerebellum (coordination), brainstem (vital functions). uses 20% of body's oxygen.", cx: 200, cy: 38, r: 22 },
      { id: "cerebellum", name: "cerebellum", description: "\"little brain\" at base. 50% of brain's neurons. coordinates movement, balance, posture, motor learning.", cx: 200, cy: 54, r: 8 },
      { id: "spinal-cord", name: "spinal cord", description: "nerve bundle (~45 cm) from brainstem to lumbar region. 31 pairs of spinal nerves. protected by vertebral column.", path: "M200 60 L200 240" },
      { id: "brachial-plexus-l", name: "brachial plexus L", description: "nerve network (C5-T1) controlling shoulder, arm, and hand. injury causes upper limb weakness.", path: "M196 92 L155 105 L138 188 L128 268" },
      { id: "brachial-plexus-r", name: "brachial plexus R", description: "nerve network (C5-T1) controlling shoulder, arm, and hand. injury causes upper limb weakness.", path: "M204 92 L245 105 L262 188 L272 268" },
      { id: "intercostal", name: "intercostal nerves", description: "run between ribs (T1-T12). motor and sensory innervation to chest and abdominal wall.", path: "M195 110 L168 120 M195 130 L168 140 M195 150 L168 160 M205 110 L232 120 M205 130 L232 140 M205 150 L232 160" },
      { id: "lumbar-plexus", name: "lumbar plexus", description: "nerves from L1-L4 supplying lower abdomen, hip, and anterior thigh. key: femoral nerve.", path: "M198 200 L185 240 M202 200 L215 240" },
      { id: "sciatic-l", name: "sciatic nerve L", description: "longest nerve in body (~2 cm wide). runs from lower back through buttock and down leg. sciatica originates here.", path: "M186 260 L178 385 L175 490" },
      { id: "sciatic-r", name: "sciatic nerve R", description: "longest nerve in body (~2 cm wide). runs from lower back through buttock and down leg. sciatica originates here.", path: "M214 260 L222 385 L225 490" }
    ]
  },
  {
    id: "digestive", name: "digestive system", color: "#66aa44",
    description: "breaks down food into nutrients for energy, growth, and repair. the alimentary canal is ~30 feet (9m) long. complete digestion takes 24-72 hours.",
    parts: [
      { id: "mouth", name: "mouth (oral cavity)", description: "digestion begins here. teeth grind; salivary amylase starts chemical breakdown.", cx: 200, cy: 50, r: 5 },
      { id: "esophagus", name: "esophagus", description: "muscular tube (~25 cm). peristalsis pushes food to stomach in ~8 seconds.", path: "M200 56 L200 128" },
      { id: "stomach", name: "stomach", description: "J-shaped organ (~1L). HCl (pH 1.5-3.5) and pepsin churn food into chyme over 2-6 hours.", path: "M188 130 Q178 150 185 170 Q200 180 215 168 Q222 150 215 130 Z" },
      { id: "liver", name: "liver", description: "largest internal organ (~1.5 kg). 500+ functions: bile, detoxification, protein synthesis, glycogen storage.", path: "M220 120 Q245 128 252 142 Q245 155 228 152 Q218 145 220 120 Z" },
      { id: "gallbladder", name: "gallbladder", description: "pear-shaped organ beneath liver. stores/concentrates bile for fat digestion.", cx: 228, cy: 152, r: 5 },
      { id: "pancreas", name: "pancreas", description: "dual-function (15 cm). exocrine: digestive enzymes. endocrine: insulin and glucagon.", path: "M198 165 L175 170 Q168 168 168 175 L178 172" },
      { id: "small-intestine", name: "small intestine", description: "~20 ft, 3 sections: duodenum, jejunum, ileum. primary nutrient absorption. villi = ~250 m\u00B2 surface.", path: "M190 178 Q185 192 192 205 Q202 215 212 205 Q220 192 212 182 Q202 195 192 192 Q184 200 192 215 Q202 225 214 220" },
      { id: "large-intestine", name: "large intestine (colon)", description: "~5 ft. absorbs water. houses trillions of gut bacteria. ascending, transverse, descending, sigmoid.", path: "M230 185 L232 168 L168 168 L168 238 L232 238 L232 255" },
      { id: "appendix", name: "appendix", description: "small pouch (~3.5 in) on cecum. houses beneficial gut bacteria. appendicitis = inflammation.", cx: 232, cy: 195, r: 4 }
    ]
  },
  {
    id: "respiratory", name: "respiratory system", color: "#5599cc",
    description: "facilitates gas exchange: O2 in, CO2 out. 12-20 breaths/min at rest. lungs have ~300 million alveoli with ~70 m\u00B2 surface area for gas exchange.",
    parts: [
      { id: "nasal-cavity", name: "nasal cavity", description: "warms, humidifies, and filters air. contains olfactory receptors. connected to paranasal sinuses.", cx: 200, cy: 44, r: 7 },
      { id: "pharynx", name: "pharynx (throat)", description: "shared air/food passageway (~13 cm). nasopharynx, oropharynx, laryngopharynx.", path: "M200 52 L200 72" },
      { id: "larynx", name: "larynx (voice box)", description: "contains vocal cords for sound. epiglottis prevents food entering airway.", cx: 200, cy: 78, r: 5 },
      { id: "trachea", name: "trachea (windpipe)", description: "tube (~12 cm) with C-shaped cartilage rings. ciliated mucosa traps particles.", path: "M200 84 L200 112" },
      { id: "bronchi", name: "bronchi", description: "trachea divides into L and R main bronchi. further branch into bronchioles.", path: "M200 112 L178 132 M200 112 L222 132" },
      { id: "lung-l", name: "left lung", description: "2 lobes (smaller due to cardiac notch). ~150 million alveoli for gas exchange.", path: "M162 108 Q148 138 152 172 Q160 182 178 172 Q188 152 182 112 Z" },
      { id: "lung-r", name: "right lung", description: "3 lobes (larger than left). ~150 million alveoli. horizontal and oblique fissures.", path: "M238 108 Q252 138 248 172 Q240 182 222 172 Q212 152 218 112 Z" },
      { id: "diaphragm", name: "diaphragm", description: "dome-shaped muscle separating thorax from abdomen. primary breathing muscle. innervated by phrenic nerve.", path: "M152 180 Q200 200 248 180" },
      { id: "alveoli", name: "alveoli (gas exchange)", description: "tiny air sacs (0.2 mm) at bronchiole ends. O2 into blood, CO2 out. ~300 million total.", cx: 165, cy: 155, r: 6 }
    ]
  }
];
