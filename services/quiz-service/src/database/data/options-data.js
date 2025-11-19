module.exports = [
    // Question 1
    { optionId: 1, questionId: 1, optionText: 'var x = 5;', isTrueOption: true },
    { optionId: 2, questionId: 1, optionText: 'variable x = 5;', isTrueOption: false },
    { optionId: 3, questionId: 1, optionText: 'x := 5;', isTrueOption: false },
    { optionId: 4, questionId: 1, optionText: 'declare x = 5;', isTrueOption: false },

    // Question 2
    { optionId: 5, questionId: 2, optionText: 'array.push(element)', isTrueOption: true },
    { optionId: 6, questionId: 2, optionText: 'array.add(element)', isTrueOption: false },
    { optionId: 7, questionId: 2, optionText: 'array.append(element)', isTrueOption: false },
    { optionId: 8, questionId: 2, optionText: 'array.insert(element)', isTrueOption: false },

    // Question 3
    { optionId: 9, questionId: 3, optionText: 'Value and type equality', isTrueOption: true },
    { optionId: 10, questionId: 3, optionText: 'Only value equality', isTrueOption: false },
    { optionId: 11, questionId: 3, optionText: 'Only type equality', isTrueOption: false },

    // Question 4
    { optionId: 12, questionId: 4, optionText: 'Handle side effects', isTrueOption: true },
    { optionId: 13, questionId: 4, optionText: 'Manage state', isTrueOption: false },
    { optionId: 14, questionId: 4, optionText: 'Create components', isTrueOption: false },

    // Question 5
    { optionId: 15, questionId: 5, optionText: 'React.memo and useMemo', isTrueOption: true },
    { optionId: 16, questionId: 5, optionText: 'useState only', isTrueOption: false },
    { optionId: 17, questionId: 5, optionText: 'useEffect only', isTrueOption: false },

    // Question 6
    { optionId: 18, questionId: 6, optionText: 'Avoid props drilling', isTrueOption: true },
    { optionId: 19, questionId: 6, optionText: 'Handle state', isTrueOption: false },
    { optionId: 20, questionId: 6, optionText: 'Create routes', isTrueOption: false },

    // Question 7
    { optionId: 21, questionId: 7, optionText: 'Pandas', isTrueOption: true },
    { optionId: 22, questionId: 7, optionText: 'NumPy', isTrueOption: false },
    { optionId: 23, questionId: 7, optionText: 'Matplotlib', isTrueOption: false },

    // Question 8
    { optionId: 24, questionId: 8, optionText: 'Multi-dimensional arrays', isTrueOption: true },
    { optionId: 25, questionId: 8, optionText: 'DataFrames', isTrueOption: false },
    { optionId: 26, questionId: 8, optionText: 'Plots', isTrueOption: false },

    // Question 9
    { optionId: 27, questionId: 9, optionText: 'pd.DataFrame()', isTrueOption: true },
    { optionId: 28, questionId: 9, optionText: 'pd.createDF()', isTrueOption: false },
    { optionId: 29, questionId: 9, optionText: 'pd.newFrame()', isTrueOption: false },

    // Question 10
    { optionId: 30, questionId: 10, optionText: 'Retrieves all columns', isTrueOption: true },
    { optionId: 31, questionId: 10, optionText: 'Deletes all rows', isTrueOption: false },
    { optionId: 32, questionId: 10, optionText: 'Creates new table', isTrueOption: false },

    // Question 11
    { optionId: 33, questionId: 11, optionText: 'INNER JOIN', isTrueOption: true },
    { optionId: 34, questionId: 11, optionText: 'LEFT JOIN', isTrueOption: false },
    { optionId: 35, questionId: 11, optionText: 'OUTER JOIN', isTrueOption: false },

    // Question 12
    { optionId: 36, questionId: 12, optionText: 'Unique identifier', isTrueOption: true },
    { optionId: 37, questionId: 12, optionText: 'Foreign key reference', isTrueOption: false },
    { optionId: 38, questionId: 12, optionText: 'Optional field', isTrueOption: false },

    // Question 13
    { optionId: 39, questionId: 13, optionText: 'Functions with access to req, res, next', isTrueOption: true },
    { optionId: 40, questionId: 13, optionText: 'Database connection', isTrueOption: false },
    { optionId: 41, questionId: 13, optionText: 'Template engine', isTrueOption: false },

    // Question 14
    { optionId: 42, questionId: 14, optionText: 'Callbacks, Promises, async/await', isTrueOption: true },
    { optionId: 43, questionId: 14, optionText: 'Threads', isTrueOption: false },
    { optionId: 44, questionId: 14, optionText: 'Synchronous only', isTrueOption: false },

    // Question 15
    { optionId: 45, questionId: 15, optionText: 'Manages dependencies', isTrueOption: true },
    { optionId: 46, questionId: 15, optionText: 'Stores code', isTrueOption: false },
    { optionId: 47, questionId: 15, optionText: 'Compiles project', isTrueOption: false },

    // Question 16
    { optionId: 48, questionId: 16, optionText: 'git branch branch-name', isTrueOption: true },
    { optionId: 49, questionId: 16, optionText: 'git new branch-name', isTrueOption: false },
    { optionId: 50, questionId: 16, optionText: 'git create branch-name', isTrueOption: false },

    // Question 17
    { optionId: 51, questionId: 17, optionText: 'git reset HEAD~1', isTrueOption: true },
    { optionId: 52, questionId: 17, optionText: 'git undo', isTrueOption: false },
    { optionId: 53, questionId: 17, optionText: 'git remove commit', isTrueOption: false },

    // Question 18
    { optionId: 54, questionId: 18, optionText: 'Combines branches', isTrueOption: true },
    { optionId: 55, questionId: 18, optionText: 'Deletes branch', isTrueOption: false },
    { optionId: 56, questionId: 18, optionText: 'Creates commit', isTrueOption: false },

    // Question 19
    { optionId: 57, questionId: 19, optionText: 'Reusable type-safe components', isTrueOption: true },
    { optionId: 58, questionId: 19, optionText: 'Generic functions only', isTrueOption: false },
    { optionId: 59, questionId: 19, optionText: 'Type annotations', isTrueOption: false },

    // Question 20
    { optionId: 60, questionId: 20, optionText: 'Narrows down types', isTrueOption: true },
    { optionId: 61, questionId: 20, optionText: 'Protects variables', isTrueOption: false },
    { optionId: 62, questionId: 20, optionText: 'Guards against null', isTrueOption: false },

    // Question 21
    { optionId: 63, questionId: 21, optionText: 'interface keyword', isTrueOption: true },
    { optionId: 64, questionId: 21, optionText: 'class keyword', isTrueOption: false },
    { optionId: 65, questionId: 21, optionText: 'type keyword only', isTrueOption: false },

    // Question 22
    { optionId: 66, questionId: 22, optionText: 'Read-only template', isTrueOption: true },
    { optionId: 67, questionId: 22, optionText: 'Running container', isTrueOption: false },
    { optionId: 68, questionId: 22, optionText: 'Configuration file', isTrueOption: false },

    // Question 23
    { optionId: 69, questionId: 23, optionText: 'docker run image-name', isTrueOption: true },
    { optionId: 70, questionId: 23, optionText: 'docker start image-name', isTrueOption: false },
    { optionId: 71, questionId: 23, optionText: 'docker execute image-name', isTrueOption: false },

    // Question 24
    { optionId: 72, questionId: 24, optionText: 'Multi-container tool', isTrueOption: true },
    { optionId: 73, questionId: 24, optionText: 'Image builder', isTrueOption: false },
    { optionId: 74, questionId: 24, optionText: 'Container monitor', isTrueOption: false },

    // Question 25
    { optionId: 75, questionId: 25, optionText: 'POST', isTrueOption: true },
    { optionId: 76, questionId: 25, optionText: 'GET', isTrueOption: false },
    { optionId: 77, questionId: 25, optionText: 'PUT', isTrueOption: false },

    // Question 26
    { optionId: 78, questionId: 26, optionText: 'Resource not found', isTrueOption: true },
    { optionId: 79, questionId: 26, optionText: 'Server error', isTrueOption: false },
    { optionId: 80, questionId: 26, optionText: 'Unauthorized', isTrueOption: false },

    // Question 27
    { optionId: 81, questionId: 27, optionText: 'Same result regardless of repetition', isTrueOption: true },
    { optionId: 82, questionId: 27, optionText: 'Operations are fast', isTrueOption: false },
    { optionId: 83, questionId: 27, optionText: 'Operations are secure', isTrueOption: false },

    // Question 28
    { optionId: 84, questionId: 28, optionText: 'Algorithm time complexity', isTrueOption: true },
    { optionId: 85, questionId: 28, optionText: 'Code quality metric', isTrueOption: false },
    { optionId: 86, questionId: 28, optionText: 'Memory usage only', isTrueOption: false },

    // Question 29
    { optionId: 87, questionId: 29, optionText: 'Left smaller, right larger', isTrueOption: true },
    { optionId: 88, questionId: 29, optionText: 'Random order', isTrueOption: false },
    { optionId: 89, questionId: 29, optionText: 'Alphabetical order', isTrueOption: false },

    // Question 30
    { optionId: 90, questionId: 30, optionText: 'O(n log n) average', isTrueOption: true },
    { optionId: 91, questionId: 30, optionText: 'O(n) always', isTrueOption: false },
    { optionId: 92, questionId: 30, optionText: 'O(1) always', isTrueOption: false },

    // Question 31
    { optionId: 93, questionId: 31, optionText: 'Rate of change', isTrueOption: true },
    { optionId: 94, questionId: 31, optionText: 'Area under curve', isTrueOption: false },
    { optionId: 95, questionId: 31, optionText: 'Maximum value', isTrueOption: false },

    // Question 32
    { optionId: 96, questionId: 32, optionText: 'Links differentiation and integration', isTrueOption: true },
    { optionId: 97, questionId: 32, optionText: 'Defines limits', isTrueOption: false },
    { optionId: 98, questionId: 32, optionText: 'Solves equations', isTrueOption: false },

    // Question 33
    { optionId: 99, questionId: 33, optionText: 'Particles exhibit wave and particle properties', isTrueOption: true },
    { optionId: 100, questionId: 33, optionText: 'Waves become particles', isTrueOption: false },
    { optionId: 101, questionId: 33, optionText: 'Energy equals mass', isTrueOption: false },

    // Question 34
    { optionId: 102, questionId: 34, optionText: 'Quantum state evolution', isTrueOption: true },
    { optionId: 103, questionId: 34, optionText: 'Classical mechanics', isTrueOption: false },
    { optionId: 104, questionId: 34, optionText: 'Relativity theory', isTrueOption: false },

    // Question 35
    { optionId: 105, questionId: 35, optionText: 'September 1, 1939', isTrueOption: true },
    { optionId: 106, questionId: 35, optionText: 'December 7, 1941', isTrueOption: false },
    { optionId: 107, questionId: 35, optionText: 'June 6, 1944', isTrueOption: false },

    // Question 36
    { optionId: 108, questionId: 36, optionText: 'Allied invasion of Normandy', isTrueOption: true },
    { optionId: 109, questionId: 36, optionText: 'Pearl Harbor attack', isTrueOption: false },
    { optionId: 110, questionId: 36, optionText: 'Battle of Stalingrad', isTrueOption: false },

    // Question 37
    { optionId: 111, questionId: 37, optionText: 'Expresses hypothetical situations', isTrueOption: true },
    { optionId: 112, questionId: 37, optionText: 'States facts', isTrueOption: false },
    { optionId: 113, questionId: 37, optionText: 'Gives commands', isTrueOption: false },

    // Question 38
    { optionId: 114, questionId: 38, optionText: 'Phrase beginning with participle', isTrueOption: true },
    { optionId: 115, questionId: 38, optionText: 'Complete sentence', isTrueOption: false },
    { optionId: 116, questionId: 38, optionText: 'Independent clause', isTrueOption: false },

    // Question 39
    { optionId: 117, questionId: 39, optionText: 'W-W-H-W-W-W-H pattern', isTrueOption: true },
    { optionId: 118, questionId: 39, optionText: 'W-H-W-W-H-W-W pattern', isTrueOption: false },
    { optionId: 119, questionId: 39, optionText: 'H-W-H-W-H-W-H pattern', isTrueOption: false },

    // Question 40
    { optionId: 120, questionId: 40, optionText: 'Three or more notes played together', isTrueOption: true },
    { optionId: 121, questionId: 40, optionText: 'Two notes played together', isTrueOption: false },
    { optionId: 122, questionId: 40, optionText: 'Single note held long', isTrueOption: false },

    // Question 41
    { optionId: 123, questionId: 41, optionText: '11 players', isTrueOption: true },
    { optionId: 124, questionId: 41, optionText: '10 players', isTrueOption: false },
    { optionId: 125, questionId: 41, optionText: '12 players', isTrueOption: false },

    // Question 42
    { optionId: 126, questionId: 42, optionText: 'Closer to goal than ball and second-last opponent', isTrueOption: true },
    { optionId: 127, questionId: 42, optionText: 'Behind all defenders', isTrueOption: false },
    { optionId: 128, questionId: 42, optionText: 'Outside penalty box', isTrueOption: false },

    // Question 43
    { optionId: 129, questionId: 43, optionText: 'Leonardo da Vinci', isTrueOption: true },
    { optionId: 130, questionId: 43, optionText: 'Michelangelo', isTrueOption: false },
    { optionId: 131, questionId: 43, optionText: 'Raphael', isTrueOption: false },

    // Question 44
    { optionId: 132, questionId: 44, optionText: 'Linear perspective', isTrueOption: true },
    { optionId: 133, questionId: 44, optionText: 'Chiaroscuro only', isTrueOption: false },
    { optionId: 134, questionId: 44, optionText: 'Color blending', isTrueOption: false },

    // Question 45
    { optionId: 135, questionId: 45, optionText: 'Product, Price, Place, Promotion', isTrueOption: true },
    { optionId: 136, questionId: 45, optionText: 'People, Process, Physical, Profit', isTrueOption: false },
    { optionId: 137, questionId: 45, optionText: 'Plan, Produce, Price, Profit', isTrueOption: false },

    // Question 46
    { optionId: 138, questionId: 46, optionText: 'How brand differs from competitors', isTrueOption: true },
    { optionId: 139, questionId: 46, optionText: 'Price strategy', isTrueOption: false },
    { optionId: 140, questionId: 46, optionText: 'Distribution channels', isTrueOption: false },

    // Question 47
    { optionId: 141, questionId: 47, optionText: 'Carbohydrates, proteins, fats', isTrueOption: true },
    { optionId: 142, questionId: 47, optionText: 'Vitamins, minerals, water', isTrueOption: false },
    { optionId: 143, questionId: 47, optionText: 'Sugar, salt, fiber', isTrueOption: false },

    // Question 48
    { optionId: 144, questionId: 48, optionText: 'Aids digestion and cholesterol', isTrueOption: true },
    { optionId: 145, questionId: 48, optionText: 'Builds muscle', isTrueOption: false },
    { optionId: 146, questionId: 48, optionText: 'Provides energy only', isTrueOption: false },

    // Question 49
    { optionId: 147, questionId: 49, optionText: 'Gases trap heat in atmosphere', isTrueOption: true },
    { optionId: 148, questionId: 49, optionText: 'Sun gets hotter', isTrueOption: false },
    { optionId: 149, questionId: 49, optionText: 'Earth moves closer to sun', isTrueOption: false },

    // Question 50
    { optionId: 150, questionId: 50, optionText: 'Total greenhouse gas emissions', isTrueOption: true },
    { optionId: 151, questionId: 50, optionText: 'Amount of coal burned', isTrueOption: false },
    { optionId: 152, questionId: 50, optionText: 'Distance traveled only', isTrueOption: false }
];