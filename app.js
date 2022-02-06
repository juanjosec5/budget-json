//get alL HTML Elements
const titleSalary = document.querySelector('.monthly-balance');
const remainingSalary = document.querySelector('.remaining-balance');
const showAddExpenseBtn = document.querySelector('.show-add-expense');
const addExpenseModal = document.querySelector('.add-expense');
const addExpenseBtn = document.querySelector('.add-expense__button');
const expenseName = document.querySelector('.add-expense__name');
const expenseAmount = document.querySelector('.add-expense__amount');
const expensesList = document.querySelector('.salary-breakdown__expenses-list');

let userData = {
    salary: 5000000,
    remainingSalary: 5000000,
    allExpenses: []
};

//Event Listeners
showAddExpenseBtn.addEventListener('click', () => handleModal());
addExpenseBtn.addEventListener('click', () => {
    let amount = parseInt(expenseAmount.value);
    let name = expenseName.value;
    let id = userData.allExpenses.length + 1;

    if (name && isNaN(name) && amount && !isNaN(amount)) {
        handleModal();
        updateUserModel(name, amount, id);
        updateLocalStorage();
        remainingSalary.innerHTML = `${formatNumbers(userData.remainingSalary)}`;
        renderExpense(name, amount, id);
    }
    clearInputs();
});

const removeItem = (ev) => {
    const parent = ev.parentElement;
    // const position = userData.allExpenses.indexOf()
    const expenseId = parseInt(parent.childNodes[0].children[0].innerText.split(' ')[0]);
    const a = userData.allExpenses.filter(expense => expense.id !== expenseId);
    userData.remainingSalary += Number(parent.childNodes[0].children[2].innerText.replace(',', ''))
    userData.allExpenses = a;
    renderExpense()
    renderBudgetData();
    updateLocalStorage();
    console.log(userData);
};

const budgetConstantsUrl = 'https://raw.githubusercontent.com/juanjosec5/budget-json/main/budget-constants.json';

const getBudgetConstants = async () => {
    try {
        const budgetConstantsResponse = await fetch(budgetConstantsUrl);
        const budgetConstants = await budgetConstantsResponse.json();

        return budgetConstants;
    } catch (error) {
        console.error(error);
    }
};

const renderBudgetData = () => {
    titleSalary.innerHTML = `${formatNumbers(userData.salary)}`;
    remainingSalary.innerHTML = `${formatNumbers(userData.remainingSalary)}`;

    if (userData.allExpenses.length > 0) {
        userData.allExpenses.forEach(expense => renderExpense(expense.name, formatNumbers(expense.value), expense.id));
    }
};

const formatNumbers = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const handleModal = () => {
    if (!addExpenseModal.classList.contains('closed')) {
        addExpenseModal.classList.add('closed');
        showAddExpenseBtn.classList.remove('clicked');
        return;
    }
    showAddExpenseBtn.classList.add('clicked');
    addExpenseModal.classList.remove('closed');
};

const renderExpense = () => {
    expensesList.innerHTML = '';
    userData.allExpenses.forEach(expense => {
        if (expense.name !== '' && expense.value !== 0) {
            const newListItem = document.createElement('li');

            newListItem.classList.add('expense-item');
            newListItem.innerHTML = `<span class="expense-item__details">
                                    <span class="expense-item__name">${expense.id} - ${expense.name}</span> <br /> $ <span class="expense-item__amount">${expense.value}</span> COP
                                </span>
                                <button class="expense-item__delete-btn" onclick="removeItem(this)">&#128465;</button>`
            expensesList.appendChild(newListItem);
        } else {
            return;
        }
    })
};

const updateUserModel = (name, value, id) => {
    userData.allExpenses.push({
        name,
        value,
        id
    });

    userData.remainingSalary -= value;
};

const updateLocalStorage = () => {
    window.localStorage.setItem('user', JSON.stringify(userData));
};

const clearInputs = () => {
    expenseName.value = '';
    expenseAmount.value = '';
};

window.onload = () => {
    console.log('LOADED');

    if (window.localStorage.getItem('user')) {
        userData =  JSON.parse(window.localStorage.getItem('user'))
        console.log(userData);
    } else {
        window.localStorage.setItem('user', JSON.stringify(userData));
    }
    renderBudgetData();
};