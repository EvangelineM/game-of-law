import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Grid,
    Lightbulb,
    CheckCircle,
    XCircle,
    RotateCcw,
    Star,
    Trophy,
    Target,
    Eye,
    EyeOff,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";

// Constitutional crossword puzzles with different difficulty levels
const crosswordPuzzles = {
    easy: {
        title: "Constitutional Basics",
        size: 7,
        words: [
            {
                word: "RIGHTS",
                clue: "Fundamental freedoms guaranteed by Constitution",
                row: 1,
                col: 1,
                direction: "across",
                number: 1,
            },
            {
                word: "JUSTICE",
                clue: "What courts provide to ensure fairness",
                row: 3,
                col: 0,
                direction: "across",
                number: 2,
            },
            {
                word: "EQUALITY",
                clue: "Article 14 guarantees this before law",
                row: 5,
                col: 1,
                direction: "across",
                number: 3,
            },
            {
                word: "LIBERTY",
                clue: "Freedom that Article 21 protects",
                row: 0,
                col: 3,
                direction: "down",
                number: 4,
            },
            {
                word: "SECULAR",
                clue: "India treats all religions equally",
                row: 2,
                col: 5,
                direction: "down",
                number: 5,
            },
            {
                word: "REPUBLIC",
                clue: "Type of government where head is elected",
                row: 1,
                col: 6,
                direction: "down",
                number: 6,
            },
        ],
        intersections: [
            { word1: "RIGHTS", word2: "LIBERTY", letter: "I" },
            { word1: "RIGHTS", word2: "REPUBLIC", letter: "R" },
            { word1: "JUSTICE", word2: "SECULAR", letter: "S" },
            { word1: "EQUALITY", word2: "LIBERTY", letter: "L" },
        ],
    },
    medium: {
        title: "Constitutional Deep Dive",
        size: 9,
        words: [
            {
                word: "FUNDAMENTAL",
                clue: "Type of rights in Part III",
                row: 1,
                col: 1,
                direction: "across",
                number: 1,
            },
            {
                word: "AMENDMENT",
                clue: "Way to change the Constitution",
                row: 3,
                col: 0,
                direction: "across",
                number: 2,
            },
            {
                word: "FEDERALISM",
                clue: "System with Centre and State powers",
                row: 5,
                col: 2,
                direction: "across",
                number: 3,
            },
            {
                word: "DIRECTIVE",
                clue: "Principles that guide state policy",
                row: 7,
                col: 1,
                direction: "across",
                number: 4,
            },
            {
                word: "PREAMBLE",
                clue: "Introduction to the Constitution",
                row: 0,
                col: 4,
                direction: "down",
                number: 5,
            },
            {
                word: "SUPREME",
                clue: "Highest court in India",
                row: 2,
                col: 7,
                direction: "down",
                number: 6,
            },
            {
                word: "PARLIAMENT",
                clue: "Law-making body of India",
                row: 1,
                col: 8,
                direction: "down",
                number: 7,
            },
        ],
        intersections: [
            { word1: "FUNDAMENTAL", word2: "PREAMBLE", letter: "M" },
            { word1: "AMENDMENT", word2: "PREAMBLE", letter: "E" },
            { word1: "FEDERALISM", word2: "SUPREME", letter: "E" },
            { word1: "DIRECTIVE", word2: "SUPREME", letter: "E" },
        ],
    },
    hard: {
        title: "Constitutional Mastery",
        size: 11,
        words: [
            {
                word: "KESAVANANDA",
                clue: "Case that established Basic Structure doctrine",
                row: 1,
                col: 1,
                direction: "across",
                number: 1,
            },
            {
                word: "MANDAMUS",
                clue: "Writ meaning 'we command'",
                row: 3,
                col: 2,
                direction: "across",
                number: 2,
            },
            {
                word: "CERTIORARI",
                clue: "Writ to quash lower court decisions",
                row: 5,
                col: 0,
                direction: "across",
                number: 3,
            },
            {
                word: "HABEAS",
                clue: "Corpus - writ against illegal detention",
                row: 7,
                col: 3,
                direction: "across",
                number: 4,
            },
            {
                word: "JUDICIAL",
                clue: "Type of review by courts",
                row: 9,
                col: 2,
                direction: "across",
                number: 5,
            },
            {
                word: "SOVEREIGNTY",
                clue: "Supreme power of the state",
                row: 0,
                col: 5,
                direction: "down",
                number: 6,
            },
            {
                word: "SECULARISM",
                clue: "Principle of religious neutrality",
                row: 2,
                col: 8,
                direction: "down",
                number: 7,
            },
            {
                word: "EMERGENCY",
                clue: "Article 352 provisions",
                row: 1,
                col: 10,
                direction: "down",
                number: 8,
            },
        ],
        intersections: [
            { word1: "KESAVANANDA", word2: "SOVEREIGNTY", letter: "S" },
            { word1: "MANDAMUS", word2: "SECULARISM", letter: "S" },
            { word1: "CERTIORARI", word2: "EMERGENCY", letter: "E" },
            { word1: "HABEAS", word2: "SECULARISM", letter: "S" },
        ],
    },
};

// Create additional word sets for each difficulty level
const additionalWords = {
    easy: [
        [
            {
                word: "VOTING",
                clue: "Constitutional right to elect representatives",
                row: 1,
                col: 1,
                direction: "across",
                number: 1,
            },
            {
                word: "FREEDOM",
                clue: "Constitutional guarantee of liberty",
                row: 3,
                col: 0,
                direction: "across",
                number: 2,
            },
            {
                word: "CITIZEN",
                clue: "Person with full rights under Constitution",
                row: 5,
                col: 1,
                direction: "across",
                number: 3,
            },
            {
                word: "FEDERAL",
                clue: "System dividing powers between center and states",
                row: 0,
                col: 3,
                direction: "down",
                number: 4,
            },
            {
                word: "ARTICLE",
                clue: "Numbered sections of the Constitution",
                row: 2,
                col: 5,
                direction: "down",
                number: 5,
            },
            {
                word: "DIGNITY",
                clue: "Human quality protected by Constitution",
                row: 1,
                col: 6,
                direction: "down",
                number: 6,
            },
        ],
        [
            {
                word: "COURTS",
                clue: "Institutions that interpret the law",
                row: 1,
                col: 1,
                direction: "across",
                number: 1,
            },
            {
                word: "SYSTEM",
                clue: "Constitutional framework of governance",
                row: 3,
                col: 0,
                direction: "across",
                number: 2,
            },
            {
                word: "WELFARE",
                clue: "Public good that the Constitution promotes",
                row: 5,
                col: 1,
                direction: "across",
                number: 3,
            },
            {
                word: "SPEECH",
                clue: "Freedom protected under Article 19",
                row: 0,
                col: 3,
                direction: "down",
                number: 4,
            },
            {
                word: "LAWFUL",
                clue: "In accordance with constitutional provisions",
                row: 2,
                col: 5,
                direction: "down",
                number: 5,
            },
            {
                word: "MANDATE",
                clue: "Authority given by voters to govern",
                row: 1,
                col: 6,
                direction: "down",
                number: 6,
            },
        ]
    ],
    medium: [
        // Additional medium difficulty puzzles
        [
            {
                word: "PROVISIONS",
                clue: "Specific rules in the Constitution",
                row: 1,
                col: 1,
                direction: "across",
                number: 1,
            },
            {
                word: "SCHEDULES",
                clue: "Lists and tables in the Constitution",
                row: 3,
                col: 0,
                direction: "across",
                number: 2,
            },
            {
                word: "SOVEREIGNTY",
                clue: "Supreme authority of a state",
                row: 5,
                col: 2,
                direction: "across",
                number: 3,
            },
            {
                word: "MINISTERS",
                clue: "Cabinet members who run departments",
                row: 7,
                col: 1,
                direction: "across",
                number: 4,
            },
            {
                word: "JUDICIAL",
                clue: "Branch that interprets laws",
                row: 0,
                col: 4,
                direction: "down",
                number: 5,
            },
            {
                word: "GOVERNOR",
                clue: "Head of state government",
                row: 2,
                col: 7,
                direction: "down",
                number: 6,
            },
            {
                word: "ORDINANCE",
                clue: "Law promulgated when parliament isn't in session",
                row: 1,
                col: 8,
                direction: "down",
                number: 7,
            },
        ]
    ],
    hard: [
        // Additional hard difficulty puzzles
        [
            {
                word: "CONSTITUTIONAL",
                clue: "Relating to the fundamental laws of a country",
                row: 0,
                col: 0,
                direction: "across",
                number: 1,
            },
            {
                word: "JURISPRUDENCE",
                clue: "Theory or philosophy of law",
                row: 2,
                col: 1,
                direction: "across",
                number: 2,
            },
            {
                word: "ADJUDICATION",
                clue: "Legal process of resolving disputes",
                row: 4,
                col: 2,
                direction: "across",
                number: 3,
            },
            {
                word: "JURISDICTION",
                clue: "Authority to interpret and apply the law",
                row: 6,
                col: 3,
                direction: "across",
                number: 4,
            },
            {
                word: "CONSTITUENCY",
                clue: "Electoral area represented by an MP",
                row: 8,
                col: 4,
                direction: "across",
                number: 5,
            },
            {
                word: "LEGISLATION",
                clue: "Process of making or enacting laws",
                row: 0,
                col: 0,
                direction: "down",
                number: 6,
            },
            {
                word: "PROCLAMATION",
                clue: "Official announcement by government authority",
                row: 0,
                col: 6,
                direction: "down",
                number: 7,
            },
            {
                word: "CITIZENSHIP",
                clue: "Legal status of belonging to a country",
                row: 0,
                col: 10,
                direction: "down",
                number: 8,
            },
        ]
    ]
};

export default function ConstitutionalCrossword() {
    const { user, addXP, addAchievement } = useUser();
    const [difficulty, setDifficulty] = useState("easy");
    const [currentPuzzle, setCurrentPuzzle] = useState(null);
    const [grid, setGrid] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [selectedCell, setSelectedCell] = useState(null);
    const [selectedWord, setSelectedWord] = useState(null);
    const [direction, setDirection] = useState("across");
    const [showHints, setShowHints] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [solvedWords, setSolvedWords] = useState({});
    const [showWordSuccessMsg, setShowWordSuccessMsg] = useState(false);
    const [showWordErrorMsg, setShowWordErrorMsg] = useState(false);
    const [roundNumber, setRoundNumber] = useState(0);

    useEffect(() => {
        if (currentPuzzle) {
            initializeGrid();
        }
    }, [currentPuzzle]);
    
    // Function to get a random puzzle based on difficulty and ensure variety
    const getRandomPuzzle = (diff) => {
        let puzzlePool = [];
        
        // Add the original puzzle
        puzzlePool.push(crosswordPuzzles[diff]);
        
        // Add additional puzzles if available
        if (additionalWords[diff] && additionalWords[diff].length > 0) {
            additionalWords[diff].forEach(wordSet => {
                // Create a copy of the original puzzle structure
                const newPuzzle = {
                    ...crosswordPuzzles[diff],
                    words: wordSet,
                    // For simplicity, we're not redefining intersections for the additional puzzles
                };
                puzzlePool.push(newPuzzle);
            });
        }
        
        // Select a random puzzle from the pool
        const randomIndex = Math.floor(Math.random() * puzzlePool.length);
        return puzzlePool[randomIndex];
    };

    const startPuzzle = (diff) => {
        setDifficulty(diff);
        // Get a random puzzle based on difficulty
        const randomPuzzle = getRandomPuzzle(diff);
        setCurrentPuzzle(randomPuzzle);
        setUserAnswers({});
        setSelectedCell(null);
        setSelectedWord(null);
        setSolvedWords({});
        setShowWordSuccessMsg(false);
        setShowWordErrorMsg(false);
        setCompleted(false);
        // Increment round number to keep track of different rounds
        setRoundNumber(prevRound => prevRound + 1);
        setScore(0);
    };

    const initializeGrid = () => {
        if (!currentPuzzle || !currentPuzzle.words) return [];
        
        const size = currentPuzzle.size;
        const newGrid = Array(size)
            .fill()
            .map(() =>
                Array(size).fill({ letter: "", number: null, isBlocked: true })
            );

        // Place words in grid
        currentPuzzle.words.forEach((wordData) => {
            const { word, row, col, direction, number } = wordData;

            for (let i = 0; i < word.length; i++) {
                const currentRow = direction === "across" ? row : row + i;
                const currentCol = direction === "across" ? col + i : col;

                if (currentRow < size && currentCol < size) {
                    newGrid[currentRow][currentCol] = {
                        letter: word[i],
                        number:
                            i === 0
                                ? number
                                : newGrid[currentRow][currentCol].number,
                        isBlocked: false,
                        wordId: `${number}-${direction}`,
                    };
                }
            }
        });

        setGrid(newGrid);
    };

    const handleCellClick = (row, col) => {
        if (grid[row][col].isBlocked) return;

        setSelectedCell({ row, col });

        // Find word(s) that contain this cell
        const wordsAtCell = currentPuzzle.words.filter((word) => {
            if (word.direction === "across") {
                return (
                    word.row === row &&
                    col >= word.col &&
                    col < word.col + word.word.length
                );
            } else {
                return (
                    word.col === col &&
                    row >= word.row &&
                    row < word.row + word.word.length
                );
            }
        });

        if (wordsAtCell.length > 0) {
            // If we clicked on the same cell, toggle direction
            if (
                selectedCell &&
                selectedCell.row === row &&
                selectedCell.col === col &&
                wordsAtCell.length > 1
            ) {
                const currentWordIndex = wordsAtCell.findIndex(
                    (w) => w.direction === direction
                );
                const nextWordIndex =
                    (currentWordIndex + 1) % wordsAtCell.length;
                setSelectedWord(wordsAtCell[nextWordIndex]);
                setDirection(wordsAtCell[nextWordIndex].direction);
            } else {
                setSelectedWord(wordsAtCell[0]);
                setDirection(wordsAtCell[0].direction);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (!selectedCell || !selectedWord) return;

        // Prevent the default action to avoid printing "BACKSPACE" or "ENTER" in the input
        e.preventDefault();
        
        if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
            // Handle letters
            const key = e.key.toUpperCase();
            const { row, col } = selectedCell;
            const wordId = `${selectedWord.number}-${selectedWord.direction}`;

            // Calculate position within the word
            let positionInWord;
            if (selectedWord.direction === "across") {
                positionInWord = col - selectedWord.col;
            } else {
                positionInWord = row - selectedWord.row;
            }

            const newAnswers = { ...userAnswers };
            if (!newAnswers[wordId]) {
                newAnswers[wordId] = Array(selectedWord.word.length).fill("");
            }
            newAnswers[wordId][positionInWord] = key;

            setUserAnswers(newAnswers);

            // Move to next cell in the word
            moveToNextCell();
        } else if (e.key === "Backspace") {
            handleBackspace();
        } else if (e.key === "Enter") {
            // Handle Enter key - could be used to check answers or complete a word
            handleSubmitWord();
        }
    };

    const moveToNextCell = () => {
        if (!selectedCell || !selectedWord) return;

        const { row, col } = selectedCell;
        let nextRow = row;
        let nextCol = col;

        if (selectedWord.direction === "across") {
            nextCol = col + 1;
            if (nextCol >= selectedWord.col + selectedWord.word.length) return;
        } else {
            nextRow = row + 1;
            if (nextRow >= selectedWord.row + selectedWord.word.length) return;
        }

        setSelectedCell({ row: nextRow, col: nextCol });
    };

    const handleBackspace = () => {
        if (!selectedCell || !selectedWord) return;

        const { row, col } = selectedCell;
        const wordId = `${selectedWord.number}-${selectedWord.direction}`;

        let positionInWord;
        if (selectedWord.direction === "across") {
            positionInWord = col - selectedWord.col;
        } else {
            positionInWord = row - selectedWord.row;
        }

        const newAnswers = { ...userAnswers };
        if (newAnswers[wordId]) {
            newAnswers[wordId][positionInWord] = "";
            setUserAnswers(newAnswers);
        }
        
        // Move to the previous cell after backspace
        moveToPreviousCell();
    };
    
    const moveToPreviousCell = () => {
        if (!selectedCell || !selectedWord) return;

        const { row, col } = selectedCell;
        let prevRow = row;
        let prevCol = col;

        if (selectedWord.direction === "across") {
            prevCol = col - 1;
            if (prevCol < selectedWord.col) return;
        } else {
            prevRow = row - 1;
            if (prevRow < selectedWord.row) return;
        }

        setSelectedCell({ row: prevRow, col: prevCol });
    };
    
    const handleSubmitWord = () => {
        if (!selectedWord) return;
        
        const wordId = `${selectedWord.number}-${selectedWord.direction}`;
        const userAnswer = userAnswers[wordId] || [];
        const correctAnswer = selectedWord.word;
        
        // Check if the word is complete
        if (userAnswer.filter(letter => letter !== "").length === correctAnswer.length) {
            // Word is complete, validate it
            const isCorrect = userAnswer.join("") === correctAnswer;
            
            if (isCorrect) {
                // Word is correct, mark it as solved
                const newSolvedWords = {...solvedWords};
                newSolvedWords[wordId] = true;
                setSolvedWords(newSolvedWords);
                
                // Check if all words are solved
                if (Object.keys(newSolvedWords).length === currentPuzzle.words.length) {
                    checkCompletion(); // Use the existing checkCompletion function instead
                } else {
                    // Play success sound or animation
                    setShowWordSuccessMsg(true);
                    setTimeout(() => setShowWordSuccessMsg(false), 1500);
                }
            } else {
                // Word is incorrect, show error feedback
                setShowWordErrorMsg(true);
                setTimeout(() => setShowWordErrorMsg(false), 1500);
            }
        }
    };

    const checkCompletion = () => {
        if (!currentPuzzle || !currentPuzzle.words) return;
        
        const allCorrect = currentPuzzle.words.every((word) => {
            const wordId = `${word.number}-${word.direction}`;
            const userWord = userAnswers[wordId];
            return userWord && userWord.join("") === word.word;
        });

        if (allCorrect) {
            setCompleted(true);
            const points =
                difficulty === "easy"
                    ? 50
                    : difficulty === "medium"
                    ? 100
                    : 150;
            setScore(points);
            addXP(points);

            if (difficulty === "hard") {
                addAchievement("crossword-master");
            }
        }
    };

    const getCellContent = (row, col) => {
        if (!grid[row] || !grid[row][col] || grid[row][col].isBlocked) return null;
        if (!currentPuzzle || !currentPuzzle.words) return "";

        const cell = grid[row][col];
        const wordIds = currentPuzzle.words
            .filter((word) => {
                if (word.direction === "across") {
                    return (
                        word.row === row &&
                        col >= word.col &&
                        col < word.col + word.word.length
                    );
                } else {
                    return (
                        word.col === col &&
                        row >= word.row &&
                        row < word.row + word.word.length
                    );
                }
            })
            .map((word) => `${word.number}-${word.direction}`);

        let displayLetter = "";
        for (const wordId of wordIds) {
            if (userAnswers[wordId]) {
                const word = currentPuzzle.words.find(
                    (w) => `${w.number}-${w.direction}` === wordId
                );
                let positionInWord;
                if (word.direction === "across") {
                    positionInWord = col - word.col;
                } else {
                    positionInWord = row - word.row;
                }
                if (userAnswers[wordId][positionInWord]) {
                    displayLetter = userAnswers[wordId][positionInWord];
                    break;
                }
            }
        }

        return displayLetter;
    };

    const isSelected = (row, col) => {
        if (!selectedCell || !selectedWord) return false;

        if (selectedWord.direction === "across") {
            return (
                selectedWord.row === row &&
                col >= selectedWord.col &&
                col < selectedWord.col + selectedWord.word.length
            );
        } else {
            return (
                selectedWord.col === col &&
                row >= selectedWord.row &&
                row < selectedWord.row + selectedWord.word.length
            );
        }
    };

    const isCurrentCell = (row, col) => {
        return (
            selectedCell && selectedCell.row === row && selectedCell.col === col
        );
    };

    useEffect(() => {
        if (currentPuzzle && Object.keys(userAnswers).length > 0) {
            checkCompletion();
        }
    }, [userAnswers, currentPuzzle]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [selectedCell, selectedWord]);

    if (!currentPuzzle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <Grid className="w-10 h-10" />
                            </motion.div>

                            <h1 className="text-3xl font-bold mb-2">
                                Constitutional Crossword
                            </h1>
                            <p className="text-emerald-100 text-lg">
                                Test your constitutional knowledge with word
                                puzzles
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-stone-800 mb-4">
                                    Choose Your Challenge Level
                                </h2>
                                <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
                                    Solve crossword puzzles filled with
                                    constitutional terms, legal concepts, and
                                    landmark cases. Each level gets
                                    progressively more challenging!
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                {Object.entries(crosswordPuzzles).map(
                                    ([level, puzzle]) => (
                                        <motion.div
                                            key={level}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="bg-stone-50 rounded-xl p-6 text-center cursor-pointer hover:bg-stone-100 transition-all duration-300 transform hover:scale-105"
                                            onClick={() => startPuzzle(level)}
                                        >
                                            <div
                                                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                                                    level === "easy"
                                                        ? "bg-green-100 text-green-600"
                                                        : level === "medium"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                            >
                                                <Target className="w-8 h-8" />
                                            </div>
                                            <h3 className="font-bold text-stone-800 mb-2 capitalize">
                                                {level}
                                            </h3>
                                            <p className="text-sm text-stone-600 mb-3">
                                                {puzzle.title}
                                            </p>
                                            <div className="text-xs text-stone-500">
                                                {puzzle.size}×{puzzle.size} grid
                                                • {puzzle.words.length} words
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>

                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                                <h3 className="font-bold text-stone-800 mb-3">
                                    How to Play:
                                </h3>
                                <ul className="text-stone-600 text-sm space-y-1">
                                    <li>• Click on a cell to select a word</li>
                                    <li>
                                        • Type letters to fill in your answers
                                    </li>
                                    <li>
                                        • Use hints below the grid to help solve
                                        words
                                    </li>
                                    <li>
                                        • Complete all words to finish the
                                        puzzle
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (completed) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <Trophy className="w-12 h-12" />
                            </motion.div>

                            <h1 className="text-3xl font-bold mb-2">
                                Crossword Complete!
                            </h1>
                            <p className="text-lg opacity-90">
                                Outstanding constitutional knowledge!
                            </p>
                        </div>

                        <div className="p-8 text-center">
                            <div className="text-6xl font-bold text-stone-800 mb-2">
                                {score}
                            </div>
                            <div className="text-lg text-stone-600 mb-8">
                                XP Earned
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => setCurrentPuzzle(null)}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
                                >
                                    New Puzzle
                                </button>
                                <button
                                    onClick={() => window.history.back()}
                                    className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 px-8 py-3 rounded-full font-bold transition-all duration-300"
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-stone-800">
                                {currentPuzzle?.title || "Select a Puzzle"}
                            </h1>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowHints(!showHints)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                                >
                                    {showHints ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                    <span className="text-sm font-medium">
                                        {showHints ? "Hide" : "Show"} Hints
                                    </span>
                                </button>
                                <button
                                    onClick={() => setCurrentPuzzle(null)}
                                    className="p-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Crossword Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6"
                    >
                        <h2 className="text-xl font-bold text-stone-800 mb-4">
                            Crossword Grid
                        </h2>
                        
                        {/* Feedback Messages */}
                        {showWordSuccessMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-center"
                            >
                                <CheckCircle className="inline-block w-5 h-5 mr-2" />
                                Correct word! Keep going!
                            </motion.div>
                        )}
                        
                        {showWordErrorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium text-center"
                            >
                                <XCircle className="inline-block w-5 h-5 mr-2" />
                                Try again - that's not correct
                            </motion.div>
                        )}

                        {currentPuzzle && (
                        <div
                            className="grid gap-1 w-fit mx-auto"
                            style={{
                                gridTemplateColumns: `repeat(${currentPuzzle.size}, 1fr)`,
                            }}
                        >
                            {grid.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`w-8 h-8 border border-stone-300 flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-200 ${
                                            cell.isBlocked
                                                ? "bg-stone-800"
                                                : isCurrentCell(
                                                      rowIndex,
                                                      colIndex
                                                  )
                                                ? "bg-blue-400 text-white"
                                                : isSelected(rowIndex, colIndex)
                                                ? "bg-blue-100"
                                                : "bg-white hover:bg-stone-50"
                                        }`}
                                        onClick={() =>
                                            handleCellClick(rowIndex, colIndex)
                                        }
                                    >
                                        {!cell.isBlocked && (
                                            <>
                                                {cell.number && (
                                                    <span
                                                        className="absolute text-xs leading-none"
                                                        style={{
                                                            fontSize: "8px",
                                                            marginTop: "-12px",
                                                            marginLeft: "-12px",
                                                        }}
                                                    >
                                                        {cell.number}
                                                    </span>
                                                )}
                                                <span className="text-center">
                                                    {getCellContent(
                                                        rowIndex,
                                                        colIndex
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        )}

                        {selectedWord && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="font-semibold text-blue-800">
                                    {selectedWord.number}{" "}
                                    {selectedWord.direction.toUpperCase()}:{" "}
                                    {selectedWord.word.length} letters
                                </div>
                                <div className="text-sm text-blue-600 mt-1">
                                    {selectedWord.clue}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Clues */}
                    {showHints && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6"
                        >
                            <h2 className="text-xl font-bold text-stone-800 mb-4">
                                Clues
                            </h2>

                            <div className="space-y-6">
                                {/* Across */}
                                <div>
                                    <h3 className="font-bold text-stone-700 mb-3 flex items-center">
                                        <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                        Across
                                    </h3>
                                    <div className="space-y-2">
                                        {currentPuzzle.words
                                            .filter(
                                                (word) =>
                                                    word.direction === "across"
                                            )
                                            .map((word) => {
                                                const wordId = `${word.number}-${word.direction}`;
                                                const isCompleted =
                                                    userAnswers[wordId] &&
                                                    userAnswers[wordId].join(
                                                        ""
                                                    ) === word.word;

                                                return (
                                                    <div
                                                        key={wordId}
                                                        className={`flex items-start space-x-3 p-2 rounded-lg cursor-pointer transition-all ${
                                                            selectedWord &&
                                                            selectedWord.number ===
                                                                word.number &&
                                                            selectedWord.direction ===
                                                                word.direction
                                                                ? "bg-blue-100 border border-blue-300"
                                                                : "hover:bg-stone-50"
                                                        }`}
                                                        onClick={() => {
                                                            setSelectedWord(
                                                                word
                                                            );
                                                            setDirection(
                                                                "across"
                                                            );
                                                            setSelectedCell({
                                                                row: word.row,
                                                                col: word.col,
                                                            });
                                                        }}
                                                    >
                                                        <span className="font-bold text-stone-600 min-w-[24px]">
                                                            {word.number}.
                                                        </span>
                                                        <span
                                                            className={`text-sm flex-1 ${
                                                                isCompleted
                                                                    ? "text-green-600 line-through"
                                                                    : "text-stone-700"
                                                            }`}
                                                        >
                                                            {word.clue}
                                                        </span>
                                                        {isCompleted && (
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>

                                {/* Down */}
                                <div>
                                    <h3 className="font-bold text-stone-700 mb-3 flex items-center">
                                        <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                        Down
                                    </h3>
                                    <div className="space-y-2">
                                        {currentPuzzle.words
                                            .filter(
                                                (word) =>
                                                    word.direction === "down"
                                            )
                                            .map((word) => {
                                                const wordId = `${word.number}-${word.direction}`;
                                                const isCompleted =
                                                    userAnswers[wordId] &&
                                                    userAnswers[wordId].join(
                                                        ""
                                                    ) === word.word;

                                                return (
                                                    <div
                                                        key={wordId}
                                                        className={`flex items-start space-x-3 p-2 rounded-lg cursor-pointer transition-all ${
                                                            selectedWord &&
                                                            selectedWord.number ===
                                                                word.number &&
                                                            selectedWord.direction ===
                                                                word.direction
                                                                ? "bg-blue-100 border border-blue-300"
                                                                : "hover:bg-stone-50"
                                                        }`}
                                                        onClick={() => {
                                                            setSelectedWord(
                                                                word
                                                            );
                                                            setDirection(
                                                                "down"
                                                            );
                                                            setSelectedCell({
                                                                row: word.row,
                                                                col: word.col,
                                                            });
                                                        }}
                                                    >
                                                        <span className="font-bold text-stone-600 min-w-[24px]">
                                                            {word.number}.
                                                        </span>
                                                        <span
                                                            className={`text-sm flex-1 ${
                                                                isCompleted
                                                                    ? "text-green-600 line-through"
                                                                    : "text-stone-700"
                                                            }`}
                                                        >
                                                            {word.clue}
                                                        </span>
                                                        {isCompleted && (
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
