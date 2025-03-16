
import { Topic } from './types';

export const topics: Topic[] = [
  {
    id: '1',
    name: 'Arrays',
    slug: 'arrays',
    description: 'Linear data structures that store elements of the same type in contiguous memory locations.',
    icon: '📊',
    questionCount: 5,
    questions: [
      {
        id: 'arrays-1',
        title: 'Two Sum',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/two-sum/',
        difficulty: 'Easy'
      },
      {
        id: 'arrays-2',
        title: 'Best Time to Buy and Sell Stock',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        difficulty: 'Easy'
      },
      {
        id: 'arrays-3',
        title: 'Contains Duplicate',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/contains-duplicate/',
        difficulty: 'Easy'
      },
      {
        id: 'arrays-4',
        title: 'Product of Array Except Self',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/product-of-array-except-self/',
        difficulty: 'Medium'
      },
      {
        id: 'arrays-5',
        title: 'Maximum Subarray',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/maximum-subarray/',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: '2',
    name: 'Strings',
    slug: 'strings',
    description: 'Sequences of characters used to represent text.',
    icon: '🔤',
    questionCount: 4,
    questions: [
      {
        id: 'strings-1',
        title: 'Valid Anagram',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/valid-anagram/',
        difficulty: 'Easy'
      },
      {
        id: 'strings-2',
        title: 'Valid Parentheses',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/valid-parentheses/',
        difficulty: 'Easy'
      },
      {
        id: 'strings-3',
        title: 'Longest Palindromic Substring',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/longest-palindromic-substring/',
        difficulty: 'Medium'
      },
      {
        id: 'strings-4',
        title: 'Minimum Window Substring',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/minimum-window-substring/',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: '3',
    name: 'Linked Lists',
    slug: 'linked-lists',
    description: 'Linear data structures where elements are stored in nodes connected by pointers.',
    icon: '🔗',
    questionCount: 4,
    questions: [
      {
        id: 'linked-lists-1',
        title: 'Reverse Linked List',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/reverse-linked-list/',
        difficulty: 'Easy'
      },
      {
        id: 'linked-lists-2',
        title: 'Merge Two Sorted Lists',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
        difficulty: 'Easy'
      },
      {
        id: 'linked-lists-3',
        title: 'Linked List Cycle',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/linked-list-cycle/',
        difficulty: 'Easy'
      },
      {
        id: 'linked-lists-4',
        title: 'LRU Cache',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/lru-cache/',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: '4',
    name: 'Trees',
    slug: 'trees',
    description: 'Hierarchical data structures with a root node and subtrees of children nodes.',
    icon: '🌳',
    questionCount: 4,
    questions: [
      {
        id: 'trees-1',
        title: 'Maximum Depth of Binary Tree',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        difficulty: 'Easy'
      },
      {
        id: 'trees-2',
        title: 'Same Tree',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/same-tree/',
        difficulty: 'Easy'
      },
      {
        id: 'trees-3',
        title: 'Binary Tree Level Order Traversal',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        difficulty: 'Medium'
      },
      {
        id: 'trees-4',
        title: 'Serialize and Deserialize Binary Tree',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: '5',
    name: 'Dynamic Programming',
    slug: 'dynamic-programming',
    description: 'Method for solving complex problems by breaking them down into simpler subproblems.',
    icon: '🧩',
    questionCount: 5,
    questions: [
      {
        id: 'dp-1',
        title: 'Climbing Stairs',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/climbing-stairs/',
        difficulty: 'Easy'
      },
      {
        id: 'dp-2',
        title: 'House Robber',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/house-robber/',
        difficulty: 'Medium'
      },
      {
        id: 'dp-3',
        title: 'Coin Change',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/coin-change/',
        difficulty: 'Medium'
      },
      {
        id: 'dp-4',
        title: 'Longest Increasing Subsequence',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
        difficulty: 'Medium'
      },
      {
        id: 'dp-5',
        title: 'Edit Distance',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/edit-distance/',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: '6',
    name: 'Graphs',
    slug: 'graphs',
    description: 'Non-linear data structures consisting of vertices and edges.',
    icon: '📊',
    questionCount: 4,
    questions: [
      {
        id: 'graphs-1',
        title: 'Number of Islands',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/number-of-islands/',
        difficulty: 'Medium'
      },
      {
        id: 'graphs-2',
        title: 'Clone Graph',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/clone-graph/',
        difficulty: 'Medium'
      },
      {
        id: 'graphs-3',
        title: 'Course Schedule',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/course-schedule/',
        difficulty: 'Medium'
      },
      {
        id: 'graphs-4',
        title: 'Word Ladder',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/word-ladder/',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: '7',
    name: 'Heaps',
    slug: 'heaps',
    description: 'Tree-based data structures that satisfy the heap property.',
    icon: '📚',
    questionCount: 3,
    questions: [
      {
        id: 'heaps-1',
        title: 'Kth Largest Element in an Array',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        difficulty: 'Medium'
      },
      {
        id: 'heaps-2',
        title: 'Top K Frequent Elements',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/top-k-frequent-elements/',
        difficulty: 'Medium'
      },
      {
        id: 'heaps-3',
        title: 'Find Median from Data Stream',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/find-median-from-data-stream/',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: '8',
    name: 'Greedy',
    slug: 'greedy',
    description: 'Algorithms that make locally optimal choices at each stage.',
    icon: '👋',
    questionCount: 3,
    questions: [
      {
        id: 'greedy-1',
        title: 'Jump Game',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/jump-game/',
        difficulty: 'Medium'
      },
      {
        id: 'greedy-2',
        title: 'Task Scheduler',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/task-scheduler/',
        difficulty: 'Medium'
      },
      {
        id: 'greedy-3',
        title: 'Gas Station',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/gas-station/',
        difficulty: 'Medium'
      }
    ]
  }
];

export const getTopicBySlug = (slug: string): Topic | undefined => {
  return topics.find(topic => topic.slug === slug);
};

export const searchTopicsAndQuestions = (query: string) => {
  if (!query) return { topics: [], questions: [] };
  
  const lowerQuery = query.toLowerCase();
  
  const filteredTopics = topics.filter(topic => 
    topic.name.toLowerCase().includes(lowerQuery) || 
    topic.description.toLowerCase().includes(lowerQuery)
  );
  
  const questions = topics.flatMap(topic => 
    topic.questions.filter(question => 
      question.title.toLowerCase().includes(lowerQuery)
    ).map(question => ({
      ...question,
      topicSlug: topic.slug,
      topicName: topic.name
    }))
  );
  
  return { topics: filteredTopics, questions };
};
