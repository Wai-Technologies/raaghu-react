import { Meta, StoryObj } from '@storybook/react';
import RdsCompCodeSnippet from './rds-comp-code-snippet';

const sampleCodeSnippets = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snippet Example</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML snippet.</p>
</body>
</html>`,
  css: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,
  javascript: `// Example JavaScript code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate Fibonacci sequence
const sequence = [];
for (let i = 0; i < 10; i++) {
  sequence.push(fibonacci(i));
}`,
  typescript: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`,
  json: `{
  "name": "example-project",
  "version": "1.0.0",
  "description": "A sample JSON configuration",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^4.9.0",
    "jest": "^29.0.0"
  }
}`
};

const meta: Meta<typeof RdsCompCodeSnippet> = {
  title: 'Components/Code Snippet',
  component: RdsCompCodeSnippet,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: { type: 'text' },
      description: 'The code content to display',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme variant',
    },
    type: {
      control: { type: 'select' },
      options: ['singleLine', 'multiLine'],
      description: 'Snippet type',
    },
    codeLines: {
      control: { type: 'boolean' },
      description: 'Whether to show line numbers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    language: true,
    theme: "light",
    type: "multiLine",
    codeLines: false,
    sampleCodeSnippets,
  },
};