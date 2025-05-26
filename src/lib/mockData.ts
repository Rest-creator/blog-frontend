export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  createdAt: string;
  readingTime: number;
  tags: string[];
  author: Author;
  likes: number;
  comments: number;
}

export const authors: Author[] = [
  {
    id: "1",
    name: "Tendai Mutasa",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Full-stack developer passionate about web technologies and UX design.",
  },
  {
    id: "2",
    name: "Chiedza Moyo",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Tech writer and UI/UX designer with 5+ years of experience.",
  },
  {
    id: "3",
    name: "Tafadzwa Nyamande",
    avatar: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Software engineer specialized in machine learning and AI.",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt: "Discover the emerging technologies and methodologies that will shape web development in the coming year.",
    content: `
# The Future of Web Development: Trends to Watch in 2023

Web development continues to evolve at a rapid pace, driven by technological innovations, changing user expectations, and the need for more efficient development workflows. As we move further into 2023, several key trends are emerging that will shape the future of web development.

## 1. WebAssembly Going Mainstream

WebAssembly (Wasm) is finally breaking into the mainstream after years of promise. This binary instruction format provides a way to run code written in languages like C, C++, and Rust at near-native speed in the browser. In 2023, we're seeing increased adoption as more developers leverage Wasm for performance-critical web applications.

## 2. AI-Assisted Development

AI tools are transforming the development process itself. From GitHub Copilot's code suggestions to AI-powered testing and debugging tools, developers are increasingly collaborating with AI to write better code faster. This trend is only accelerating as the underlying models become more sophisticated.

## 3. The Rise of Edge Computing

Edge computing is moving processing closer to where data is created, reducing latency and improving performance. Platforms like Cloudflare Workers, Vercel Edge Functions, and Netlify Edge are making it easier to deploy code that runs on edge networks around the world, enabling new types of responsive, global applications.

## 4. Headless Architecture Dominance

Headless architecture, which separates the frontend presentation layer from the backend data functionality, continues to gain popularity. This approach provides flexibility, enabling developers to use their preferred frontend frameworks while connecting to various backend services and APIs.

## 5. Enhanced Web Accessibility

As regulations tighten and awareness grows, web accessibility is becoming a priority rather than an afterthought. Developers are incorporating accessibility considerations into the earliest stages of design and development, supported by improved tools and frameworks that make creating accessible websites easier.

## Conclusion

The web development landscape in 2023 is characterized by a focus on performance, efficiency, and inclusivity. By staying aware of these trends and selectively adopting new technologies and approaches, developers can create better web experiences while streamlining their workflows.
    `,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=600&q=80",
    createdAt: "2023-09-15T08:30:00Z",
    readingTime: 5,
    tags: ["Web Development", "Technology", "Programming"],
    author: authors[0],
    likes: 145,
    comments: 32,
  },
  {
    id: "2",
    title: "Designing Effective User Interfaces: Principles and Practices",
    excerpt: "Learn the key principles that make user interfaces both beautiful and functional.",
    content: `
# Designing Effective User Interfaces: Principles and Practices

Creating user interfaces that are both aesthetically pleasing and highly functional requires a deep understanding of design principles, user psychology, and technical constraints. This article explores the fundamental principles that guide effective UI design.

## Clarity is King

The most important quality of an effective user interface is clarity. Users should immediately understand what they can do and how they can do it. This means:

- Using familiar patterns and conventions
- Providing clear, concise labels
- Organizing information hierarchically
- Eliminating unnecessary elements

## Feedback and Responsiveness

Users need to know when their actions have been registered and what the results of those actions are. Effective interfaces provide immediate feedback through:

- Visual changes (highlighting, color changes)
- Animations that indicate state transitions
- Loading indicators for longer processes
- Success or error messages when appropriate

## Consistency Creates Comfort

Consistency within an interface builds user confidence and reduces cognitive load. This applies to:

- Visual design (colors, typography, spacing)
- Interaction patterns (how similar controls behave)
- Language and terminology
- Layout and navigation structures

## Accessibility is Essential

Good interfaces work for everyone, including users with disabilities. Key accessibility considerations include:

- Sufficient color contrast
- Support for screen readers
- Keyboard navigation options
- Resizable text and responsive layouts

## Conclusion

Designing effective user interfaces is both an art and a science. By focusing on clarity, feedback, consistency, and accessibility, designers can create interfaces that not only look good but also genuinely enhance the user experience.
    `,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=600&q=80",
    createdAt: "2023-09-10T14:45:00Z",
    readingTime: 6,
    tags: ["Design", "UI/UX", "Web Development"],
    author: authors[1],
    likes: 213,
    comments: 45,
  },
  {
    id: "3",
    title: "Introduction to Machine Learning for Developers",
    excerpt: "A developer-friendly introduction to the core concepts of machine learning.",
    content: `
# Introduction to Machine Learning for Developers

Machine learning can seem intimidating to developers without a strong mathematics background, but many of the core concepts are accessible with some foundational understanding. This article aims to introduce machine learning from a developer's perspective.

## What is Machine Learning?

At its core, machine learning is about creating systems that can learn from data rather than being explicitly programmed. Instead of writing rules to solve a problem, you provide examples and let the computer figure out the patterns.

## Key Concepts

### Supervised Learning

In supervised learning, the algorithm learns from labeled examples. It's like learning with an answer key:

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

# Create and train a model
model = RandomForestClassifier()
model.fit(training_data, training_labels)

# Make predictions
predictions = model.predict(new_data)
\`\`\`

### Unsupervised Learning

Unsupervised learning works with unlabeled data, finding patterns and structures without guidance:

\`\`\`python
from sklearn.cluster import KMeans

# Create and train a clustering model
model = KMeans(n_clusters=3)
model.fit(data)

# Get cluster assignments
clusters = model.predict(data)
\`\`\`

### The Training Process

Training a model involves:
1. Preparing and cleaning your data
2. Splitting into training and testing sets
3. Selecting an appropriate algorithm
4. Training the model on training data
5. Evaluating performance on testing data
6. Tuning parameters to improve results

## Getting Started as a Developer

The good news is that you don't need to implement algorithms from scratch. Libraries like scikit-learn (Python), TensorFlow, and PyTorch provide accessible APIs for common machine learning tasks.

## Conclusion

While mastering machine learning takes time, the barrier to entry for developers is lower than ever. Start with simple projects using established libraries, focus on understanding your data, and gradually build your intuition for how different algorithms behave.
    `,
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&h=600&q=80",
    createdAt: "2023-09-05T11:20:00Z",
    readingTime: 8,
    tags: ["Machine Learning", "AI", "Programming"],
    author: authors[2],
    likes: 187,
    comments: 28,
  },
  {
    id: "4",
    title: "Optimizing React Performance: Advanced Techniques",
    excerpt: "Learn how to identify and fix performance bottlenecks in your React applications.",
    content: "This is a placeholder for the full article content about React performance optimization.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&h=600&q=80",
    createdAt: "2023-08-28T09:15:00Z",
    readingTime: 7,
    tags: ["React", "JavaScript", "Performance"],
    author: authors[0],
    likes: 156,
    comments: 37,
  },
  {
    id: "5",
    title: "CSS Grid Layout: A Comprehensive Guide",
    excerpt: "Master CSS Grid Layout with this detailed walkthrough of its features and capabilities.",
    content: "This is a placeholder for the full article content about CSS Grid Layout.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=600&q=80",
    createdAt: "2023-08-22T16:40:00Z",
    readingTime: 6,
    tags: ["CSS", "Web Development", "Design"],
    author: authors[1],
    likes: 132,
    comments: 24,
  },
  {
    id: "6",
    title: "Building RESTful APIs with Node.js and Express",
    excerpt: "A step-by-step guide to creating robust and scalable RESTful APIs.",
    content: "This is a placeholder for the full article content about building RESTful APIs.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=600&q=80",
    createdAt: "2023-08-15T13:55:00Z",
    readingTime: 9,
    tags: ["Node.js", "API", "Backend", "JavaScript"],
    author: authors[2],
    likes: 168,
    comments: 41,
  },
];
