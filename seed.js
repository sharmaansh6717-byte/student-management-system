require("dotenv").config();

const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose.connect(process.env.MONGO_URI);
const books = ([
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    available: "No",
    issuedTo: "Ansh Sharma"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Finance",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    available: "No",
    issuedTo: "Rahul Verma"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Ikigai",
    author: "Hector Garcia",
    category: "Self Help",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    available: "No",
    issuedTo: "Priya Singh"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Programming",
    available: "No",
    issuedTo: "Aman Gupta"
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Learning React",
    author: "Alex Banks",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    category: "Programming",
    available: "No",
    issuedTo: "Neha Sharma"
  },
  {
    title: "MongoDB Basics",
    author: "Peter Membrey",
    category: "Database",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Database",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "Computer Science",
    available: "No",
    issuedTo: "Rohit Kumar"
  },
  {
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Computer Science",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell",
    category: "AI",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Hands-On Machine Learning",
    author: "Aurelien Geron",
    category: "AI",
    available: "No",
    issuedTo: "Sakshi Jain"
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Fluent Python",
    author: "Luciano Ramalho",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Head First Java",
    author: "Kathy Sierra",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Effective Java",
    author: "Joshua Bloch",
    category: "Programming",
    available: "No",
    issuedTo: "Karan Mehta"
  },
  {
    title: "C Programming Language",
    author: "Brian Kernighan",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    available: "No",
    issuedTo: "Aditya Singh"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Classic",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    category: "Classic",
    available: "No",
    issuedTo: "Riya Patel"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Classic",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    category: "Fiction",
    available: "No",
    issuedTo: "Simran Kaur"
  },
  {
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    category: "Fiction",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    category: "Historical Fiction",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    category: "Thriller",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Angels and Demons",
    author: "Dan Brown",
    category: "Thriller",
    available: "No",
    issuedTo: "Nitin Sharma"
  },
  {
    title: "Inferno",
    author: "Dan Brown",
    category: "Thriller",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    category: "Mystery",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Mystery",
    available: "No",
    issuedTo: "Pooja Verma"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Homo Deus",
    author: "Yuval Noah Harari",
    category: "History",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "21 Lessons for the 21st Century",
    author: "Yuval Noah Harari",
    category: "History",
    available: "No",
    issuedTo: "Arjun Mishra"
  },
  {
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    category: "Biography",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Ignited Minds",
    author: "A.P.J. Abdul Kalam",
    category: "Biography",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "My Journey",
    author: "A.P.J. Abdul Kalam",
    category: "Biography",
    available: "No",
    issuedTo: "Mehul Shah"
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Elon Musk",
    author: "Walter Isaacson",
    category: "Biography",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    category: "Biography",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    available: "No",
    issuedTo: "Harsh Jain"
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    category: "Business",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    category: "Business",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    category: "Self Help",
    available: "No",
    issuedTo: "Deepak Sharma"
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    category: "Self Help",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "Self Help",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Think Like a Monk",
    author: "Jay Shetty",
    category: "Self Help",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Do Epic Shit",
    author: "Ankur Warikoo",
    category: "Self Help",
    available: "No",
    issuedTo: "Vikas Yadav"
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self Help",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Can't Buy Me Like",
    author: "Bob Garfield",
    category: "Marketing",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Digital Marketing For Dummies",
    author: "Ryan Deiss",
    category: "Marketing",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Marketing Management",
    author: "Philip Kotler",
    category: "Marketing",
    available: "No",
    issuedTo: "Anjali Singh"
  },
  {
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    category: "Economics",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Indian Economy",
    author: "Ramesh Singh",
    category: "Economics",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Objective General English",
    author: "S.P. Bakshi",
    category: "Competitive Exam",
    available: "No",
    issuedTo: "Pankaj Kumar"
  },
  {
    title: "Quantitative Aptitude",
    author: "R.S. Aggarwal",
    category: "Competitive Exam",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "A Modern Approach to Verbal Reasoning",
    author: "R.S. Aggarwal",
    category: "Competitive Exam",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Lucent General Knowledge",
    author: "Lucent Publications",
    category: "Competitive Exam",
    available: "No",
    issuedTo: "Sneha Patel"
  },
  {
    title: "NCERT Physics Class 11",
    author: "NCERT",
    category: "Education",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "NCERT Chemistry Class 11",
    author: "NCERT",
    category: "Education",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "NCERT Biology Class 11",
    author: "NCERT",
    category: "Education",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Concepts of Physics Vol 1",
    author: "H.C. Verma",
    category: "Science",
    available: "No",
    issuedTo: "Keshav Sharma"
  },
  {
    title: "Concepts of Physics Vol 2",
    author: "H.C. Verma",
    category: "Science",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Organic Chemistry",
    author: "Morrison and Boyd",
    category: "Science",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Discrete Mathematics",
    author: "Kenneth Rosen",
    category: "Mathematics",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Engineering Mathematics",
    author: "B.S. Grewal",
    category: "Mathematics",
    available: "No",
    issuedTo: "Aakash Singh"
  },
  {
    title: "Linear Algebra",
    author: "Gilbert Strang",
    category: "Mathematics",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Calculus",
    author: "James Stewart",
    category: "Mathematics",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Data Structures Using C",
    author: "Reema Thareja",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Computer Organization",
    author: "Morris Mano",
    category: "Computer Science",
    available: "No",
    issuedTo: "Nikhil Soni"
  },
  {
    title: "Software Engineering",
    author: "Ian Sommerville",
    category: "Computer Science",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Cloud Computing",
    author: "Rajkumar Buyya",
    category: "Technology",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Cyber Security Essentials",
    author: "Charles Brooks",
    category: "Technology",
    available: "No",
    issuedTo: "Manish Verma"
  },
  {
    title: "Blockchain Basics",
    author: "Daniel Drescher",
    category: "Technology",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "React Explained",
    author: "Zac Gordon",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Mastering Express.js",
    author: "Ethan Brown",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "REST API Design",
    author: "Matthias Biehl",
    category: "Programming",
    available: "No",
    issuedTo: "Shubham Gupta"
  },
  {
    title: "Git Pocket Guide",
    author: "Richard Silverman",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Docker Deep Dive",
    author: "Nigel Poulton",
    category: "Technology",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Kubernetes in Action",
    author: "Marko Luksa",
    category: "Technology",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Technology",
    available: "No",
    issuedTo: "Yash Patel"
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "Interview",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "System Design Interview",
    author: "Alex Xu",
    category: "Interview",
    available: "No",
    issuedTo: "Ritesh Kumar"
  },
  {
    title: "Algorithms Unlocked",
    author: "Thomas Cormen",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Mythical Man-Month",
    author: "Frederick Brooks",
    category: "Technology",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Soft Skills",
    author: "John Sonmez",
    category: "Career",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "The Clean Coder",
    author: "Robert C. Martin",
    category: "Programming",
    available: "No",
    issuedTo: "Abhishek Mishra"
  },
  {
    title: "Code Complete",
    author: "Steve McConnell",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  },
  {
    title: "Head First Design Patterns",
    author: "Eric Freeman",
    category: "Programming",
    available: "Yes",
    issuedTo: null
  }
]);

async function seed() {
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log("Books inserted successfully");
  mongoose.disconnect();
}

seed();