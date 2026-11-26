/**
 * ESLint rule to forbid Bootstrap utility class names
 * RDS-069: Replace Bootstrap classes with rds-* classes or MUI components
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid Bootstrap utility class names',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      bootstrapClass: 'Bootstrap utility class "{{className}}" is forbidden. Use MUI Stack, Box, or rds-* classes instead.',
    },
    schema: [],
  },
  create(context) {
    const bootstrapPatterns = [
      /^d-flex$/,
      /^d-block$/,
      /^d-inline$/,
      /^d-inline-block$/,
      /^d-none$/,
      /^d-grid$/,
      
      /^row$/,
      /^col$/,
      /^col-\d+$/,
      /^col-(sm|md|lg|xl|xxl)(-\d+)?$/,
      /^container$/,
      /^container-fluid$/,
      
      /^flex-row$/,
      /^flex-column$/,
      /^flex-row-reverse$/,
      /^flex-column-reverse$/,
      /^justify-content-(start|end|center|between|around|evenly)$/,
      /^align-items-(start|end|center|baseline|stretch)$/,
      /^align-self-(start|end|center|baseline|stretch)$/,
      
      /^[mp][tblrxy]?-[0-5]$/,  // mt-3, px-2, etc.
      /^[mp][tblrxy]?-auto$/,
      /^mb-\d+$/,
      /^mt-\d+$/,
      /^ms-\d+$/,
      /^me-\d+$/,
      /^ps-\d+$/,
      /^pe-\d+$/,
      /^pt-\d+$/,
      /^pb-\d+$/,
      
      /^text-(start|end|center|left|right|justify)$/,
      /^text-(lowercase|uppercase|capitalize)$/,
      
      /^fw-(bold|bolder|normal|light|lighter)$/,
      
      /^w-\d+$/,
      /^w-100$/,
      /^w-auto$/,
      /^h-\d+$/,
      /^h-100$/,
      /^h-auto$/,
      /^mw-\d+$/,
      /^mh-\d+$/,
    ];
    
    function checkClassName(node, value) {
      if (typeof value !== 'string') return;
      
      const classes = value.split(/\s+/);
      
      for (const className of classes) {
        for (const pattern of bootstrapPatterns) {
          if (pattern.test(className)) {
            context.report({
              node,
              messageId: 'bootstrapClass',
              data: {
                className,
              },
            });
          }
        }
      }
    }
    
    return {
      JSXAttribute(node) {
        if (node.name.name === 'className' && node.value) {
          if (node.value.type === 'Literal') {
            checkClassName(node.value, node.value.value);
          } else if (node.value.type === 'JSXExpressionContainer') {
            const expr = node.value.expression;
            if (expr.type === 'Literal' && typeof expr.value === 'string') {
              checkClassName(expr, expr.value);
            }
            if (expr.type === 'TemplateLiteral') {
              expr.quasis.forEach(quasi => {
                checkClassName(quasi, quasi.value.cooked);
              });
            }
          }
        }
      },
    };
  },
};
