const { error } = require('console');
let express=require('express');
let app=express();
let port =3000
app.get('/',(req,res)=>{
  res.send('OLA start!')
})

//1.track-store-address?street=123%20Main%20St&city=Springfield&state=IL
function formatAddress(street, city, state) {
  return `${street}, ${city}, ${state}`;
}
app.get('/track-store-address' ,(req,res)=>{
  try{
    const {street,city,state}=req.query;
    if(!street || !city || !state) throw new error( "Missing required parameters please add all parameters")
    
    res.send(formatAddress(street,city,state))
  }catch(error){
    res.status(500).send(error.message)
  }
})
//2

// 2Employee Greeting
function greetEmployee(employeeName) {
  return `Welcome to the company, ${employeeName}!`;
}

app.get('/employee-greet', (req, res) => {
  try {
    const { employeeName } = req.query;
    if (!employeeName) throw new Error('Missing employee name');
    const greeting = greetEmployee(employeeName);
    res.send(greeting);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 3
function calculateSavingsPerMonth(totalAmount, months) {
  return totalAmount / months;
}

app.get('/calculate-savings-goal', (req, res) => {
  try {
    const { totalAmount, months } = req.query;
    if (!totalAmount || !months) throw new Error('Missing parameters');
    const amount = Number(totalAmount);
    const monthCount = Number(months);
    if (isNaN(amount) || isNaN(monthCount)) throw new Error('Invalid number format');
    const savingsPerMonth = calculateSavingsPerMonth(amount, monthCount);
    res.send(`To save a total amount of ₹${amount} in ${monthCount} months, you need to save ₹${savingsPerMonth} per month.`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//  Determine Membership Level
function checkMembershipLevel(points) {
  if (points >= 3000) {
    return 'Platinum';
  } else if (points >= 2000) {
    return 'Gold';
  } else if (points >= 1000) {
    return 'Silver';
  } else {
    return 'Bronze';
  }
}

app.get('/membership-level', (req, res) => {
  try {
    const points = Number(req.query.points);
    if (isNaN(points)) throw new Error('Invalid points value');
    const membershipLevel = checkMembershipLevel(points);
    res.send(`You are a ${membershipLevel} member.`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//  Sort Employee Salaries
let salaries = [45000, 60000, 35000, 70000, 50000];

function sortSalaries(salaries) {
  return salaries.sort((a, b) => a - b);
}

app.get('/sort-salaries', (req, res) => {
  try {
    const sortedSalaries = sortSalaries(salaries);
    res.json(sortedSalaries);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// 6 Find Track by Name
let tracks = [
  { id: 1, name: "Track One", length: 3.5 },
  { id: 2, name: "Track Two", length: 4.2 },
  { id: 3, name: "Track Three", length: 2.8 }
];

function findTrackByName(name) {
  return tracks.find(track => track.name.toLowerCase() === name.toLowerCase());
}

app.get('/find-track', (req, res) => {
  try {
    const { name } = req.query;
    if (!name) throw new Error('Missing track name');
    const track = findTrackByName(name);
    if (!track) throw new Error('Track not found');
    res.json(track);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 7 Filter Long Movies
let movies = [
  { id: 1, title: "Movie One", duration: 120 },
  { id: 2, title: "Movie Two", duration: 150 },
  { id: 3, title: "Movie Three", duration: 90 }
];

function filterLongMovies(movies) {
  return movies.filter(movie => movie.duration > 120);
}

app.get('/filter-long-movies', (req, res) => {
  try {
    const longMovies = filterLongMovies(movies);
    res.json(longMovies);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// 8: Push New Employee
let employees = [
  { name: "Alice" },
  { name: "Bob" }
];

function addNewEmployee(name) {
  employees.push({ name });
  return employees;
}

app.get('/add-employee', (req, res) => {
  try {
    const { name } = req.query;
    if (!name) throw new Error('Missing employee name');
    const updatedEmployees = addNewEmployee(name);
    res.json(updatedEmployees);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 9: Calc ulate Monthly Savings
function returnSavings(income, expenses) {
  return income - expenses;
}

app.get('/calculate-savings', (req, res) => {
  try {
    const { income, expenses } = req.query;
    const monthlyIncome = Number(income);
    const monthlyExpenses = Number(expenses);
    if (isNaN(monthlyIncome) || isNaN(monthlyExpenses)) throw new Error('Invalid number format');
    const monthlySavings = returnSavings(monthlyIncome, monthlyExpenses);
    res.send(`You have saved ₹${monthlySavings}.`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Filter Recent Movies
let moviesRecent = [
  { id: 1, title: "Movie One", year: 2014 },
  { id: 2, title: "Movie Two", year: 2016 },
  { id: 3, title: "Movie Three", year: 2018 }
];

function returnRecentMovies(movies) {
  return movies.filter(movie => movie.year > 2015);
}

app.get('/filter-recent-movies', (req, res) => {
  try {
    const recentMovies = returnRecentMovies(moviesRecent);
    res.json(recentMovies);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
})