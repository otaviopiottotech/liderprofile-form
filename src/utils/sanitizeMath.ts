export const sanitizeMathExpression = (input: string): string => {
  if (!input) return "";
  // Regular expression to match "P" patterns
  const pattern = /P\d+/g;

  // Function to remove patterns and fix the expression
  const removePatternsAndFix = (
    expression: string,
    patterns: string[]
  ): string => {
    patterns.forEach((pattern) => {
      const regex = new RegExp(`\\b${pattern}\\b`);
      expression = expression.replace(regex, "");
    });

    // Remove redundant operators
    expression = expression.replace(/(\+|\-|\*|\/)\s*(\+|\-|\*|\/)/g, "$1"); // Fix double operators
    expression = expression.replace(/(\+|\-|\*|\/)\s*\)/g, ")"); // Fix trailing operators before closing parenthesis
    expression = expression.replace(/\(\s*(\+|\-|\*|\/)/g, "("); // Fix leading operators after opening parenthesis
    expression = expression.replace(/^\s*(\+|\-|\*|\/)/, ""); // Fix leading operators at the start of the expression
    expression = expression.replace(/(\+|\-|\*|\/)\s*$/, ""); // Fix trailing operators at the end of the expression

    return expression.trim();
  };

  // Extract all patterns
  const matches = input.match(pattern);

  if (!matches) {
    return input;
  }

  // Build the sanitized expression
  const sanitized = removePatternsAndFix(input, matches);
  return sanitized;
};
