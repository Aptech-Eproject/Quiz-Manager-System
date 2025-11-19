module.exports = [
    // Quiz 1: JavaScript Fundamentals
    { questionId: 1, quizId: 1, questionText: 'What is the correct way to declare a variable in JavaScript?', questionExplain: 'Variables can be declared using var, let, or const keywords.' },
    { questionId: 2, quizId: 1, questionText: 'Which method is used to add an element to the end of an array?', questionExplain: 'The push() method adds elements to the end of an array.' },
    { questionId: 3, quizId: 1, questionText: 'What does "===" operator check in JavaScript?', questionExplain: 'The === operator checks both value and type equality.' },

    // Quiz 2: React Advanced Patterns
    { questionId: 4, quizId: 2, questionText: 'What is the purpose of useEffect hook?', questionExplain: 'useEffect handles side effects like API calls, subscriptions, and DOM manipulation.' },
    { questionId: 5, quizId: 2, questionText: 'How do you prevent unnecessary re-renders in React?', questionExplain: 'Use React.memo, useMemo, and useCallback to optimize performance.' },
    { questionId: 6, quizId: 2, questionText: 'What is the Context API used for?', questionExplain: 'Context API provides a way to pass data through component tree without props drilling.' },

    // Quiz 3: Python for Data Science
    { questionId: 7, quizId: 3, questionText: 'Which library is used for data manipulation in Python?', questionExplain: 'Pandas is the primary library for data manipulation and analysis.' },
    { questionId: 8, quizId: 3, questionText: 'What does NumPy primarily work with?', questionExplain: 'NumPy specializes in numerical operations on multi-dimensional arrays.' },
    { questionId: 9, quizId: 3, questionText: 'How do you create a DataFrame in Pandas?', questionExplain: 'Use pd.DataFrame() with a dictionary or list of data.' },

    // Quiz 4: SQL Database Essentials
    { questionId: 10, quizId: 4, questionText: 'What does SELECT * FROM table do?', questionExplain: 'Retrieves all columns from the specified table.' },
    { questionId: 11, quizId: 4, questionText: 'Which JOIN returns matching rows from both tables?', questionExplain: 'INNER JOIN returns only matching rows from both tables.' },
    { questionId: 12, quizId: 4, questionText: 'What is a PRIMARY KEY?', questionExplain: 'A PRIMARY KEY uniquely identifies each record in a table.' },

    // Quiz 5: Node.js & Express Mastery
    { questionId: 13, quizId: 5, questionText: 'What is middleware in Express?', questionExplain: 'Middleware functions have access to request, response objects and next function.' },
    { questionId: 14, quizId: 5, questionText: 'How do you handle asynchronous operations in Node.js?', questionExplain: 'Use callbacks, Promises, or async/await syntax.' },
    { questionId: 15, quizId: 5, questionText: 'What is the purpose of package.json?', questionExplain: 'It manages project dependencies and scripts.' },

    // Quiz 6: Git & Version Control
    { questionId: 16, quizId: 6, questionText: 'What command creates a new branch?', questionExplain: 'Use "git branch branch-name" or "git checkout -b branch-name".' },
    { questionId: 17, quizId: 6, questionText: 'How do you undo the last commit?', questionExplain: 'Use "git reset HEAD~1" to undo last commit while keeping changes.' },
    { questionId: 18, quizId: 6, questionText: 'What does "git merge" do?', questionExplain: 'Combines changes from different branches into current branch.' },

    // Quiz 7: TypeScript Deep Dive
    { questionId: 19, quizId: 7, questionText: 'What are generics in TypeScript?', questionExplain: 'Generics provide a way to create reusable components with type safety.' },
    { questionId: 20, quizId: 7, questionText: 'What is a type guard?', questionExplain: 'Type guards narrow down types within conditional blocks.' },
    { questionId: 21, quizId: 7, questionText: 'How do you define an interface?', questionExplain: 'Use the "interface" keyword to define object shapes.' },

    // Quiz 8: Docker & Containerization
    { questionId: 22, quizId: 8, questionText: 'What is a Docker image?', questionExplain: 'A Docker image is a read-only template for creating containers.' },
    { questionId: 23, quizId: 8, questionText: 'What command runs a container?', questionExplain: 'Use "docker run image-name" to start a container.' },
    { questionId: 24, quizId: 8, questionText: 'What is Docker Compose?', questionExplain: 'Docker Compose defines and runs multi-container applications.' },

    // Quiz 9: REST API Design
    { questionId: 25, quizId: 9, questionText: 'What HTTP method is used to create a resource?', questionExplain: 'POST method is used to create new resources.' },
    { questionId: 26, quizId: 9, questionText: 'What does status code 404 mean?', questionExplain: '404 indicates that the requested resource was not found.' },
    { questionId: 27, quizId: 9, questionText: 'What is idempotency in REST?', questionExplain: 'Idempotent operations produce same result regardless of repetition.' },

    // Quiz 10: Algorithms & Data Structures
    { questionId: 28, quizId: 10, questionText: 'What is Big O notation?', questionExplain: 'Big O describes algorithm time complexity and scalability.' },
    { questionId: 29, quizId: 10, questionText: 'What is a binary search tree?', questionExplain: 'BST is a tree where left children are smaller and right are larger.' },
    { questionId: 30, quizId: 10, questionText: 'What is the time complexity of QuickSort?', questionExplain: 'Average case is O(n log n), worst case is O(n²).' },

    // Quiz 11: Calculus
    { questionId: 31, quizId: 11, questionText: 'What is a derivative?', questionExplain: 'A derivative measures the rate of change of a function.' },
    { questionId: 32, quizId: 11, questionText: 'What is the fundamental theorem of calculus?', questionExplain: 'It links differentiation and integration as inverse operations.' },

    // Quiz 12: Quantum Physics
    { questionId: 33, quizId: 12, questionText: 'What is wave-particle duality?', questionExplain: 'Particles can exhibit both wave and particle properties.' },
    { questionId: 34, quizId: 12, questionText: 'What does Schrödinger equation describe?', questionExplain: 'It describes how quantum state evolves over time.' },

    // Quiz 13: World War II
    { questionId: 35, quizId: 13, questionText: 'When did World War II start?', questionExplain: 'WWII began on September 1, 1939 with German invasion of Poland.' },
    { questionId: 36, quizId: 13, questionText: 'What was D-Day?', questionExplain: 'D-Day was the Allied invasion of Normandy on June 6, 1944.' },

    // Quiz 14: Advanced Grammar
    { questionId: 37, quizId: 14, questionText: 'What is the subjunctive mood?', questionExplain: 'Subjunctive expresses hypothetical or contrary-to-fact situations.' },
    { questionId: 38, quizId: 14, questionText: 'What is a participle phrase?', questionExplain: 'A phrase beginning with a present or past participle.' },

    // Quiz 15: Music Theory
    { questionId: 39, quizId: 15, questionText: 'What is a major scale?', questionExplain: 'A major scale follows the pattern W-W-H-W-W-W-H.' },
    { questionId: 40, quizId: 15, questionText: 'What is a chord?', questionExplain: 'A chord is three or more notes played simultaneously.' },

    // Quiz 16: Football
    { questionId: 41, quizId: 16, questionText: 'How many players are on a football team?', questionExplain: 'Each team has 11 players on the field.' },
    { questionId: 42, quizId: 16, questionText: 'What is offside in football?', questionExplain: 'A player is offside when closer to goal line than ball and second-last opponent.' },

    // Quiz 17: Renaissance Art
    { questionId: 43, quizId: 17, questionText: 'Who painted the Mona Lisa?', questionExplain: 'Leonardo da Vinci painted the Mona Lisa around 1503-1519.' },
    { questionId: 44, quizId: 17, questionText: 'What technique creates depth in paintings?', questionExplain: 'Linear perspective creates illusion of depth on flat surface.' },

    // Quiz 18: Marketing
    { questionId: 45, quizId: 18, questionText: 'What are the 4 Ps of marketing?', questionExplain: 'Product, Price, Place, and Promotion make up the marketing mix.' },
    { questionId: 46, quizId: 18, questionText: 'What is brand positioning?', questionExplain: 'Brand positioning defines how brand differs from competitors in customer minds.' },

    // Quiz 19: Nutrition
    { questionId: 47, quizId: 19, questionText: 'What are macronutrients?', questionExplain: 'Carbohydrates, proteins, and fats are the three macronutrients.' },
    { questionId: 48, quizId: 19, questionText: 'Why is fiber important?', questionExplain: 'Fiber aids digestion and helps maintain healthy cholesterol levels.' },

    // Quiz 20: Climate Change
    { questionId: 49, quizId: 20, questionText: 'What is the greenhouse effect?', questionExplain: 'Greenhouse gases trap heat in atmosphere, warming the planet.' },
    { questionId: 50, quizId: 20, questionText: 'What is carbon footprint?', questionExplain: 'Total greenhouse gas emissions caused by individual, organization, or product.' }
];